import React, {Component} from 'react';
import ProgressBar from "./ProgressBar";
import MarsPoolLand from "../contracts/MarsPoolLand.json";
import SeedToken from "../contracts/SeedToken.json";
import getWeb3 from "../getWeb3";
import Web3 from "web3";



class Purchase extends Component {

    state = {completed:0, loaded:false, ether:0, nft:0,pay:0,
        alertcss:"",warn:"",balance:0,nctBalance:0,lastClaim:0,
        property_name:0,maxsupply:1786,
        currentWallet:"",
        value:0,remaingPercentage:0, remainingNFT:0,
       token_id:null,total_supply:0,progressStatusValue: 0,
       tokens:[],tokenIndex:0,tokenNumber:[],
       walletConnected:false,
    };

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          this.web3 = await getWeb3();
        
          var LandToken = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
          var Seed      = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";

          // Network ID 56 Main Chain
          if(this.networkId == 56)
          {
            // Binance Live
            LandToken         = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
            Seed              = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";
          }

          // Get the contract instance.
          this.networkId = await this.web3.eth.net.getId();

          // console.log("Network ID " + this.networkId);
          
          const deployedNetwork = MarsPoolLand.networks[this.networkId];
          this.MarsPoolLand = new this.web3.eth.Contract(
            MarsPoolLand.abi,
            "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78",
          );
    
          this.SeedToken = new this.web3.eth.Contract(
            SeedToken.abi,
            "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274",
          );
    

          // Use web3 to get the user's accounts.
          this.accounts = await this.web3.eth.getAccounts();

           this.getTotalSupply();
            
  
           const landBalance = await this.MarsPoolLand.methods.balanceOf(this.accounts[0]).call();
           const NCTBalance = await this.SeedToken.methods.balanceOf(this.accounts[0]).call();
           this.changeLandBalance();        
   
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({balance:landBalance, walletConnected:true,loaded:true,ether:0.1, currentWallet:this.accounts[0]});
          // console.log(this.state.currentWallet);

          this.getBalance();
          this.getNFTPrice();

          this.interval = setInterval(this.getBalance,2000);
          this.interval = setInterval(this.getTokens, 2000);


        } catch (error) {
          // Catch any errors for any of the above operations.
          //alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
          this.setState({
            walletConnected:false,
          });

          console.error(error);
        }
      };
    
      
      componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
      }      

 
      changeTotalSupply()
      {
         this.props.changeTotalSupply(this.state.completed);
      }   
            
      changeLandBalance()
      {
         this.props.changeLandBalance(this.state.balance);
      }     
      
      changeTokenList()
      {
         this.props.changeTokenList(this.state.tokenNumber);
      }  

      changeSeedBalance()
      {
         this.props.changeSeedBalance(this.state.nctBalance);
         this.props.currentWallet(this.state.currentWallet);
      }           

      handleInputChange = (event) => {

        const target = event.target;
        const value  = target.type === "checkbox" ? target.checked : target.value;
        const name   = target.name;
        var modifiedValue = value;
        // console.log(value);
  
        if(target.name == "nft")
        {
          var newPrice = value * this.state.ether;
          var css,warnText = "";
          
          newPrice  = Math.round(newPrice * 100) / 100;
    
          if(value > 5)
          {
            warnText = "Only 5 NFT's allowed per transaction ! "
            css = "alart";
            modifiedValue = 5;
            newPrice = 0;
          }
        }        
        if(target.name == "token_id")
        {
          
          this.getTotalSupply();
  
          // console.log("Token Supply " + this.state.total_supply);
          if(parseInt(modifiedValue) >= this.state.total_supply)
          {
            warnText = "You are not the owner of the token ! "
            css = "alart";
          }
  
        }
        //console.log("Variable Name = " + [name]); 
        this.setState({
          [name]:modifiedValue, pay:newPrice,warn:warnText,alertcss:css,
        });
        
        //console.log(this.state.token_id + " modifiedValue = " + modifiedValue);
     }
        

      getNFTPrice = async() => {

        const {nft, total_supply }  = this.state;
        var css,warnText = "";
        var css = "";
    
        const total_Supply = await this.MarsPoolLand.methods.totalSupply().call();
    
        var CurrentEther = 0.1;
        // console.log("Line 146 " + this.state.total_supply);
        if(parseInt(this.state.total_supply) == parseInt(this.state.maxsupply))
        {
          CurrentEther = 0;
        }
    
        // console.log("Line Number 150 " + total_Supply + "Max Supply = " + this.state.maxsupply);
        if(parseInt(total_Supply) == parseInt(this.state.maxsupply))
        {
           warnText = "Sale has already ended !";
           css = "alart";
           this.setState({
            alertcss:css,warn:warnText,ether:CurrentEther,
           }
           );  
           return 0;        
        }      
    
        const result = await this.MarsPoolLand.methods.getNFTPrice().call();
        var currentPrice = result;

        currentPrice = this.web3.utils.fromWei(currentPrice,"ether");
        if(currentPrice > 100)
        {
          currentPrice = 0;
        }
        this.setState({
          ether : currentPrice
        }
        );
       }
    
       withDrawOwner = async() => {
    
        var css,warnText  = "";
        const result = await this.MarsPoolLand.methods.withdraw().send({from : this.accounts[0],value: 0, data: 1}).on("receipt", (receipt) => {
          
    
          // Transaction succeeded
          this.MarsPoolLand.getPastEvents(
              "Transfer", {
                  fromBlock: receipt.blockNumber,
                  toBlock: receipt.blockNumber
              }, (errors, events) => {
                  for (let event in events) {
                      let returnValues = events[event].returnValues;
                      // Now do something with the event
                      // console.log("TEREER" + returnValues);
                  }
              });
    
      }).catch(function (e) {
          // Transaction rejected or failed
          warnText = "User cancelled the Transaction !";
          css = "alart";
      });
        var curentAmount = result;
        //console.log("Amount Withdrawn " + curentAmount);
    
        this.setState({alertcss:css,warn:warnText});
       }
    
      getTotalSupply = async() => {
        const total_Supply = await this.MarsPoolLand.methods.totalSupply().call();
        // console.log("Line 406" + total_Supply);
        var _completed = (100 * parseInt(total_Supply))/1786;
    
        _completed  = Math.round(_completed * 100) / 100;

        var currentSupply = total_Supply;
        var remainingNFT = 0;
        var remaingPercentage = 0;
        var soldNFT  = 0;

        if (currentSupply >= 1783) {
            remainingNFT = 1786 - currentSupply;
            soldNFT  = 3 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/3);
        }
        else if (currentSupply >= 1534) {
            remainingNFT = 1786 - currentSupply; 	  // 1535 - 1785 (251) 	  4.0 BNB
            soldNFT  = 251 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/251);
        } else if (currentSupply >= 1215) {
            remainingNFT = 1535 - currentSupply; 	  // 1216 - 1534 (319)		3.0 BNB
            soldNFT  = 319 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/319);
        } else if (currentSupply >= 906) {
            remainingNFT = 1216 - currentSupply;	  // 907 - 1215 (309) 	  2.5 BNB
            soldNFT  = 309 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/309);
        } else if (currentSupply >= 617) {
            remainingNFT = 907 - currentSupply;		  // 618 - 906 (289)		  2.0 BNB
            soldNFT  = 289 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/289);
        } else if (currentSupply >= 348) {
            remainingNFT = 618 - currentSupply; 		// 349 - 617 (269) 		  1.5 BNB
            soldNFT  = 269 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/269);
        } else if (currentSupply >= 99) {
            remainingNFT = 349 - currentSupply; 		// 100 - 348 (249)		  1.0 BNB
            soldNFT  = 249 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/249);
        } else {
            remainingNFT = 100 - currentSupply;		  // 0 - 99 (100)			    0.5 ETH 
            soldNFT  = 100 - remainingNFT;
            remaingPercentage = (100 * parseInt(soldNFT)/100);
        }
    
        remaingPercentage  = Math.round(remaingPercentage * 100) / 100;

        if(remaingPercentage == 0)
        {
          this.getNFTPrice();
        }


        this.changeTotalSupply()

        // console.log("Sold NFT " + soldNFT + " Remaining NFT " + remainingNFT + " The remainingNFT" + remaingPercentage);
        this.setState({
            remainingNFT:remainingNFT,total_supply:total_Supply, completed:_completed,remaingPercentage:remaingPercentage,
        });
       }


       getTokens = async() => {

        if(this.state.tokenIndex < this.state.balance)  
        {

        // console.log("getTokens: Token List " + this.state.tokens);
        let _tokenIndex  = await this.MarsPoolLand.methods.tokenOfOwnerByIndex(this.accounts[0],this.state.tokenIndex).call();
        
        // console.log("getTokens: @ " + this.state.tokenIndex +" Token Number = "  + _tokenIndex);
        this.setState({
          tokens:this.state.tokens.concat(this.state.tokenIndex),
          tokenIndex:this.state.tokenIndex+1,
          tokenNumber:this.state.tokenNumber.concat(_tokenIndex)
        });        
        this.changeTokenList();
          
       }        
       // console.log("getTokens: Token Number " + this.state.tokenNumber);
       }

       getBalance = async() => {

        const Accountbalance = await this.MarsPoolLand.methods.balanceOf(this.accounts[0]).call();
        const NCTBalance = await this.SeedToken.methods.balanceOf(this.accounts[0]).call();

        this.getTotalSupply();
    
        var NCT_Balance  = this.web3.utils.fromWei(NCTBalance,"ether");
    
        NCT_Balance  = Math.round(NCT_Balance * 100) / 100;
    
        // console.log(NCT_Balance);
        // console.log("Seed Token  Balance =" + NCT_Balance);
        // console.log("LAND Token Balance =" + Accountbalance);
    
        this.setState({
          balance : Accountbalance,
          nctBalance : NCT_Balance
        }
        );

        this.changeLandBalance();        
        this.changeSeedBalance();        
       }   
    
 
    
       getPrice = async() => 
       {
          const {nft, total_supply }  = this.state;
          var css,warnText = "";
    
          // console.log(total_supply + "Max Supply = " + this.state.maxsupply);
          if(parseInt(total_supply) == parseInt(this.state.maxsupply))
          {
             warnText = "Sale has already ended !";
             css = "alart";
             this.setState({
               alertcss:css,
               warn:warnText,
             }
             );  
             return 0;        
          }         
          
          var requestedNFT = parseInt(nft)  + parseInt(total_supply);
    
          // console.log("Current total_supply " + total_supply + " Current nft " + nft);
    
          // console.log("Number of NFT requested " + requestedNFT);
          
          var currentSupply = requestedNFT;
          var price = 0;
          var conflict = false;
    
          var _total_supply = parseInt(total_supply) + parseInt(nft);
     
          var  NFTBuyable = parseInt(nft);
          var priceChangeRange = 0;

          if(parseInt(total_supply) >= 1786)
            NFTBuyable = 0;
          
    
          if (_total_supply >= 1782 && _total_supply <= 1786) 
          {
            NFTBuyable = 1785 - parseInt(total_supply);
            conflict = true;
          } 
          else if (_total_supply >= 1534 && _total_supply < 1539)
          {
            NFTBuyable = 1533 - parseInt(total_supply); 
            conflict = true;
          }
          else if (_total_supply >= 1217 && _total_supply < 1220) 
          {
            NFTBuyable = 1216 - parseInt(total_supply);
            conflict = true;
          }
          else if (_total_supply >= 908 && _total_supply < 911) 
          {
            NFTBuyable = 907 - parseInt(total_supply);
    
            conflict = true;
          } 
          else if (_total_supply >= 619 && _total_supply < 622) 
          {
            NFTBuyable = 618 - parseInt(total_supply);
            conflict = true;
          }
          else if (_total_supply >= 350 && _total_supply < 353) 
          {

            NFTBuyable = 349 - parseInt(total_supply);
    
            conflict = true;
          } 
          else if (_total_supply >= 100 && _total_supply < 104) 
          {
            conflict = true;
            NFTBuyable = 100 - parseInt(total_supply); // This should be 100
          }
          else 
          {
            conflict = false;
          }
          // console.log("total_supply = " + total_supply + "_total_supply_ = " + _total_supply + "Conflict Check = " + conflict + " Price = " + priceChangeRange + " NFTBuyable "+NFTBuyable);
    
          if(NFTBuyable == 0)
          {
            NFTBuyable = nft;
          }
          // console.log("Buyable NFT" + NFTBuyable);

          if(this.state.remainingNFT <= 5 && NFTBuyable > this.state.remainingNFT)
          {
             NFTBuyable = this.state.remainingNFT; 
          }
          
    
          this.setState({ nft : NFTBuyable});
       }

       getSlotAvailable = async() => {

        var css,warnText = "";
        const {nft, total_supply ,maxsupply}  = this.state;
       }

       getWalletConnected = async() =>  {
        if (window.ethereum) {
          console.log(" Modern dapp browsers...");
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            console.log(" Request account access if needed...");
  
            await window.ethereum.enable();
            console.log("Waiting for request");
            window.location.reload(false);

            
            // this.get_WalletConnected();
            // Get the contract instance.
            try {
              console.log(this.web3);
            this.networkId = await this.web3.eth.net.getId();            
            }
            catch(error)
            {
              console.log(error);
            }

            this.setState({walletConnected:true});
            


           } catch (error) {
            let warnText = "User rejected the request to connect the wallet !";
            var css = "alart";
            this.setState({
             alertcss:css, 
             warn:warnText,
            }
            );
            
          }
        }
       }

       getWeb3 = () =>
       new Promise((resolve, reject) => {
         // Wait for loading completion to avoid race conditions with web3 injection timing.
         window.addEventListener("load", async () => {
           // Modern dapp browsers...
           if (window.ethereum) {
             console.log(" Modern dapp browsers...");
             const web3 = new Web3(window.ethereum);
             try {
               // Request account access if needed
               console.log(" Request account access if needed...");
     
               await window.ethereum.enable();
               console.log("Waiting for request");
               // Acccounts now exposed
               resolve(web3);
             } catch (error) {
               reject(error);
             }
           }
           // Legacy dapp browsers...
           else if (window.web3) {
             // Use Mist/MetaMask's provider.
             const web3 = window.web3;
             console.log("Injected web3 detected.");
             resolve(web3);
           }
           // Fallback to localhost; use dev console port by default...
           else {
             const provider = new Web3.providers.HttpProvider(
               "http://127.0.0.1:8545"
             );
             const web3 = new Web3(provider);
             console.log("No web3 instance injected, using Local web3.");
             resolve(web3);
           }
         });
       });       

       get_WalletConnected = async() =>  {
 

        var LandToken = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
        var Seed      = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";

        // Network ID 56 Main Chain
        if(this.networkId == 56)
        {
          // Binance Live
          LandToken         = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
          Seed              = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";
        }        

        // Get the contract instance.
        this.networkId = await this.web3.eth.net.getId();

        // Network ID 56 Main Chain
        if(this.networkId == 56)
        {
          LandToken = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
          Seed      = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";
        }
              
        const deployedNetwork = MarsPoolLand.networks[this.networkId];
        this.MarsPoolLand = new this.web3.eth.Contract(
          MarsPoolLand.abi,
          "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78",
      );
  
        this.SeedToken = new this.web3.eth.Contract(
          SeedToken.abi,
          "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274",
        );
  

        // Use web3 to get the user's accounts.
        this.accounts = await this.web3.eth.getAccounts();

         this.getTotalSupply();
          

         const landBalance = await this.MarsPoolLand.methods.balanceOf(this.accounts[0]).call();
         const NCTBalance = await this.SeedToken.methods.balanceOf(this.accounts[0]).call();
         this.changeLandBalance();        
 
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({balance:landBalance, walletConnected:true,loaded:true,ether:0.1, currentWallet:this.accounts[0]});
        //console.log(this.state.currentWallet);

        this.getBalance();
        this.getNFTPrice();

        this.interval = setInterval(this.getBalance,2000);
        this.interval = setInterval(this.getTokens, 2000);        
       }        
 
       getHomeNFT = async() => {

        var css,warnText = "";
        const {nft, total_supply ,maxsupply}  = this.state;
    
    
        console.log(total_supply + "Max Supply = " + maxsupply + " Account " + this.accounts[0]);
        if(parseInt(total_supply) == parseInt(maxsupply))
        {
           warnText = "Sale has already ended !";
           css = "alart";
           this.setState({
            alertcss:css, 
            warn:warnText,
           }
           );  
           return 0;        
        }      
       
         this.getPrice();
    
         var currentPrice = 0;
         var result = await this.MarsPoolLand.methods.getNFTPrice().call();
         currentPrice = result;
         var buyAbleNFT = this.state.nft;
    
         if(parseInt(this.state.nft) == 0)
         {
            result = this.state.ether;
            warnText = "NFT numbers cannot be zero !";
            css = "alart";
            this.setState({
              ether : result, warn:warnText,alertcss:css,
            }
            );  
            return 0;        
         }
       
         
    
         console.log("Current Price = " + currentPrice + " NFT" + buyAbleNFT);
    
         currentPrice = currentPrice * buyAbleNFT;
         try{
                  await this.MarsPoolLand.methods.mintNFT(buyAbleNFT).send({from : this.accounts[0],value: currentPrice, data: 1}).on("receipt", (receipt) => {
    
                  // Transaction succeeded
                  this.MarsPoolLand.getPastEvents(
                      "Transfer", {
                          fromBlock: receipt.blockNumber,
                          toBlock: receipt.blockNumber
                      }, (errors, events) => {
                          for (let event in events) {
                              let returnValues = events[event].returnValues;
                              // Now do something with the event
                              // console.log("TEREER" + returnValues);
                          }
                      });
    
              }).catch(function (e) {
                  // Transaction rejected or failed
                  warnText = "User cancelled the Transaction !";
                  css = "alart";
              });
    
          }
          catch(err)
          {
            console.log(err);
          }
    
         this.getBalance();
    
         result = this.web3.utils.fromWei(result,"ether");
    
         this.setState({
          ether : result, warn:warnText,alertcss:css,
        }
        );     
    
       }

       getClaim = async() => {
        //const { nft, ether} = this.state;
        // console.log("Claim Time Price = " );
    
        var lastClaimTime = 0;
        const result = await this.SeedToken.methods.lastClaim(1).call();
        lastClaimTime = result;
        // console.log("Claim Time Price = " + lastClaimTime );
    
        this.setState({
          lastClaim:lastClaimTime
        });
      }   
      
      SetNCTToken = async() => {

        try{
    
          var LandToken = "0x6C0CCD74e18D67a7F03B8fb17eB668ebC5C17fDD";
          const result = await this.SeedToken.methods.setMasksAddress(LandToken).send({from : this.accounts[0],value: 0, data: 0});
          // console.log("0x6C0CCD74e18D67a7F03B8fb17eB668ebC5C17fDD" + result);
    
        }
        catch(error)
        {
          // console.log("There is an error");
        }
        
        
      }   

      harvestSeeds = async() => {
    
        try{
    
          var token_id = this.state.token_id;
          token_id = 200;
           
          const isOwner = await this.MarsPoolLand.methods.tokenOfOwnerByIndex(this.accounts[0],token_id).call(); 
          if(isOwner < token_id)
          {
            var warnText = "You are not the owner of the Token !"
            this.setState({warn:warnText});
            return 0;
          }
          await this.SeedToken.methods.harvest([token_id]).send({from : this.accounts[0],value: 0, data: 0});
    
          this.getBalance();
           
        }
        catch(error)
        {
          console.log(error);
        }
        
      }   
    
     
    

    render() {
	    return (
		<div className="row ">
            <div className="alart_box">
                <div className={this.state.alertcss}>{this.state.warn}</div>
                <div className="number_area">
                  
                <div className="num_left" id="WALLET">
                    <p>Wallet Address <small className="colorwhite">{this.state.currentWallet}</small></p>
                </div>
                
                    <a name="BUY"></a>
                    {this.state.ether == 0 ? (
                          <div className="aligncenter">
                            <br/>
                            
                          </div>
                         ) : (
                           <div>
                          <div className="num_left" id="BUY">
                                  <p>Number of LAND Tokens</p>
                              </div>
                              <div className="num_right">
                                  {
                                  this.state.walletConnected == false ? (
                                      <input type="submit" value="Connect" className="btn" onClick={ this.getWalletConnected } />
                                    ) : (
                                      <div>
                                        <input type="text" className="aligncenter" name="nft" defaultValue="0" onChange={this.handleInputChange } />
                                        <input type="submit" value="Buy" className="btn" onClick={ this.getHomeNFT } />
                                      </div>
                                  )}                      
                              </div>

                          </div>
                         )}  

                  
                </div>
                <div className="smallbar"> 
                    <p>{this.state.remainingNFT} LAND Tokens available at BNB {this.state.ether} </p>
                    <ProgressBar key="1" className="smallbar" bgcolor="#e77d11" completed={this.state.remaingPercentage} />
                </div>
            </div>
        </div>
        );
        }
    }
export default Purchase;
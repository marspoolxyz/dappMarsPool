import React, {Component,useEffect } from 'react';
import MarsPoolLand from "../contracts/MarsPoolLand.json";
import SeedToken from "../contracts/SeedToken.json";
import getWeb3 from "../getWeb3";
import { confirmAlert } from 'react-confirm-alert'; // Import



var Data     = ['1', '2', '3', '4'],
MakeItem = function(X) 
{
    return <option value={X}>Token ID {X}</option>;
};




class Claim extends Component {


  

    state = {completed:33, loaded:false, ether:0, nft:0,pay:0,
        alertcss:"",warn:"",landBalance:0,seedBalance:0,lastClaim:0,
        property_name:0,maxsupply:1786,
        ownerAddress:"0x532C787de8070DC4eD2A32232D599d86d788Ef55",
        isOwner:false,
        newName:"",
        currentWallet:"",
        result:false,
        value:0,
       token_id:null,total_supply:0,progressStatusValue: 0,
    };

   


    componentDidMount = async () => {
        try {

          // Get network provider and web3 instance.
          this.web3 = await getWeb3();
    
          
          var LandToken = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
          var Seed = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";

          // Get the contract instance.
          this.networkId = await this.web3.eth.net.getId();

          let ownerAddress = this.state.ownerAddress;
          if (this.networkId == 56)
          {
            // Binance Live
            LandToken         = "0x11a3Ec08663D5E7112e2ba21d7DC83c697802B78";
            Seed              = "0x650C06a9cD1A74011c6fd5D4e4400c27252cE274";
            ownerAddress      = "0x532C787de8070DC4eD2A32232D599d86d788Ef55";
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
          
          const landBalance = await this.MarsPoolLand.methods.balanceOf(this.accounts[0]).call();
          const seedsBalance = await this.SeedToken.methods.balanceOf(this.accounts[0]).call();
          

          if(this.accounts[0] == ownerAddress)
          {
            this.state.isOwner = true;
          }
  
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ 
            loaded:true,ether:0, 
            landBalance:landBalance,
            seedsBalance:seedsBalance,
            ownerAddress:ownerAddress,
            currentWallet:this.accounts[0]});
          console.log(this.state.currentWallet);
        } catch (error) {
          // Catch any errors for any of the above operations.
          // alert(`Failed to load web3, accounts, or contract. Check console for details.`);
          console.error(error);
        }
      };

       

      withDrawOwner = async() => {
        const result = await this.MarsPoolLand.methods.withdraw().send({from : this.state.ownerAddress,value: 0, data: 0});
      }

      harvestSeeds = async() => {
        
        var currentPrice = 0;
        try{
    
          //var token_id = this.state.token_id;
          let token_id = 4;         
          //console.log("harvestSeeds:" + this.props.tokenList);
          
          {/*
          const isOwner = await this.MarsPoolLand.methods.tokenOfOwnerByIndex(this.accounts[0],token_id).call(); 
          console.log(this.accounts[0]+ "TEST " + isOwner);  
          if(isOwner < token_id)
          {
            var warnText = "You are not the owner of the Token !"
            this.setState({warn:warnText});
            return 0;
          }
          */}

          this.setState({
            warn:"",alertcss:"",
          });          

          //const result = await this.SeedToken.methods.harvest([token_id]).send({from : this.accounts[0],value: 0, data: 0});
          const result = await this.SeedToken.methods.harvest(this.props.tokenList).send({from : this.accounts[0],value: 0, data: 0});
          this.getBalance();
           
        }
        catch(error)
        {
          console.log("There is an error" + error);
        }
      }   

      Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
          return <h1>Please sign up.</h1>;
        }
        return <h1>Welcome back!</h1>;
      }
       
      handleNameChange = (event) => {
        const target = event.target;
        this.setState({ newName: event.target.value ,warn:"",alertcss:""});
      }
      handleChange = (event) => {
        const target = event.target;
        this.setState({ token_id: event.target.value });
      }

      
      changeName = async() => {
        
        let tokenid = this.state.token_id;
        let warnText, css = "";
        if( (this.state.token_id == null) && this.props.tokenList.length > 0)
        {
          tokenid = this.props.tokenList[0];
        }

        //console.log("New NAme = " + this.state.newName + "Toekn =" + tokenid);
        let NewName = this.state.newName;
        let result = true;

        if(NewName.length > 0)
        {
            const result = await this.MarsPoolLand.methods.changeName(tokenid,NewName).send({from : this.props.currentWallet,value: 0, data: 0});  
        }
        else
        {
          warnText = "Give a name to your LAND Token " + tokenid;
          css = "alart";          
        }

        this.setState({
          warn:warnText,alertcss:css,
        });      
        
        

      }      

      

      
    render() {
      const landToken = this.props.landBalance;
      const tokenList = this.props.tokenList.length;

	    return (
		<div className="row">
            <div className="alart_box">
                <div className={this.state.alertcss}>{this.state.warn}</div>
                <ul>
                <li>You have {this.props.landBalance} LAND tokens and {this.props.seedBalance} SEED tokens<br/></li>
                {this.props.landBalance > 0 ? (  
                <li><select style={{width:"140px"}} onChange={this.handleChange}>{this.props.tokenList.map(MakeItem)}</select></li>
                ):(<li></li>)}
                

                {(this.props.tokenList.length == this.props.landBalance && this.props.tokenList.length > 0) ? (
                  <li className="num_right">
                    <input type="text" className="aligncenter" name="newname" defaultValue="" onChange={this.handleNameChange}/>
                    <input style={{backgroundcolor: "red"}} className="btn" type="submit" value="Harvest SEEDs"  onClick={ this.harvestSeeds } />
                    <input style={{backgroundcolor: "red"}} className="btn" type="submit" value="CHANGE NAME"  onClick={ this.changeName } />
                  </li>
                  ) : (
                    <li>Loading {this.props.tokenList.length} LAND</li>
                    
                  )}                
                
                {this.state.isOwner == true ? (
                  <li><a onClick={ this.withDrawOwner }>With Draw</a></li>

                  ) : (
                    <li></li>
                  )}                
                                
                </ul>
            </div>    
        </div>
        );
        }
    }
export default Claim;
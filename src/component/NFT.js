import React, {Component, useState} from 'react';
import Claim from './Claim';
import Purchase from './Purchase';
import MainSale from './MainSale';

class NFT extends Component {

    state = {currentWallet:"",completed:0,landBalance:0,seedBalance:0,tokenList:[]};


    changeSeedBalance(_seedBalance)
    {
        console.log("seedBalance value" + _seedBalance);
        this.setState({
            seedBalance: _seedBalance
        });
    }

    changeLandBalance(_landBalance)
    {
        console.log("Modified value" + _landBalance);
        this.setState({
            landBalance: _landBalance
        });
    }

    changeTokenList(_tokenList)
    {
        console.log("Token List:" + _tokenList);
        this.setState({
            tokenList: _tokenList
        });
    }
    
    changeTotalSupply(totalSupply)
    {
        console.log("Modified value" + totalSupply);
        this.setState({
            completed: totalSupply
        });
    }

    currentWallet(walletAddress)
    {
        this.setState({
            currentWallet: walletAddress
        });        
    }
    render() {
	    return (
		<div className="row ">
                <MainSale totalSupply={this.state.completed}/>
                <div className="row row-xl-2 row-l-2 row-m-1">
                    <div className="col-xl-6 col-l-6 col-m-12">
                        <Purchase 
                        changeTotalSupply={this.changeTotalSupply.bind(this)}
                        changeLandBalance={this.changeLandBalance.bind(this)}
                        changeSeedBalance={this.changeSeedBalance.bind(this)}
                        changeTokenList={this.changeTokenList.bind(this)}
                        currentWallet={this.currentWallet.bind(this)}
                        />
                    </div>
                    <div className="col-xl-6 col-l-6 col-m-12">
                        <Claim 
                        landBalance={this.state.landBalance}
                        seedBalance={this.state.seedBalance}
                        tokenList={this.state.tokenList}
                        currentWallet={this.state.currentWallet}
                        />
                    </div>
                </div>
        </div>
        );
        }
    }
export default NFT;
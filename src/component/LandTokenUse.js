import React, {Component} from 'react';
class LandTokenUse extends Component {
    render() {
	    return (
		<div className="row ">
            <div className="gap-top">
                <h2 className="gap-small">Introducing MarsPool NFT LAND Token</h2>
                <h6>NFT Token with distinct use-case to the owners</h6>

                <p>In MarsPool, the LAND token is a NFT token that contains lots of rewards for the owners. 
                Initial investors have an life-long 20% royalty on rewards even after NFT is sold. 
                </p>
                <p>SEED Tokens plays vital role in eco-system, as the project owners, who is willing to raise funds from the 
                    MarsPool community need to acquire SEEDs and burn them to list the project.
                    As more and more projects get attention to the MarsPool community 
                    there will be scarcity of SEEDs as SEEDs are burnt and can be harvested 
                    only by the NFT LAND Owners.
                </p>
                
                <p> SEEDs can be used to register the LAND owners name in the block-chain, meaning when MarsPool LAND token
                    owner wants to give a name to his/her LAND token, there is a cost associated with registering the 
                    unique name to LAND. SEEDs send to the name registration contract shall be burnt, which reduces the total supply
                    of the SEEDs token at a given point of time. SEEDs can only be harvested by (NFT) LAND token owners.
                </p>
            </div>   
        </div>
        );
        }
    }
export default LandTokenUse;
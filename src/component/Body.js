import React, { Component} from 'react';
import NFT from './NFT';
import ArtSlider from './ArtSlider';
import Contract from './VerifiedContract';
import SeedToken from './SeedToken';

class Body extends Component {


    openModal1() {
     
    }

    openModal2() {
     
    }

    openModal3() {
     
    }
    
    openModal4() {
     
    }
    openModal5() {
     
    }        

    render() {

	    return (
		<div className="row">
            <div className="main_wrap">
            <div className="content_wrapper bg-black">
                <div className="wrapper">
                <SeedToken/>
                <div  id="BENEFITS">
                    <h2 className="gap-small">Benefits</h2>
                </div>                   
                <div className="row row-xl-3 row-l-3 row-m-2 row-s-2 work_area">
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-1.png" alt="NFT Rental" /></div>
                        <div className="work_txt">
                        <h6><a href="#" onClick={ this.openModal1 }>NFT Rental</a></h6>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-2.png" alt="NFT Royalty" /></div>
                        <div className="work_txt">
                        <h5><a href="#" onClick={ this.openModal2 }>NFT Royalty</a></h5>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-3.png" alt="Voting Power" /></div>
                        <div className="work_txt">
                        <h5><a href="#" onClick={ this.openModal3 }>Voting Power</a></h5>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-4.png" alt="Air Drops" /></div>
                        <div className="work_txt">
                        <h6><a href="#" onClick={ this.openModal4 }>Air Drops</a></h6>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-5.png" alt="Sell" /></div>
                        <div className="work_txt">
                        <h5><a href="#" onClick={ this.openModal5 }>Sell</a></h5>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-4 col-l-4 col-m-6 col-s-6">
                    <div className="work_box">
                        <div className="work_img"><img src="images/cat-6.png" alt="Algorithmic Art" /></div>
                        <div className="work_txt">
                        <h5><a href="#" onClick={ this.openModal5 }>Algorithmic Art</a></h5>
                        </div>
                    </div>
                    </div>
                </div>
                <NFT></NFT>
                <ArtSlider/>
                <Contract/>
                </div>      
            </div>
            </div>           
         </div>  
	     );
    }
}
export default Body;
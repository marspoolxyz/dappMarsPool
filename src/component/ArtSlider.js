import React, {Component} from 'react';
import SeedTokenUse from './SeedTokenUse';

class ArtSlider extends Component {
    render() {
	    return (
		<div className="row ">
                <SeedTokenUse/>
                <div  id="GALLERY">
                    <h2 className="gap-small">Gallery</h2>
                </div>                   
                <div className="weav_area"  id="GALLERY">
                    <div className="owl-carousel owl-theme" id="owl-one">
                    <div className="item"><img src="images/8707.png" alt="round" /></div>
                    <div className="item"><img src="images/5274.png" alt="round" /></div>
                    <div className="item"><img src="images/round.png" alt="round" /></div>
                    <div className="item"><img src="images/green-2331.png" alt="round" /></div>
                    </div>
                </div>
        </div>
        );
        }
    }
export default ArtSlider;
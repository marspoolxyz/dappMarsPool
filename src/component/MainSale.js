import React, {Component} from 'react';
import ProgressBar from "./ProgressBar";

class MainSale extends Component {

    render() {
	    return (
		<div className="row ">
            <div  id="LIVE">
                <h2 className="gap-small">Live Sale</h2>
            </div>               
            <div className="value_box">
            <div className="row row-xl-3 row-l-3 row-m-3 row-s-3">
            <div className="col-xl-3 col-l-3 col-m-2 col-s-1">&nbsp;</div>
            <div className="col-xl-6 col-l-6 col-m-8 col-s-10 aligncenter">
                <h5>Lives on digital art and collectibles with a value hierarchy <span>(Record and Proof)</span>.</h5>
            </div>
            <div className="col-xl-3 col-l-3 col-m-2 col-s-1">&nbsp;</div>
            </div>
            <div className="progressbar">
                <ProgressBar key="1" className="smallbar" bgcolor="#c1440e" completed={this.props.totalSupply} />
            </div>
            </div>
        </div>
        );
        }
    }
export default MainSale;
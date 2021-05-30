import React, {Component} from 'react';
class Header extends Component {
    render() {
	    return (
		<div className="row ">
            <header>
            <div className="header_bot">
                <div className="wrapper">
                <div className="logo"><a href="index.html"><img src="images/logo.png" alt="logo" /></a></div>
                <div className="menu_area">
                    <div id="navigation">
                    <div id="navbtn">menu</div>
                    <ul id="menu-nenu" className="nav-menu">
                        <li><a href="#INTRO">HOME</a></li>
                        <li><a href="#BENEFITS">BENEFITS</a></li>
                        <li><a href="#GALLERY">GALLERY</a></li>
                        <li><a href="#SEED">SEED TOKEN</a></li>
                        <li><a href="#WALLET">MY WALLET</a></li>
                        <li><a href="#LIVE">LIVE SALE</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </header>            
        </div>  
	     );
    }
}
export default Header;
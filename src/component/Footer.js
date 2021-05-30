import React, {Component} from 'react';
class Footer extends Component {
    render() {
	    return (
		<div className="row ">
            <footer>
            <div className="footer_content">
                <div className="wrapper">
                <div className="row row-xl-2 row-l-2 row-m-2 row-s-1">
                    <div className="col-xl-9 col-l-9 col-m-9 col-s-12">
                    <div className="footer_links">
                        <ul>
                        <li><a href="#">Terms and Conditions</a></li>
                        <li><a href="#">Grant Program</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Disclaimer</a></li>
                        </ul>
                    </div>
                    <div className="copyright_wrap">
                        <p>© 2021 MarsPool Labs</p>
                    </div>
                    </div>
                    <div className="col-xl-3 col-l-3 col-m-3 col-s-12">
                    <div className="footer_social">
                        <ul>
                        <li><a href="#"><img src="./images/fi-1.png" alt="fi"/></a></li>
                        <li><a href="https://marspoolxyz.medium.com/"><img src="./images/fi-2.png" alt="fi"/></a></li>
                        <li><a href="https://twitter.com/MPoolxyz"><img src="./images/fi-3.png" alt="fi"/></a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </footer>
            </div>  
	     );
    }
}
export default Footer;
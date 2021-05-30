import React, {Component} from 'react';
import Benefits from './Benefits';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';


class NFTSale extends Component {
    

    render() {
	    return (
                <div>
                <Header/>
                <Body/>
                <Footer/>
                <Benefits/>
                </div>
	     );
    }
}
export default NFTSale;
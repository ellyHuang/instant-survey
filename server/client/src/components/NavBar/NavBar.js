import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCredits from '../AddCredits/AddCredits';

import './NavBar.css';
import logo from '../../assets/Logo.png';

class NavBar extends Component {
    renderContent() {
        switch (this.props.auth){
            case null:
                return ;
            case false:
                return <li><a href="/auth/google">Login with google</a></li> ;
            default:
                return [
                    <li key="0"><AddCredits/></li>,
                    <li key="1" style={{margin:"0 10px"}}>Credits：{this.props.auth.credits}</li>,
                    <li key="2"><a href="api/logout">Logout</a></li>
                ];
        }
    }

    render(){
        return (
            <nav className='N/A transparent cool-navbar z-depth-0'>
                <div  className="nav-wrapper">
                    <Link to={ this.props.auth ? '/surveys' : '/'}>
                        <img src={logo} width='auto' height='55' alt='logo' className='logo'/>
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}   
                    </ul>
                </div>
            </nav>
        )
    }
};

//pull out the actual peice of state that we care in this component
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(NavBar) ;
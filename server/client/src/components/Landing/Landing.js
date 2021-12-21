import React,{ Component } from 'react';
import { connect } from 'react-redux';
import './Landing.css';
import Particles from "react-tsparticles";


const particlesOption = {
    fpsLimit: 90,
    particles: {
        color: {
            value: "#e0e0e0",
            opacity: 0.3,
        },
        links: {
            enable: true,
            color: "#e0e0e0",
            distance: 250,
            opacity: 0.3,
        },
        number:{
            value: 50,
            density:{
                enable: true,
                value_area: 800
            },
        },
        move: {
            enable: true
        }
    }
};

class Landing extends Component {
    render() {
        return (
            <div className='valign-wrapper landingPage'>
                <Particles params={particlesOption} className='particles'/>
                <div className='left title'>
                    <h1>YOUR NEXT</h1>
                    <h1>INSPIRING INSIGHT</h1>
                    <h5>Collect customers feedback in just a second</h5>
                    <li>
                        <a class="waves-effect waves-light login-btn" href="/auth/google">Learn more</a>
                    </li>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);

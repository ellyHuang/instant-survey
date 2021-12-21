import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SurveyCollection from '../Survey/SurveyCollection/SurveyCollection';
import './Dashboard.css';

class Dashboard extends Component {
    renderName(){
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return <h5>Hello, visitor</h5>;
            default:
                return <h5>Hello, {this.props.auth.name}</h5>;
        }
    }

    render(){
        return (
            <div>
                <div>
                    {this.renderName()}
                </div>
                <SurveyCollection />
                <div class="fixed-action-btn">
                    <Link to='/surveys/new' class="btn-floating btn-large orange darken-4">
                        <i class="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Dashboard);
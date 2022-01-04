import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Hints } from 'intro.js-react';

import './App.css';
import NavBar from './NavBar/NavBar';
import Landing from './Landing/Landing';
import Dashboard from './DashBoard/Dashboard';
import SurveyNew from '../components/Survey/SurveyNew';
import 'intro.js/introjs.css'; 

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <div className="container">
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={ <Landing /> } />
                        <Route path="/surveys" element={ <Dashboard /> }/>
                        <Route path="/surveys/new" element={ <SurveyNew /> } />
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default connect(null, actions)(App);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../../actions';

import ResultBar from '../resultBar';
import './SurveyCollection.css';

class SurveyCollection extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.map(survey => {
            return(
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Latest Response: { new Date(survey.lastResponded).toLocaleDateString() }</p>
                    </div>
                    <div className="card-action row">
                        <a className="positive-color">Yes: {survey.positive}</a>
                        <a className="negative-color">No: {survey.negative}</a>
                        <ResultBar Yes={survey.positive} No={survey.negative} />
                    </div>
                </div>
            )
        })
    };

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    };
};


function mapStateToProps({ surveys }) {
    return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyCollection);
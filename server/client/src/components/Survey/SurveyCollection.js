import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyCollection extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Latest Response: { new Date(survey.lastResponded).toLocaleDateString() }</p>
                    </div>
                    <div className="card-action row">
                        <a>Yes: {survey.positive}</a>
                        <a>No: {survey.negative}</a>
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
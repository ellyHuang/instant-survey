import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import * as actions from '../../../actions';

import SurveyFieldContent from '../SurveyFieldContent';
import './SurveyFormReview.css';

const SurveyFormReview = ({ onEditPage, formValues, submitSurvey }) => {
    const navigate = useNavigate();

    const reviewContent = _.map(SurveyFieldContent, ({name, label}) => {
        return(
            <div key={name} className='review-form'>
                <label className='form-label'>{label}</label>
                <div className='form-value'>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5> Please check your survey content again! </h5>
            <div  className="survey-form">{reviewContent}</div>
            <button onClick={onEditPage} className='btn waves-effect waves-light grey lighten-2 black-text'><i className="material-icons left">chevron_left</i>BACK</button>
            <button onClick={ () => submitSurvey(formValues, navigate('/surveys')) } className='btn waves-effect waves-light right'><i className="material-icons right">send</i>SEND SURVEY</button>
        </div>
    )
};

function mapStateToProps( state ) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from '../SurveyField/SurveyField';
import SurveyFieldContent from '../SurveyFieldContent';
import validateEmails from '../../../utils/validateEmails';
import './SurveyForm.css';

class SurveyForm extends Component {
    constructor(props){
        super(props); 
    };

    renderFields() {
        return _.map(SurveyFieldContent, ({ label, name, note }) => {
            return <Field key={name} label={label} type='text' name={name} note={note} component={SurveyField} />
        })
    }

    render() {
        return (
            <div className="outer-container">
                <h5 className="create-survey"> Create a new survey </h5>
                <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit )}>
                    <div>{this.renderFields()}</div>
                    <Link to='/surveys' className='btn waves-effect waves-light grey lighten-2 black-text'>CANCEL</Link>
                    <button className='btn waves-effect waves-light right' type='submit'><i className="material-icons right">chevron_right</i>Next</button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const err = {};

    err.recipients = validateEmails(values.recipients || '');

    _.each(SurveyFieldContent, ({name}) => {
        if(!values[name]){
            err[name] = 'Your must provide a value';
        }
    })

    return err;
};


export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);
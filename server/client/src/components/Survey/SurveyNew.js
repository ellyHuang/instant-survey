import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm/SurveyForm';
import SurveyFormReview from './SurveyFormReview/SurveyFormReview';

class SurveyNew extends Component {
    constructor(props) {
        super(props);
        this.state = {reviewMode: false};
    };

    renderContent(){
        if(this.state.reviewMode){
            return <SurveyFormReview onEditPage={()=>{this.setState({reviewMode: false});}}/>
        }else{
            return <SurveyForm onSurveySubmit={()=>{this.setState({reviewMode: true});}}/>
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}


export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
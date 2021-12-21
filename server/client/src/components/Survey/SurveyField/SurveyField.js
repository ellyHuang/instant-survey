import React from 'react';
import './SurveyField.css';

export default ({ input, label, note,  meta:{error, touched} }) => {
    return (
        <div  className="survey-form">
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} placeholder={note}/>
            <div className='red-text'> { touched && error } </div>
        </div>
    )
}
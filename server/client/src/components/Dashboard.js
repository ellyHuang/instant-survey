import React from 'react';
import { Link } from 'react-router-dom';

import SurveyCollection from './Survey/SurveyCollection';

const  Dashboard = () => {
    return (
        <div>
            <SurveyCollection />
            <div class="fixed-action-btn">
                <Link to='/surveys/new' class="btn-floating btn-large teal lighten-1">
                    <i class="large material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;
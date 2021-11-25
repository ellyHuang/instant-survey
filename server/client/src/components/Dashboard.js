import React from 'react';
import { Link } from 'react-router-dom';

const  Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <div class="fixed-action-btn">
                <Link to='/surveys/new' class="btn-floating btn-large teal lighten-1">
                    <i class="large material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;
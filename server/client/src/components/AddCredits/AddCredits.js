import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './AddCredits.css';

class AddCredits extends Component {
    render() {
        return (
            <StripeCheckout
                name="Instant Survey"
                description="One dollar, one credit, one servey!"
                amount={500}
                label="確認付款"
                token={ token => this.props.handleStripeToken(token) }
                stripeKey={ process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn btn-primary">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(AddCredits);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Router,
    Route
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from './containers/Register.jsx';

import './scss/main.scss';

const customHistory = createBrowserHistory();

class AppContainer extends React.Component {
    render() {
        return (
            <Router history={customHistory}>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route exact path="/register" component={Register} />
                </div>
            </Router>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageOrder from '../containers/System/Driver/ManageOrder';

class Driver extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        return (
            <>
                {isLoggedIn && userInfo && userInfo.roleId === 'R2' &&
                    this.props.history.push('/home')
                }
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/driver/manage-driver-order" component={ManageOrder} />
                        </Switch>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Driver));
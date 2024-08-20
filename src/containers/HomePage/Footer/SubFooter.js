import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SubFooter.scss'
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class SubFooter
    extends Component {
    render() {
        return (
            <>
                <div className='sub-footer-container'>
                    <div className='content-left'>
                        <div>
                            <h5><FormattedMessage id="sub-footer.title1" /></h5>
                            <Link to='/home'><FormattedMessage id="sub-footer.title2" /></Link>
                            <Link to='/login'><FormattedMessage id="sub-footer.title3" /></Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title4" />p</Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title5" /> </Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title6" /></Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title7" /></Link>
                        </div>
                    </div>
                    <div className='content-center'>
                        <div>
                            <h5><FormattedMessage id="sub-footer.title8" /></h5>
                            <Link to='/home'><FormattedMessage id="sub-footer.title9" /></Link>
                            <Link to='/login'><FormattedMessage id="sub-footer.title10" /></Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title11" /></Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title12" /> </Link>

                        </div>
                    </div>
                    <div className='content-right'>
                        <div>
                            <h5><FormattedMessage id="sub-footer.title13" /> </h5>
                            <Link to='/introduction'><FormattedMessage id="sub-footer.title14" /> </Link>
                            <Link to='/login'><FormattedMessage id="sub-footer.title15" /> </Link>
                            <Link to='/incentives'><FormattedMessage id="sub-footer.title16" /> </Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title17" /> </Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title18" /> </Link>
                            <Link to='/home'><FormattedMessage id="sub-footer.title19" /> </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubFooter));

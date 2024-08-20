import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../assets/images/smart-logi.svg'
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {
        return (
            <>
                <div className='home-footer'>
                    <div className='content-up'>
                        <div className='logo'>
                            <img src={logo}></img>
                        </div>
                        <div className='center'>
                            <div className='center-up'>
                                <Link to='/home'><FormattedMessage id="home-footer.title1" /></Link>
                                <Link to='/home'><FormattedMessage id="home-footer.title2" /></Link>
                                <Link to='/home'><FormattedMessage id="home-footer.title3" /></Link>
                            </div>
                            <div className='center-down'>
                                <Link to='/home'><FormattedMessage id="home-footer.title4" /></Link>
                                <Link to='/home'><FormattedMessage id="home-footer.title5" /></Link>
                                <Link className={'last-child'} to='/home'><FormattedMessage id="home-footer.title6" /></Link>
                            </div>
                        </div>
                        <div className='social'>
                            <h5><FormattedMessage id="home-footer.follow" /></h5>
                            <div>
                                <i className="fab fa-twitter"></i> <i className="fab fa-facebook"></i>
                                <i className="fab fa-youtube"></i> <i className="fab fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='content-copyright'>
                            <p> 2024 &copy; - all rights reserved</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

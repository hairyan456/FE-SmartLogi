import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHomePage.scss';
import logo from '../../../assets/images/smart-logi.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import { changeLanguageApp } from '../../../store/actions/appActions';
import { Link, withRouter } from 'react-router-dom';
import logoBaoGia from '../../../assets/images/gui-hang-ngay.svg'
import logoNhanBaoGia from '../../../assets/images/nhan-bao-gia.svg'
import logoService from '../../../assets/images/smart-logi-service.svg'
import * as actions from '../../../store/actions';
import ModalVoucher from './Voucher/ModalVoucher';
import bangGia from '../../../assets/bang-gia-xe-SmartLogi.pdf'

class HeaderHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false
        }
    }
    changeLanguage = (language) => {
        //fire Redux Actions:
        this.props.changeLanguageAppRedux(language);
    }
    isOpenModalVoucher = () => {
        this.setState({ isOpenModal: true })
    }
    toggleModalVoucher = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal })
    }

    render() {
        const { isShowBanner, processLogout, userInfor } = this.props;
        return (
            <>
                <ModalVoucher isShow={this.state.isOpenModal} toggleFromParrent={this.toggleModalVoucher} />
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <Link to='/home'><img style={{ width: '150%', height: '150px' }} className='header-logo' src={logo} /></Link>
                        </div>
                        <div className='right-content'>
                            <div className='introduction'>
                                <Link to='/introduction'><FormattedMessage id="home-header.introduction" /></Link>
                            </div>
                            <div className='voucher'>
                                <span onClick={() => this.isOpenModalVoucher()}><FormattedMessage id="home-header.voucher" /></span>
                            </div>
                            <div className='incentives'>
                                <Link to='/incentives' ><FormattedMessage id="home-header.incentives" /></Link>
                            </div>
                            <div className='country'>
                                <i className="fas fa-globe"></i>
                                <FormattedMessage id="home-header.country" />
                            </div>
                            <div className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <div className='sign-in'>
                                {this.props.isLoggedIn ?
                                    <>
                                        <button onClick={processLogout} className='btn btn-sign-in'>
                                            <Link to='/login'>
                                                <i class="fas fa-sign-in-alt"></i>
                                                <span style={{ marginLeft: '10px' }}>
                                                    <FormattedMessage id="home-header.sign-out" />
                                                </span>
                                            </Link>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className='btn btn-sign-in'>
                                            <Link to='/login'>
                                                <i class="fas fa-sign-in-alt"></i>
                                                <span>
                                                    <FormattedMessage id="home-header.sign-in" />
                                                </span>
                                            </Link>
                                        </button>
                                    </>
                                }


                            </div>
                        </div>

                    </div>
                </div>

                {isShowBanner &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title'><FormattedMessage id="banner.title" /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Nhập mã đơn hàng của bạn...' />
                                <button className='btn btn-danger'><FormattedMessage id="banner.search-btn" /></button>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <img src={logoBaoGia}></img>
                                    </div>
                                    <div className='text-child'>
                                        <Link to='/order'><FormattedMessage id="banner.text-child1" /></Link>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '70px' }} className='option-child'>
                                    <div className='icon-child'>
                                        <img src={logoNhanBaoGia}></img>
                                    </div>
                                    <div className='text-child'>
                                        <a href={bangGia} download><FormattedMessage id="banner.text-child2" /></a>

                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <img src={logoService}></img>
                                    </div>
                                    <div className='text-child'><FormattedMessage id="banner.text-child3" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfor: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderHomePage));

import './Register.scss';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { registerNewUser } from '../../../services/userService';
import Lightbox from 'react-image-lightbox'; //thư viện để click ảnh sẽ phóng to ảnh ra
import 'react-image-lightbox/style.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'KhachHang',
            email: "",
            phoneNumber: "",
            fullNameOrCompanyName: '',
            citizenIdOrTaxCode: '',
            password: "",
            confirmPassword: "",
            objCheckInput: {
                isValidEmail: true,
                isValidphoneNumber: true,
                isValidFullNameOrCompanyName: true,
                isValidCitizenIdOrTaxCode: true,
                isValidPassword: true,
                isValidConfirmPassword: true
            },
            previewImgURL: '', isOpen: false,
            previewImgURL1: '', isOpen1: false,
        };
    }

    componentDidMount() {
    }

    handleOptionChange = (event) => {
        this.setState({ selectedOption: event.target.value })
    };

    // hàm chuyển ảnh -> Base64 (ở CommonUtils.js)
    // khi chọn ảnh sẽ cho xem trước ở dưới (previewImage) (truyền BLOB hay base64 đều được)
    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let objURL = URL.createObjectURL(file);  // kiểu string (BLOB)
            this.setState({
                previewImgURL: objURL
            });
        }
    }

    handleOnChangeImage1 = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let objURL = URL.createObjectURL(file);  // kiểu string (BLOB)
            this.setState({
                previewImgURL1: objURL
            });
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return; //nếu chưa tải ảnh lên sẽ không cho xem trước!
        this.setState({ isOpen: true });
    }

    openPreviewImage1 = () => {
        if (!this.state.previewImgURL1) return; //nếu chưa tải ảnh lên sẽ không cho xem trước!
        this.setState({ isOpen1: true });
    }

    handleRegister = async () => {
        if (this.isValidInputs()) {
            try {
                let response = await registerNewUser({
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    fullNameOrCompanyName: this.state.fullNameOrCompanyName,
                    citizenIdOrTaxCode: this.state.citizenIdOrTaxCode,
                    password: this.state.password,
                    isCustomerOrBusiness: this.state.selectedOption
                }
                );
                switch (response.EC) {
                    case 0:
                        toast.success('Create successfully');
                        setTimeout(() => {
                            this.props.history.push('/login');
                        }, 2000);
                        break;
                    case 1:
                        toast.error('Email or phoneNumber is existed!');
                        break;
                    case 2:
                        toast.error('Password must have more than 3 letters');
                        break;
                    case 3:
                        toast.error('Citizend ID or Tax code is existed!');
                        break;
                    default:
                        toast.error('An unknown error occurred');
                        break;
                }
            } catch (error) {
                toast.error('Something wrongs on server! Please check Log');
                console.log(error);
            }
            return;
        }
    }

    isValidInputs = () => {
        const { email, phoneNumber, fullNameOrCompanyName, citizenIdOrTaxCode, password, confirmPassword } = this.state;
        let defaultValidInput = {
            isValidEmail: true,
            isValidphoneNumber: true,
            isValidFullNameOrCompanyName: true,
            isValidCitizenIdOrTaxCode: true,
            isValidPassword: true,
            isValidConfirmPassword: true
        };

        if (!email) {
            toast.error('Email is empty!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidEmail: false } });
            return false;
        }
        let req = /\S+@\S+\.\S+/;
        if (!req.test(email)) {
            toast.error('Please type a valid email!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidEmail: false } });
            return false;
        }

        if (!phoneNumber) {
            toast.error('phoneNumber is empty!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidphoneNumber: false } });
            return false;
        }
        if (!fullNameOrCompanyName) {
            toast.error('Full name or Company name is empty!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidFullNameOrCompanyName: false } });
            return false;
        }
        if (!citizenIdOrTaxCode) {
            toast.error('Citizen ID or Tax Code is empty!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidCitizenIdOrTaxCode: false } });
            return false;
        }
        if (!password) {
            toast.error('Password is empty!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidPassword: false } });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Your password is not the same!');
            this.setState({ objCheckInput: { ...defaultValidInput, isValidConfirmPassword: false } });
            return false;
        }

        return true;
    }

    render() {
        const { email, phoneNumber, fullNameOrCompanyName, citizenIdOrTaxCode,
            password, confirmPassword, objCheckInput, selectedOption } = this.state;

        return (
            <div className="register-container">
                <div className="container">
                    <div className="row px-3 px-sm-0 pt-3 pt-sm-5">
                        <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                            <div className='label'>Smart Logi </div>
                            <div className='detail'>"Delivering Efficiency, Driving Success."</div>
                            <div className='choose-business-personal'>
                                <label>
                                    <input
                                        type="radio"
                                        value="KhachHang"
                                        checked={selectedOption === 'KhachHang'}
                                        onChange={this.handleOptionChange}
                                    />
                                    Individual
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="DoanhNghiep"
                                        checked={selectedOption === 'DoanhNghiep'}
                                        onChange={this.handleOptionChange}
                                    />
                                    Business
                                </label>
                            </div>
                        </div>
                        <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                            <div className='label d-sm-none'>Smart Logi </div>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address' type='email'
                                    value={email} onChange={(event) => this.setState({ email: event.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label>Phone number:</label>
                                <input className={objCheckInput.isValidphoneNumber ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number' type='text'
                                    value={phoneNumber} onChange={(event) => this.setState({ phoneNumber: event.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label>{selectedOption === 'KhachHang' ? 'Full name' : 'Business name'}</label>
                                <input className={objCheckInput.isValidFullNameOrCompanyName ? 'form-control' : 'form-control is-invalid'} placeholder='Full name or Company name' type='text'
                                    value={fullNameOrCompanyName} onChange={(event) => this.setState({ fullNameOrCompanyName: event.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label>{selectedOption === 'KhachHang' ? 'Citizen ID' : 'Tax Code'}</label>
                                <input className={objCheckInput.isValidCitizenIdOrTaxCode ? 'form-control' : 'form-control is-invalid'} placeholder='Citizen ID or Tax Code' type='text'
                                    value={citizenIdOrTaxCode} onChange={(event) => this.setState({ citizenIdOrTaxCode: event.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label>Password:</label>
                                <input className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' type='password'
                                    value={password} onChange={(event) => this.setState({ password: event.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label>Retype password:</label>
                                <input className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Retype password' type='password'
                                    value={confirmPassword} onChange={(event) => this.setState({ confirmPassword: event.target.value })} />
                            </div>
                            {selectedOption === 'KhachHang' &&
                                <div className='row'>
                                    <div className='anh-mat-truoc col-6'>
                                        <label>Chọn ảnh mặt trước</label>
                                        <div className='preview-img-container'>
                                            <input id='previewImage' type='file' hidden onChange={(event) => this.handleOnChangeImage(event)} />
                                            <label className='label-upload' htmlFor='previewImage'>Tải ảnh <i className='fas fa-upload'></i> </label>
                                            <div onClick={() => this.openPreviewImage()} className='preview-image'
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='anh-mat-sau col-6'>
                                        <label>Chọn ảnh mặt sau</label>
                                        <div className='preview-img-container'>
                                            <input id='previewImgURL1' type='file' hidden onChange={(event) => this.handleOnChangeImage1(event)} />
                                            <label className='label-upload' htmlFor='previewImgURL1'>Tải ảnh <i className='fas fa-upload'></i> </label>
                                            <div onClick={() => this.openPreviewImage1()} className='preview-image'
                                                style={{ backgroundImage: `url(${this.state.previewImgURL1})` }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <button style={{ marginBottom: '25px' }} className='btn btn-primary' onClick={this.handleRegister}>Register</button>
                            <Link className='text-center' to='/login'>Already have an account ?</Link>
                            <hr />
                        </div>
                    </div>
                </div>
                {this.state.isOpen &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        className={'custom-lightbox'}
                    />
                }
                {this.state.isOpen1 &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL1}
                        onCloseRequest={() => this.setState({ isOpen1: false })}
                        className={'custom-lightbox'}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

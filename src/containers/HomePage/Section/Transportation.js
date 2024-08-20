import React, { Component } from 'react';
import { connect } from "react-redux";
import './Transportation.scss';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import image from '../../../assets/images/phuong-tien-van-chuyen.jpeg'
class Transportation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <>
                <div className='transportation-container'>
                    <div className='content-right'>
                        <img src={image}></img>
                    </div>
                    <div className='content-left'>
                        <div className='content-left-up'>
                            <h2>Phương tiện vận chuyển</h2>
                            <h3>Phù hợp cho cả doanh nghiệp và cá nhân.</h3> <hr />
                            <p>Khám phá các lựa chọn dịch vụ vận chuyển và logistics của Smart Logi Global Forwarding..</p>
                        </div>
                        <div className='content-left-down'>
                            <h4>Dịch vụ vận chuyển đường bộ hiện có</h4>
                            <div className='shipping-service'>
                                <span><i style={{ marginRight: '8px' }} class="fas fa-truck"></i> Xe tải</span>
                                <span><i style={{ marginRight: '8px' }} class="fas fa-truck"></i> Xe container</span>
                            </div>
                        </div>
                    </div>

                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transportation);

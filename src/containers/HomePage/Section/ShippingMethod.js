import React, { Component } from 'react';
import { connect } from "react-redux";
import './ShippingMethod.scss';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import image from '../../../assets/images/delivery-method.jpg'
class ShippingMethod extends Component {
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
                <div className='shipping-method-container'>
                    <div className='content-left'>
                        <div className='content-left-up'>
                            <h2>Phương thức vận chuyển</h2>
                            <h3>Dành cho mọi đơn vị vận chuyển</h3> <hr />
                            <p>Tìm hiểu về Smart Logi – Công ty hàng đầu chiếm thế thượng phong trong lĩnh vực chuyển phát nhanh quốc tế.</p>
                        </div>
                        <div className='content-left-down'>
                            <h4>Các dịch vụ hiện có</h4>
                            <div className='shipping-service'>
                                <span><i style={{ marginRight: '8px' }} class="fas fa-fire"></i> Hỏa tốc</span>
                                <span><i style={{ marginRight: '8px' }} class="fas fa-truck"></i> Chuyển phát nhanh</span>
                                <span><i style={{ marginRight: '8px' }} class="fas fa-dollar-sign"></i>  Tiết kiệm</span>
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <img src={image}></img>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethod);

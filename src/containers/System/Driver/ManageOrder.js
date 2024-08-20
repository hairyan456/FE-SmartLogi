import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getOrderOfDriver, confirmDriverOrder, getDriverByEmail } from '../../../services/userService';

class ManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOrders: [],
            currentDriver: {}
        }
    }

    async componentDidMount() {
        await this.getOrder();
        await this.getCurrentDriver();
    }

    getCurrentDriver = async () => {
        let res = await getDriverByEmail(this.props.userInfo.email);
        if (res) {
            if (res.EC === 0) {
                this.setState({
                    currentDriver: res.DT
                });
            }
            else {
                toast.error(res.EM);
            }
        }
        else console.log(res);
    }

    getOrder = async () => {
        let res = await getOrderOfDriver(this.props.userInfo.fullName);
        if (res) {
            if (res.EC === 0) {
                this.setState({ listOrders: res.DT });
            }
            else toast.error(res.EM);
        }
        else console.log(res);
    }


    componentDidUpdate(prevProps, prevState) {

    }

    handleConfirm = async () => {
        let res = await confirmDriverOrder(this.props.userInfo.email);
        if (res) {
            if (res.EC === 0) {
                await this.getCurrentDriver();
                await this.getOrder();
                toast.success('Xác nhận đơn hàng thành công')
            }
            else
                toast.error(res.EM);
        }
        else console.log(res);

    }

    render() {
        console.log(this.state.listOrders)
        return (
            <>
                <div className='manage-driver-order-container'>
                    <div className='title'>Quản lí đơn hàng của tài xế</div>
                    <div className='users-table mt-3 mx-2'>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th scope='col'>Mã đơn hàng</th>
                                    <th scope='col'>Nơi gửi</th>
                                    <th scope='col'>Nơi nhận</th>
                                    <th scope='col'>Loại hàng</th>
                                    <th scope='col'>Ngày giao dự kiến</th>
                                    <th scope='col'>Tổng giá tiền</th>
                                    <th scope='col'>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.listOrders && this.state.listOrders.length > 0 ?
                                    <>
                                        {this.state.listOrders.map((order, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.provinceSender}</td>
                                                    <td>{order.provinceReceiver}</td>
                                                    <td>{order.goodsType}</td>
                                                    <td>{order.ngayGiaoDuKien}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>
                                                        {this.state.currentDriver && this.state.currentDriver.isConfirm === 'true' ? ''
                                                            :
                                                            <button onClick={() => this.handleConfirm()} style={{ marginRight: '15px' }} title='Edit' className='btn btn-warning' >
                                                                Xác nhận
                                                            </button>
                                                        }

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr style={{ color: 'red', fontWeight: '600' }}><td>Not found any order</td></tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import _ from 'lodash';
import './ManageOrder.scss';
import { getAllOrders } from '../../../services/userService';
import { toast } from 'react-toastify';
import AllocateDriver from './AllocateDriver';

class ManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOrders: [],
            isShowAllocateModal: false,
            selectedOrderID: ''
        }
    }

    async componentDidMount() {
        await this.fetchAllOrders();
    }

    fetchAllOrders = async () => {
        let res = await getAllOrders();
        if (res) {
            if (res.EC === 0) {
                this.setState({
                    listOrders: res.DT
                });
            }
            else
                toast.error(res.EM);
        }
        else
            console.log(res);
    }

    componentDidUpdate(prevProps, prevState) {

    }

    toggleModal = () => {
        this.setState({
            isShowAllocateModal: !this.state.isShowAllocateModal,
            selectedOrderID: ''
        });
    }

    handleShowAllocate = (order) => {
        this.setState({
            isShowAllocateModal: true,
            selectedOrderID: order.id
        })
    }

    render() { // component luôn Render lần đầu trước khi vào DidMount() và DidUpdate()
        return (
            <>
                <AllocateDriver isShow={this.state.isShowAllocateModal} toggleFromParrent={this.toggleModal}
                    selectedOrderID={this.state.selectedOrderID} fetchAllOrders={this.fetchAllOrders}
                />

                <div className='manage-order-container'>
                    <div className='title'>Quản lí đơn hàng</div>
                    <div className='users-table mt-3 mx-2'>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th scope='col'>STT</th>
                                    <th scope='col'>Mã đơn hàng</th>
                                    <th scope='col'>Nơi gửi</th>
                                    <th scope='col'>Nơi nhận</th>
                                    <th scope='col'>Loại hàng</th>
                                    <th scope='col'>Ngày giao dự kiến</th>
                                    <th scope='col'>Tổng giá tiền</th>
                                    <th scope='col'>Tài xế</th>
                                    <th scope='col'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listOrders && this.state.listOrders.length > 0 ?
                                    <>
                                        {this.state.listOrders.map((order, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.provinceSender}</td>
                                                    <td>{order.provinceReceiver}</td>
                                                    <td>{order.goodsType}</td>
                                                    <td>{order.ngayGiaoDuKien}</td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>{order.driverName ? order.driverName : 'Chưa có'}</td>
                                                    <td>
                                                        <button onClick={() => this.handleShowAllocate(order)} style={{ marginRight: '15px' }} title='Edit' className='btn btn-warning' ><i className='fas fa-pencil-alt'></i></button>
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
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);

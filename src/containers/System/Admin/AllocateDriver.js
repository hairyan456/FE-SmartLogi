import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { getAllDrivers, updateDriverForOrder, updateOrderForDriver } from '../../../services/userService'

class AllocateDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDrivers: [],
            selectedDriver: ''
        }
    }

    async componentDidMount() {
        let res = await getAllDrivers();
        if (res) {
            if (res.EC === 0) {
                this.setState({ listDrivers: res.DT });
            }
            else toast.error(res.EM);
        }
        else console.log(res);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.listDrivers !== this.state.listDrivers) {
            this.setState({ selectedDriver: this.state.listDrivers[0].fullName })
        }
    }

    handleOnchangeDriver = (event) => {
        this.setState({ selectedDriver: event.target.value });
    }

    handleConfirm = async () => {
        let data = {
            selectedOrderID: this.props.selectedOrderID,
            selectedDriver: this.state.selectedDriver
        }
        // Update driver cho Order
        let res1 = await updateDriverForOrder(data);
        if (res1) {
            if (res1.EC !== 0) {
                toast.error(res1.EM);
                return;
            }
        }
        else {
            console.log(res1);
            return;
        }
        // Update Order cho Driver
        let res2 = await updateOrderForDriver(data);
        if (res2) {
            if (res2.EC !== 0) {
                toast.error(res2.EM);
                return;
            }
        }
        else {
            console.log(res2);
            return;
        }
        await this.props.fetchAllOrders();
        toast.success('Phân bổ tài xế thành công')
        this.setState({ selectedDriver: '' })
        this.props.toggleFromParrent();
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.isShow} toggle={this.props.toggleFromParrent} className={'modal-user-container'}
                    size="md"
                >
                    <ModalHeader toggle={this.props.toggleFromParrent}>Phân bổ tài xế</ModalHeader>
                    <ModalBody>
                        <span style={{ fontSize: '18px' }}>Chọn tài xế bạn muốn phân bổ</span> <br />
                        <select onChange={(event) => this.handleOnchangeDriver(event)} style={{ width: '50%' }} className='form-control'>
                            {this.state.listDrivers && this.state.listDrivers.length > 0 &&
                                this.state.listDrivers.map((item, index) => {
                                    return (
                                        <option key={`province-${index}`} value={item.fullName} >{item.fullName}</option>
                                    )
                                })
                            }
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.handleConfirm()} color="warning" className='px-3' > Xác nhận </Button>
                        <Button color="danger" className='px-3' onClick={this.props.toggleFromParrent}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        EC: state.admin.EC,
        EM: state.admin.EM,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllocateDriver);



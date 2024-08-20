import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import './ModalVoucher.scss';
import binhThuong10 from '../../../../assets/images/Voucher/10-binhthuong.png'
import binhThuong15 from '../../../../assets/images/Voucher/15-binhthuong.png'
import binhThuong20 from '../../../../assets/images/Voucher/20-binhthuong.png'
import binhThuong25 from '../../../../assets/images/Voucher/25-binhthuong.png'

import caoDiem7 from '../../../../assets/images/Voucher/7-caodiem.png'
import caoDiem10 from '../../../../assets/images/Voucher/10-caodiem.png'
import caoDiem15 from '../../../../assets/images/Voucher/15-caodiem.png'
import caoDiem20 from '../../../../assets/images/Voucher/20-caodiem.png'


class ModalVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    handleDeleteUser = async () => {

    }

    render() {
        return (
            <>
                <Modal isOpen={this.props.isShow} toggle={this.props.toggleFromParrent} className={'modal-voucher-container'}
                    size="lg"
                >
                    <ModalHeader style={{ backgroundColor: '#f5c840' }} toggle={this.props.toggleFromParrent}></ModalHeader>
                    <ModalBody>
                        <span >Danh sách mã ưu đãi <i class="fas fa-gift"></i></span>
                        <div className='business-voucher'>
                            <div className='title'><h3>Đối với doanh nghiệp</h3></div>
                            <div style={{ color: 'black', marginLeft: '250px', marginBottom: '50px', fontSize: '19px' }} >
                                Duy nhất mã giảm 65% cho lần đầu: <p style={{ color: 'red', marginLeft: '60px' }}>SL65-fUQ81sT04QL</p>
                            </div>
                            <div className='voucher'>
                                <div className='left'>
                                    <div className='title-left'>Mùa bình thường</div>
                                    <div className='voucher-left'>
                                        <div>
                                            <img src={binhThuong10} />
                                            <h4>SL10-bTaB3xY9rP</h4>
                                        </div>
                                        <div>
                                            <img src={binhThuong15} />
                                            <h4>SL15-bTK7fG2hZq</h4>
                                        </div>
                                        <div>
                                            <img src={binhThuong20} />
                                            <h4>SL20-bTL8mP1sVw</h4>
                                        </div>
                                        <div>
                                            <img src={binhThuong25} />
                                            <h4>SL25-bTjT5zX4kN</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='title-left'>Mùa cao điểm</div>
                                    <div className='voucher-left'>
                                        <div>
                                            <img src={caoDiem7} />
                                            <h4>SL7-cDQ2rM6bHc</h4>
                                        </div>
                                        <div>
                                            <img src={caoDiem10} />
                                            <h4>SL10-cDwX7yD3pJ</h4>
                                        </div>
                                        <div>
                                            <img src={caoDiem15} />
                                            <h4>SL15-cDnR8vB4sZ</h4>
                                        </div>
                                        <div>
                                            <img src={caoDiem20} />
                                            <h4>SL20-cDgT9kF2mL</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter> </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalVoucher);



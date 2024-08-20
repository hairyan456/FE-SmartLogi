import React, { Component, createRef } from 'react';
import { connect } from "react-redux";
import './Order.scss';
import { LANGUAGES } from '../../../utils/constant';
import SubFooter from '../../HomePage/Footer/SubFooter';
import HomeFooter from '../../HomePage/Footer/HomeFooter';
import HeaderHomePage from '../../HomePage/Header/HeaderHomePage';
import { getAllcodes } from '../../../services/userService';
import { toast } from 'react-toastify';
import goodsImage from '../../../assets/images/goods.png'
import DatePicker from '../../../components/Input/DatePicker'; //chỉ trả về ngày-tháng-năm, ko có giờ:phút:giây
import _ from 'lodash';
import moment from 'moment'
import localization from 'moment/locale/vi';  // mặc định moment format date dạng En, thêm dòng này để format Vi global
import NumberFormat from 'react-number-format';
import { FaTruck } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { checkVoucherExisted, postConfirmOrder } from '../../../services/userService'
import LoadingOverLay from 'react-loading-overlay';
import { withRouter } from 'react-router-dom';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProvinces: [],
            listVehicles: [],
            listDelivery: [
                { name: 'Giao hàng tiêu chuẩn', key: 'standard' },
                { name: 'Giao hàng nhanh', key: 'express' },
                { name: 'Giao hàng hỏa tốc', key: 'urgent' },
            ],
            isShowDescriptionModal: false, isShowOrderNow: false,
            isIndividualOrBusiness: 'Individual',
            loaiHangHoa: 'DeVo',
            tongTienGoc: '',

            selectedDate: new Date(),
            ngayGiaoDuKien: '',
            selectedProvinceSender: '',
            selectedProvinceReceiver: '',
            addressSender: '',
            addressReceiver: '',
            totalWeight: '',
            width: '', height: '', length: '',
            selectedVehicle: '',
            selectedGoodsType: '',
            distance: '',
            selectedDelivery: 'standard',
            voucher: '',
            totalPrice: '',

            isLoading: false,
        };
        this.descriptionModalRef = createRef();
        this.orderNow = createRef();
    }

    async componentDidMount() {
        let res = await getAllcodes('PROVINCE');
        if (res) {
            if (res.EC === 0) {
                this.setState({ listProvinces: res.DT && res.DT.length > 0 ? res.DT : [] });
            } else {
                toast.error(res.EM);
            }
        } else {
            console.log(res);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.listProvinces !== this.state.listProvinces) {
            this.setState({
                selectedProvinceSender: this.state.listProvinces[0].keyMap,
                selectedProvinceReceiver: this.state.listProvinces[0].keyMap,
            });
        }

        if (prevState.listVehicles !== this.state.listVehicles) {
            this.setState({
                selectedVehicle: this.state.listVehicles[0].price,
            })
        }

        if (prevState.selectedDate !== this.state.selectedDate) {
            if (this.state.distance === '380') {
                this.setState({
                    ngayGiaoDuKien: this.capitalizeFirstLetter(moment(new Date(this.state.selectedDate)).add(1, 'days').format('dddd - DD/MM'))
                })
            }
            else if (this.state.distance === '1660')
                this.setState({
                    ngayGiaoDuKien: this.capitalizeFirstLetter(moment(new Date(this.state.selectedDate)).add(3, 'days').format('dddd - DD/MM'))
                })

        }

        if (prevState.selectedProvinceSender !== this.state.selectedProvinceSender) {
            if (this.state.selectedProvinceSender === 'PRO1') {
                this.setState({ addressSender: 'Khu công nghiệp Hà Nội – Đài Tư - 386 đường Nguyễn Văn Linh, phường Sài Đồng, quận Long Biên, thành phố Hà Nội' })
            }
            else if (this.state.selectedProvinceSender === 'PRO4') {
                this.setState({ addressSender: 'Khu Công Nghiệp Trà Nóc - 4P27+47R, 42A3, Đường Lê Hồng Phong, Quận Bình Thủy, Lê Hồng Phong, Trà Nóc, Bình Thủy, Cần Thơ' })
            }
            else if (this.state.selectedProvinceSender === 'PRO2')
                this.setState({ addressSender: 'Phà Cát Lái - 1295B Nguyễn Thị Định, phường Cát Lái, thành phố Thủ Đức, Thành phố Hồ Chí Minh' })
        }

        if (prevState.selectedProvinceReceiver !== this.state.selectedProvinceReceiver) {
            if (this.state.selectedProvinceReceiver === 'PRO1') {
                this.setState({
                    addressReceiver: 'Khu công nghiệp Hà Nội – Đài Tư - 386 đường Nguyễn Văn Linh, phường Sài Đồng, quận Long Biên, thành phố Hà Nội',
                    ngayGiaoDuKien: this.capitalizeFirstLetter(moment(new Date()).add(3, 'days').format('dddd - DD/MM'))
                })
            }
            else if (this.state.selectedProvinceReceiver === 'PRO4') {
                this.setState({
                    addressReceiver: 'Khu Công Nghiệp Trà Nóc - 4P27+47R, 42A3, Đường Lê Hồng Phong, Quận Bình Thủy, Lê Hồng Phong, Trà Nóc, Bình Thủy, Cần Thơ',
                    ngayGiaoDuKien: this.capitalizeFirstLetter(moment(new Date()).add(1, 'days').format('dddd - DD/MM'))
                })
            }
            else if (this.state.selectedProvinceReceiver === 'PRO2')
                this.setState({
                    addressReceiver: 'Phà Cát Lái - 1295B Nguyễn Thị Định, phường Cát Lái, thành phố Thủ Đức, Thành phố Hồ Chí Minh'
                })

        }

        if ((prevState.selectedVehicle !== this.state.selectedVehicle) || (prevState.selectedDelivery !== this.state.selectedDelivery)) {
            let tongTien1 = +this.state.selectedVehicle * +this.state.distance;
            let tongTien2;
            if (this.state.selectedDelivery === 'standard') {
                tongTien2 = tongTien1;
            }
            else if (this.state.selectedDelivery === 'express') {
                tongTien2 = +tongTien1 * 1.2;
            }
            else if (this.state.selectedDelivery === 'urgent') {
                tongTien2 = +tongTien1 * 1.5;
            }
            let tongTien3;
            if (this.state.selectedGoodsType === 'meat') {
                tongTien3 = +tongTien2 * 1.3;
            }
            else if (this.state.selectedGoodsType === 'fish') {
                tongTien3 = +tongTien2 * 1.4;
            }
            else if (this.state.selectedGoodsType === 'vegetable') {
                tongTien3 = +tongTien2 * 1.1;
            }
            this.setState({
                totalPrice: Math.round(tongTien3),
                tongTienGoc: Math.round(tongTien3)
            })
        }
    }

    handleChooseIndividualOrBusiness = (type) => {
        if (type === 'Individual')
            this.setState({ isIndividualOrBusiness: 'Individual' });
        else
            this.setState({ isIndividualOrBusiness: 'Business' });
    }

    handleChooseGoodsType = (type) => {
        if (type === 'DeVo')
            this.setState({ loaiHangHoa: 'DeVo' });
        else if (type === 'HangCongKenh')
            this.setState({ loaiHangHoa: 'HangCongKenh' })
        else
            this.setState({ loaiHangHoa: 'HangBaoQuanCanThan' })
    }

    handleOnChangeProvinceSender = async (event) => {
        this.setState({ selectedProvinceSender: event.target.value });
    }

    handleOnChangeProvinceReceiver = async (event) => {
        this.setState({ selectedProvinceReceiver: event.target.value });
    }

    handleShowDescriptionModal = () => {
        // distance:
        if (this.state.selectedProvinceSender === 'PRO2' && this.state.selectedProvinceReceiver === 'PRO1')
            this.setState({ distance: '1660' });
        else if (this.state.selectedProvinceSender === 'PRO2' && this.state.selectedProvinceReceiver === 'PRO4')
            this.setState({ distance: '380' });
        this.setState({ isShowDescriptionModal: true }, () => {
            if (this.descriptionModalRef.current) {
                this.descriptionModalRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    handleShowOrderNow = () => {

        let { totalWeight } = this.state;
        if (totalWeight >= 1 && totalWeight <= 1200) {
            if (['meat', 'fish'].includes(this.state.selectedGoodsType))
                this.setState({ listVehicles: [{ name: 'Xe tải nhỏ lạnh ', price: '39804' },] })
            else
                this.setState({ listVehicles: [{ name: 'Xe tải nhỏ (<1.25 tấn)', price: '37458' }, { name: 'Xe tải nhỏ lạnh ', price: '39804' },] })
        }
        else if (totalWeight > 1200 && totalWeight <= 10000) {
            if (['meat', 'fish'].includes(this.state.selectedGoodsType))
                this.setState({ listVehicles: [{ name: 'Xe tải vừa lạnh', price: '46482' },] })
            else
                this.setState({ listVehicles: [{ name: 'Xe tải vừa (1.25 - dưới 10 tấn)', price: '43523' }, { name: 'Xe tải vừa lạnh', price: '46482' },] })

        }
        else if (totalWeight > 10000 && totalWeight <= 25000) {
            this.setState({ listVehicles: [{ name: 'Container 20ft', price: '49825' },] });
        }
        else if (totalWeight > 25000) {
            this.setState({ listVehicles: [{ name: 'Container 40ft', price: '57705' },] });
        }
        this.setState({ isShowOrderNow: true }, () => {
            if (this.orderNow.current) {
                this.orderNow.current.scrollIntoView({ behavior: 'smooth' });
            }
        });

    }

    handleOnchangeDatePicker = (currentDate) => {
        this.setState({
            selectedDate: currentDate[0],
        });
    }

    handleOnchangeVehicle = (event) => {
        this.setState({ selectedVehicle: event.target.value });

    }

    handleOnChangeDelivery = (event) => {
        this.setState({ selectedDelivery: event.target.value });

    }

    handleSelectedGoodsType = (type) => {
        this.setState({
            selectedGoodsType: type
        })
    }


    capitalizeFirstLetter = (input) => { //viết hoa chữ cái đầu của thứ
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    extractString = (input) => {
        const startIndex = input.indexOf('SL') + 2;
        const endIndex = input.indexOf('-', startIndex);
        return input.substring(startIndex, endIndex);
    }


    handleApplyVoucher = async () => {
        let res = await checkVoucherExisted(this.state.voucher);
        if (res) {
            if (res.EC === 0 && res.EM === 'existed') {
                let discount = +(this.extractString(this.state.voucher)) / 100;
                let currentTotalPrice = this.state.tongTienGoc;
                let totalPriceNew = +currentTotalPrice - (+currentTotalPrice * +discount);
                this.setState({
                    totalPrice: Math.round(+totalPriceNew)
                });
                toast.success('Apply voucher success!');
                this.setState({ voucher: '' });
            }
            else if (res.EC === 0 && res.EM === 'not existed') {
                toast.error('Voucher is not existed!');
                this.setState({ voucher: '' });
            }
        }
        else {
            console.log(res);
        }
    }

    generateOrderCode() {
        const prefix = 'SL-';
        const length = 15; // Độ dài của phần mã ngẫu nhiên
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return prefix + result;
    }

    handleConfirmOrder = async () => {

        this.setState({ isLoading: true });
        const section = document.querySelector('#home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        let data = {
            email: this.props.userInfo.email,

            // ma don hang:
            orderId: this.generateOrderCode(),
            // FROM - TO
            provinceSender: 'Thành phố Hồ Chí Minh',
            addressSender: this.state.addressSender,
            provinceReceiver: this.state.selectedProvinceReceiver === 'PRO1' ? 'Hà Nội' : 'Thành phố Cần Thơ',
            addressReceiver: this.state.addressReceiver,

            // GOODS detail:
            totalWeight: this.state.totalWeight,
            length: this.state.length,
            width: this.state.width,
            height: this.state.height,
            goodsType: this.state.selectedGoodsType,    // fish - meat - vegetable

            //Delivery:
            selectedDate: this.capitalizeFirstLetter(moment(new Date(this.state.selectedDate)).format('dddd - DD/MM/yyyy')),
            ngayGiaoDuKien: this.state.ngayGiaoDuKien + '/2024',
            selectedVehicle: this.state.selectedVehicle, // Gia tien => loai xe
            selectedDelivery: this.state.selectedDelivery,  // standard - express - urgent,
            distance: this.state.distance,
            totalPrice: this.state.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        }
        let res = await postConfirmOrder(data);
        if (res) {
            this.setState({ isLoading: false });
            if (res.EC === 0) {
                this.props.history.push('/home');
                toast.success('Confirm order success');

            }
            else {
                toast.error(res.EM);
            }
        }
        else {
            this.setState({ isLoading: false });
            console.log(res)
        }
    }

    render() {
        let { isIndividualOrBusiness, listProvinces, isShowDescriptionModal, loaiHangHoa, isShowOrderNow, selectedDate,
            listVehicles, ngayGiaoDuKien, listDelivery, isLoading } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <LoadingOverLay active={isLoading} spinner text='Loading...'>
                    <HeaderHomePage isShowBanner={false} />
                    <div className='order-container'>
                        <div id='home' className='content-title'>
                            <h2 className='title'>Gửi hàng ngay</h2>
                            <div className='description'>
                                <p>Các kiện hàng và pallet, lớn và nhỏ, chúng tôi có thể cung cấp cho bạn các tùy chọn giao hàng ngay lập tức cho nhu cầu vận chuyển của bạn, cả trong nước và quốc tế. Điền thông tin chi tiết về lô hàng của bạn bên dưới và chúng tôi sẽ cung cấp các dịch vụ phù hợp với yêu cầu cụ thể của bạn. Chỉ cần chọn tùy chọn phù hợp với bạn nhất và tiếp tục đặt.</p>
                            </div>
                            <div className='steps'>
                                <div>
                                    <h1>1.</h1>
                                    <span>Nhập vào điểm đi và điểm đến</span>
                                </div>
                                <div>
                                    <h1>2.</h1>
                                    <span>Mô tả lô hàng của bạn</span>
                                </div>
                                <div>
                                    <h1>3.</h1>
                                    <span>Nhận giá giao hàng</span>
                                </div>
                                <div>
                                    <h1>4.</h1>
                                    <span>Tiến hành đặt hàng trực tuyến</span>
                                </div>
                            </div>
                        </div>
                        <div className='from-to'>
                            <h2>Tôi đang gửi hàng với tư cách là...</h2>
                            <div className='choose'>
                                <div onClick={() => this.handleChooseIndividualOrBusiness('Individual')}
                                    className={isIndividualOrBusiness === 'Individual' ? 'individual active' : 'individual'}>Cá nhân</div>
                                <div onClick={() => this.handleChooseIndividualOrBusiness('Business')}
                                    className={isIndividualOrBusiness === 'Business' ? 'business active' : 'business'}>Doanh nghiệp</div>
                            </div>
                            <div className='input-country'>
                                <div className='sender'>
                                    <h3>Từ</h3>
                                    <div className='up'>
                                        <div className='city'>
                                            <select onChange={(event) => this.handleOnChangeProvinceSender(event)} style={{ width: '50%', marginTop: '20px', }} className='form-control'>
                                                {listProvinces && listProvinces.length > 0 &&
                                                    listProvinces.map((item, index) => {
                                                        return (
                                                            <option key={`province-${index}`} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='address form-group'>
                                            <label>Nơi lấy hàng *</label>
                                            <input className='text form-control' readOnly value={this.state.addressSender ? this.state.addressSender : ''}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='receiver'>
                                    <h3>Đến</h3>
                                    <div className='down'>
                                        <div className='city'>
                                            <select onChange={(event) => this.handleOnChangeProvinceReceiver(event)} style={{ width: '50%', marginTop: '20px', }} className='form-control'>
                                                {listProvinces && listProvinces.length > 0 &&
                                                    listProvinces.map((item, index) => {
                                                        return (
                                                            <option key={`province-${index}`} value={item.keyMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='address form-group'>
                                            <label>Giao đến *</label>
                                            <input className='text form-control' readOnly value={this.state.addressReceiver ? this.state.addressReceiver : ''}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-description-shipment'>
                                    <button onClick={() => this.handleShowDescriptionModal()} className='btn btn-danger' >Mô tả lô hàng của bạn</button>
                                </div>
                            </div>
                        </div>
                        {isShowDescriptionModal && (
                            <div ref={this.descriptionModalRef} className='description-container'>
                                <h2>Lô hàng</h2>
                                <div className='description-modal'>
                                    <div className='abc'>
                                        <div className='weight'>
                                            <h3 style={{ fontSize: '19px' }}>Trọng lượng</h3>
                                            <input placeholder='Trọng lượng (kg)...' type='text' className='form-control' value={this.state.totalWeight}
                                                onChange={(event) => { this.setState({ totalWeight: event.target.value }) }}
                                            />
                                        </div>
                                        <div className='goods-img'> <img src={goodsImage}></img> </div>
                                        <div className='kich-thuoc'>
                                            <div>
                                                <h3 style={{ fontSize: '15px' }}>Kích thước</h3>
                                                <input value={this.state.length} onChange={(event) => { this.setState({ length: event.target.value }) }}
                                                    placeholder='Chiều dài (cm)...' type='text' className='form-control' />
                                            </div>
                                            <h4>X</h4>
                                            <div style={{ paddingTop: '23px' }}>
                                                <input value={this.state.width} onChange={(event) => { this.setState({ width: event.target.value }) }}
                                                    placeholder='Chiều rộng (cm)...' type='text' className='form-control' />
                                            </div>
                                            <h4>X</h4>
                                            <div style={{ paddingTop: '23px' }}>
                                                <input value={this.state.height} onChange={(event) => { this.setState({ height: event.target.value }) }}
                                                    placeholder='Chiều cao (cm)...' type='text' className='form-control' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='phan-loai-hang'>
                                        <div onClick={() => this.handleChooseGoodsType('DeVo')} className={loaiHangHoa === 'DeVo' ? 'active' : ''}>
                                            <h3>Hàng dễ vỡ</h3>
                                        </div>
                                        <div onClick={() => this.handleChooseGoodsType('HangCongKenh')} className={loaiHangHoa === 'HangCongKenh' ? 'active' : ''} >
                                            <h3>Hàng cồng kềnh</h3>
                                        </div>
                                        <DropdownButton onClick={() => this.handleChooseGoodsType('HangBaoQuanCanThan')}
                                            id="dropdown-basic-button" title="Hàng bảo quản cẩn thận"
                                            className={loaiHangHoa === 'HangBaoQuanCanThan' ? 'active' : ''}>
                                            <Dropdown.Item onClick={() => this.handleSelectedGoodsType('meat')} href="#">Thịt tươi sống</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleSelectedGoodsType('fish')} href="#">Cá tươi sống</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleSelectedGoodsType('vegetable')} href="#">Rau củ quả</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleSelectedGoodsType('other')} href="#">Khác
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                                <div className='total-weight'>
                                    <h3>Tổng trọng lượng lô hàng: {`${this.state.totalWeight} kg`}</h3>
                                </div>
                                <div className='confirm'>
                                    <div className='abc'>
                                        <button onClick={() => this.handleShowOrderNow()} className='btn btn-danger'>Gửi hàng ngay</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {
                            isShowOrderNow && (
                                <div ref={this.orderNow} className='order-now-container'>
                                    <div className='a'>
                                        <h3>Tùy chọn giao hàng của bạn</h3>
                                        <h4>Xem xét và Chọn một dịch vụ giao hàng để bắt đầu đặt lô hàng của bạn.</h4>
                                    </div>
                                    <div className='b'>
                                        <div className='b-left'>
                                            <label>Chọn ngày gửi hàng:</label> <br />
                                            <DatePicker
                                                onChange={this.handleOnchangeDatePicker}
                                                value={selectedDate}
                                                minDate={yesterday}
                                            />
                                        </div>
                                        <div className='b-right'>
                                            <label>Chọn loại xe:</label> <br />
                                            <select onChange={(event) => this.handleOnchangeVehicle(event)} style={{ width: '50%' }} className='form-control'>
                                                {listVehicles && listVehicles.length > 0 &&
                                                    listVehicles.map((item, index) => {
                                                        return (
                                                            <option key={`province-${index}`} value={item.price} >{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='b-center'>
                                            <label>Chọn phương thức giao hàng:</label> <br />
                                            <select onChange={(event) => this.handleOnChangeDelivery(event)} style={{ width: '60%' }} className='form-control'>
                                                {listDelivery && listDelivery.length > 0 &&
                                                    listDelivery.map((item, index) => {
                                                        return (
                                                            <option key={`province-${index}`} value={item.key} >{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='c'>
                                        <div className='c-left'>
                                            <div className='logo'>
                                                <FaTruck size={'85px'}
                                                    color={'#333'} />
                                            </div>
                                            <div className='du-kien-giao-hang'>
                                                <span>Dự kiến giao hàng  (quãng đường {this.state.distance} km)</span>
                                                <div className='thoi-gian-giao'>
                                                    <h4>{ngayGiaoDuKien} </h4>
                                                    <span>Chậm nhất cuối ngày</span>
                                                </div>
                                                <p>* Đặt gửi hàng trước 8:00 AM để hàng được lấy ngay trong ngày</p>
                                            </div>
                                        </div>
                                        <div className='c-right'>
                                            <span>Đã bao gồm thuế GTGT *</span>
                                            <div className='gia-tien'>
                                                <h3>{this.state.totalPrice ? <NumberFormat className='currency' value={this.state.totalPrice} displayType={'text'}
                                                    thousandSeparator={true} suffix={'VND'} /> : ''}</h3>
                                            </div>
                                            <button className='xac-nhan-dich-vu' onClick={() => this.handleConfirmOrder()} >Xác nhận đặt dịch vụ</button>
                                            <div className='voucher-input'>
                                                <input className='form-control' type='text' placeholder='Nhập voucher tại đây...'
                                                    value={this.state.voucher} onChange={(event) => { this.setState({ voucher: event.target.value }) }}
                                                />
                                                <button onClick={() => this.handleApplyVoucher()} className='btn btn-warning'>Áp dụng</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d'>
                                        <p style={{ marginTop: '30px' }}>
                                            * Xin lưu ý rằng đây không phải là đề nghị ký kết hợp đồng vận chuyển mà chỉ là thông tin tham khảo về giá không có tính chất ràng buộc. Hợp đồng vận chuyển có thể được ký kết riêng thông qua công cụ gửi hàng trên cơ sở các điều khoản và điều kiện tương ứng như được xác định trong công cụ gửi hàng. Giá cước và thời gian vận chuyển trong báo giá chỉ mang tính gợi ý và có thể khác với giá cước và thời gian vận chuyển thực tế tùy theo lô hàng cần gửi cụ thể và những thông tin bạn cung cấp trong công cụ gửi hàng. Đặc biệt, cước phí có thể chưa bao gồm thuế, thuế quan, phí hải quan, phí lưu kho hoặc bất kỳ khoản phí và phụ phí nào khác.
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div >
                    <SubFooter />
                    <HomeFooter />
                </LoadingOverLay>

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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));

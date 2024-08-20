import React, { Component } from 'react';
import { connect } from "react-redux";
import './Introduction.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import HeaderHomePage from '../HeaderHomePage';
import HomeFooter from '../../Footer/HomeFooter';
import SubFooter from '../../Footer/SubFooter';
import picture from '../../../../assets/images/download.jpg'
import collab from '../../../../assets/images/collab.png'
import { Link, withRouter } from 'react-router-dom';

class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <>
                <HeaderHomePage isShowBanner={false} />
                <div className='introduction-container'>
                    <div className='content1'>
                        <h3>Giới thiệu về Smart Logi</h3>
                        <h4>Smart Logi trong kỷ nguyên kết nối</h4>
                        <hr />
                        <p>Smart Logistic là một thương hiệu tiên phong trong lĩnh vực cung cấp giải pháp logistics thông minh và hiệu quả. Với sứ mệnh tối ưu hóa quá trình vận chuyển và quản lý chuỗi cung ứng, Smart Logistic không ngừng áp dụng công nghệ tiên tiến và những phương pháp quản lý hiện đại. Chúng tôi cam kết mang đến cho khách hàng dịch vụ vận tải đáng tin cậy, nhanh chóng và chi phí hợp lý, đồng thời đảm bảo tính bền vững và phát triển bền vững cho các đối tác và cộng đồng.</p>
                    </div>
                    <div className='content2'>
                        <div>Nhiều cơ hội việc làm cho nhân viên</div>
                        <div>63 tỉnh thành được phục vụ</div>
                        <div>Đoạt doanh thu đáng kể ngay từ đầu ra mắt</div>
                    </div>
                    <div className='video'>
                        <iframe src="https://www.youtube.com/embed/Rrp-FNYHC4s"
                            title="Ngành Logistics và quản lý chuỗi cung ứng LÀ GÌ? Tìm hiểu Logistics"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className='content3'>
                        <div className='content-left'>
                            <h2>Smart Logi Group</h2>
                            <hr />
                            <p>
                                Danh mục dịch vụ quốc tế của chúng tôi bao gồm các hoạt động giao thư và bưu kiện, chuyển phát
                                nhanh, vận chuyển hàng hóa, quản lý chuỗi cung ứng và các giải pháp logistics thương mại điện
                                tử.
                            </p>
                            <button className='btn btn-danger'>Tìm hiểu thêm <i class="fas fa-info-circle"></i></button>
                        </div>
                        <div className='content-right'>
                            <img src={picture} />
                        </div>
                    </div>
                    <div className='content4'>
                        <div className='up'>
                            <h3>Kết nối và tận tâm</h3>
                            <hr />
                            <p>
                                Smart Logi không đơn thuần là một nhà cung cấp dịch vụ logistics, mà còn là một đối tác đáng tin cậy trong việc kết nối các doanh nghiệp với nhau. Chúng tôi luôn nỗ lực xây dựng những mối quan hệ bền chặt và lâu dài với khách hàng, đối tác và các bên liên quan. Đội ngũ nhân viên của Smart Logistic làm việc với sự tận tâm và nhiệt huyết, sẵn sàng lắng nghe và đáp ứng nhu cầu của từng khách hàng. Chúng tôi tin rằng sự kết nối mạnh mẽ và lòng tận tâm sẽ tạo ra giá trị gia tăng, giúp các doanh nghiệp phát triển và đạt được thành công trong môi trường kinh doanh cạnh tranh ngày nay.
                            </p>
                        </div>
                        <div className='down'>
                            <img src={collab} />
                            <div>
                                <Link to='#'>Hợp tác thương hiệu </Link>
                                <span>Smart Logi là chuyên gia trong Tổ chức các sự kiện toàn câu trên thế giới.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <SubFooter /> <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);

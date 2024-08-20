import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHomePage from './Header/HeaderHomePage';
import BannerSlider from './BannerSlider/BannerSlider';
import ShippingMethod from '../HomePage/Section/ShippingMethod';
import Transportation from './Section/Transportation';
import SubFooter from './Footer/SubFooter';
import HomeFooter from './Footer/HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {
    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };

        return (
            <>
                <HeaderHomePage isShowBanner={true} />
                <BannerSlider />
                <ShippingMethod />
                <Transportation />
                <SubFooter />
                <HomeFooter />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

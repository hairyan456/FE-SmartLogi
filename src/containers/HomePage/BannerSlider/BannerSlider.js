import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './BannerSlider.scss'

class BannerSlider extends Component {
    render() {
        const images = [
            "https://bcp.cdnchinhphu.vn/334894974524682240/2022/1/6/logistics-vietnamzrys-1641469086736-1641469087280847795776.jpg",
            "https://www.shutterstock.com/image-vector/yellow-trucks-loaded-free-shipping-600nw-2470092651.jpg",
            "https://www.ismartrecruit.com/upload/blog/main_image/5_Effective_Time_Management_Strategies_for_Recruiters1.webp",
            "https://static.vecteezy.com/system/resources/previews/004/964/526/original/safe-delivery-concept-delivery-man-pushing-a-hand-truck-with-boxes-illustration-in-flat-style-free-vector.jpg"
        ];

        return (
            <div className='banner-slide-container'>
                <Fade duration={1000}
                    onChange={function noRefCheck() { }}
                    onStartChange={function noRefCheck() { }}>
                    <div className="each-slide">
                        <img src={images[0]} />
                    </div>
                    <div className="each-slide">
                        <img src={images[1]} />
                    </div>
                    <div className="each-slide">
                        <img src={images[2]} />
                    </div>
                    <div className="each-slide">
                        <img src={images[3]} />
                    </div>
                </Fade>
            </div >
        );
    }
};

export default BannerSlider;
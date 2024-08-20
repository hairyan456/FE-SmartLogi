import React, { Component } from 'react';
import { connect } from "react-redux";
import './Incentives.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import HeaderHomePage from '../HeaderHomePage';
import HomeFooter from '../../Footer/HomeFooter';
import SubFooter from '../../Footer/SubFooter';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './IncentivesSlider.scss'
import img0 from '../../../../assets/images/Incentives/chinh-sach-uu-dai-images-0.jpg'
import img1 from '../../../../assets/images/Incentives/chinh-sach-uu-dai-images-1.jpg'
import img2 from '../../../../assets/images/Incentives/chinh-sach-uu-dai-images-2.jpg'

class Incentives extends Component {
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
                <HeaderHomePage isShowBanner={false} />
                <div className='banner-slide-incentives-container'>
                    <Fade
                        duration={10000}
                        onChange={function noRefCheck() { }}
                        onStartChange={function noRefCheck() { }}>
                        <div className="each-slide">
                            <img src={img0} />
                        </div>
                        <div className="each-slide">
                            <img src={img1} />
                        </div>
                        <div className="each-slide">
                            <img src={img2} />
                        </div>
                    </Fade>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Incentives);

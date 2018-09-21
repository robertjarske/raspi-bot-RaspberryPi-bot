import React from 'react';
import Carousel from 'react-flex-carousel';
import './Landingpage.css';

const Landingpage = () => (
  <div className="content">
    <h1 className="landing-title">Where Robots Come to Life</h1>
    <div className="landing-background"></div>
    <div className="landing-container">
      <div className="landing-about">
        <h3>About</h3>
        <p>In this section there should be a very fancy about text but I don&apos;t have any time or
        imagination to write one so I just copy the first part over and over again.
        In this section there should be a very fancy about text but I don&apos;t have any time or
        imagination to write one so I just copy the first part over and over again.</p>
        <p>In this section there should be a very fancy about text but I don&apos;t have any time or
        imagination to write one so I just copy the first part over and over again.
        In this section there should be a very fancy about text but I don&apos;t have any time or
        imagination to write one so I just copy the first part over and over again.</p>
      </div>

       <div className="slider-container">
        <Carousel autoPlayInterval={4500} indicator={true} switcher={true}>
          <div className="slider-img1"></div>
          <div className="slider-img2"></div>
          <div className="slider-img3"></div>
        </Carousel>
      </div>
    </div>
  </div>
);

export default Landingpage;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {

  render() {

    const publicUrl = `${process.env.PUBLIC_URL}/`;
    const imagealt = 'image';

    return (
      <div className='banner-area' style={{ background: `url(${publicUrl}assets/img/banner/2.png)` }}>
        <div className='container'>
          <div className='banner-area-inner'>
            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <div className='banner-inner text-center'>
                  <h2>
                    Best Grade Cards in
                    {' '}
                    <br />
                    {' '}
                    <span>Pokemon, Digimon, Yu-gi-oh, and more...</span>
                  </h2>
                  <p>The best place to find and buy grade cards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;


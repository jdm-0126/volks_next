import React from 'react';
import { Container } from 'reactstrap';

import {Navbar} from './components/Navbar/Navbar';
import AboutUs from './components/AboutUs';
import Players from './components/Players';
import Products from './components/Products';

function MainPage() {
    return (
      <div className="App">
        {/* start nav */}
        <Navbar />
        <Container fluid className="p-0">
          <header className="masthead">
            <div className="container">
              <div className="masthead-heading text-uppercase">
                <h2>Welcome to VOLKSLIFT</h2>
              </div>
              <a
                className="btn btn-secondary btn-xl text-uppercase js-scroll-trigger"
                href="#about"
              >
                Tell Me More
              </a>
            </div>
          </header>
          <div className="d-flex justify-content-center">
              <AboutUs />
          </div>
          {/* <div className="d-flex justify-content-center">
              <Players />
          </div> */}
          <div className="d-flex justify-content-center">
              <Products />
          </div>
        </Container>
      </div>
    );
}
export default MainPage;
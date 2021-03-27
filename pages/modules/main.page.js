import React from 'react';
import { Container } from 'reactstrap';

import Navbar from './components/Navbar/Navbar';
import AboutUs from './components/AboutUs';
import Players from './components/Players';
import Products from './components/Products';
import Services from './components/Services';
import News from './components/News';
import Footer from './components/Footer/Footer';
import ContactUs from './components/Contactus';
import Portfolio from './components/Portfolio';

function MainPage() {
    return (
      <div className="App">
        {/* start nav */}
        <Navbar />
        <Container fluid className="p-0">
          <header className="masthead">
            <div className="container">
              <div className="masthead-heading text-white text-uppercase">
                <h2 className="text-info">Welcome to VOLKSLIFT</h2>
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
             
          <div className="d-flex justify-content-center">
              <Portfolio />
          </div>
          <News />
          <div className="d-flex justify-content-center">
              <Services />
          </div>
          <div className="d-flex justify-content-center">
              <ContactUs />
          </div>
          <Footer />
        </Container>
      </div>
    );
}
export default MainPage;
import React, { Component } from 'react';

import NavBar from './component/LandingPage';
import BackgroundStars from './component/styledButton/BackgroundStar';
import Footer from './component/Footer/Footer';

// import PaintCanvas from './component/PaintCanvas';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar />
        {/* <PaintCanvas /> */}
        {/* <BackgroundStars /> */}
        <Footer />
      </div>
    );
  }
}

export default App;

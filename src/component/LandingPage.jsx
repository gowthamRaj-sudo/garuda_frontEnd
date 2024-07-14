import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import './style.css';
import logo from '../assets/logo.jpeg';
import Footer from './Footer/Footer';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(to bottom, #0d0d2b, #000000);
    color: white;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0C0C27;
  }
  ::-webkit-scrollbar-thumb {
    background: #ff4081;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #e00070;
  }
`;

const Navbar = styled.div`
  position: fixed;
  top: 40px;
  left: 20px;
  right: 20px;
  padding: 10px 20px;
  margin: 0 60px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  transition: background 0.3s, color 0.1s, top 0.3s, left 0.3s, right 0.3s,
    padding 0.3s, margin 0.3s, box-shadow 0.3s;
  z-index: 1000;

  &.sticky {
    background: #0c0c27;
    color: #ff4081;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  margin: 0 15px;
  transition: color 0.3s;
`;

const Container = styled.div`
  height: 100vh;
  text-align: center;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  &:nth-child(odd) {
    background: rgba(0, 0, 0, 0.253);
  }
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 0.5em;
`;

const Paragraph = styled.p`
  font-size: 1.5em;
  margin-bottom: 1em;
`;

const CTAButton = styled.a`
  background: linear-gradient(135deg, #ff4081, #e00070);
  padding: 1em 2em;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e00070, #ff4081);
    box-shadow: 0 0 25px rgba(255, 64, 129, 0.7);
  }
`;

const Particles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const StarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
`;

// const StarBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: transparent;
//   z-index: 0;

//   .star {
//     position: absolute;
//     width: 2px;
//     height: 2px;
//     background-color: #ff4081; /* Default color */
//     opacity: 0.8;
//     border-radius: 50%;
//     box-shadow: 0 0 2px rgba(255, 64, 129, 0.5);
//     animation: twinkle 1s infinite;
//   }

//   @keyframes twinkle {
//     0%,
//     100% {
//       transform: scale(1);
//       opacity: 0.8;
//     }
//     50% {
//       transform: scale(0.8);
//       opacity: 0.4;
//     }
//   }
// `;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const FeatureItem = styled.div`
  max-width: 300px;
  text-align: center;
  padding: 20px;
`;

const Logos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;

  img {
    max-width: 300px;
    border-radius: 5px;
    margin: 20px;
  }
`;

const SliderContainer = styled.div`
  width: 80%;
  max-width: 800px;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
`;

const SliderButtons = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const SliderButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

// const HeroBanner = styled.div`
//   background-image: url(https://img.freepik.com/free-photo/close-up-photo-painting-wood-brown-color_176420-4794.jpg?t=st=1720939725~exp=1720943325~hmac=50fc1fca6d2532fc80af7a8cc0d099c80f9908cd77dc4db66f2f628e7dfa7d20&w=1380);
//   background-position: center;
//   width: 100%;
//   background-repeat: no-repeat;
//   background-size: cover;
//   height: 100vh;
//   text-align: center;
//   padding: 50px 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   transition: background 0.5s ease-out;
//   opacity: ${opacity};
// `;
const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const navLink = ['Home', 'Catagory', 'Products', 'Contact'];
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;

    const stickNavbar = () => {
      if (window.pageYOffset > sticky) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.onscroll = stickNavbar;

    const particleContainer = document.querySelector('.particles');
    const starBackground = document.querySelector('.star-background');

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particleContainer.appendChild(particle);
    }

    for (let i = 0; i < 300; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      starBackground.appendChild(star);
    }

    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    const particleContainer = document.querySelector('.particles');
    const starBackground = document.querySelector('.star-background');

    const randomColor = () => {
      const colors = ['#ff4081', '#e00070', '#4caf50', '#2196f3', '#ff9800'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particleContainer.appendChild(particle);
    }

    for (let i = 0; i < 300; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.backgroundColor = randomColor(); // Set random color
      starBackground.appendChild(star);
    }

    return () => {
      window.onscroll = null;
    };
  }, []);

  const showSlide = (n) => {
    let newIndex = index + n;
    if (newIndex >= 3) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = 2;
    }
    setIndex(newIndex);
  };

  // scroll
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = 700; // Adjust this value as needed
    const newOpacity = Math.max(0, 1 - scrollTop / maxScroll);
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const HeroBanner = styled.div`
    background-image: url(https://img.freepik.com/free-photo/close-up-photo-painting-wood-brown-color_176420-4794.jpg?t=st=1720939725~exp=1720943325~hmac=50fc1fca6d2532fc80af7a8cc0d099c80f9908cd77dc4db66f2f628e7dfa7d20&w=1380);
    background-position: center;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    text-align: center;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background 0.5s ease-out;
    opacity: ${opacity};
  `;
  return (
    <div>
      <GlobalStyle />
      <Navbar id='navbar'>
        <div className='logo'>
          <a href='#' style={{ fontSize: '20px' }}>
            <img src={logo} width={150} style={{ borderRadius: '50%' }} />
          </a>
        </div>
        <div className='nav-links'>
          {navLink.map((e, i) => (
            <NavLink href='#'>{e}</NavLink>
          ))}
        </div>
      </Navbar>
      {/* <Container> */}
      <HeroBanner
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/close-up-photo-painting-wood-brown-color_176420-4794.jpg?t=st=1720939725~exp=1720943325~hmac=50fc1fca6d2532fc80af7a8cc0d099c80f9908cd77dc4db66f2f628e7dfa7d20&w=1380)',
          backgroundPosition: 'center',
          width: '100%',
          backgroundRepeat: 'noRepeat',
          backgroundSize: 'cover',
          height: '100vh',
          textAlign: 'center',
          padding: ' 50px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background 0.5s ease-out',
          opacity: opacity,
        }}
      >
        <Title>Welcome to Garuda Paints</Title>
        <Paragraph>Explore the beauty of dynamic wood paints</Paragraph>
        <CTAButton href='#features'>Learn More</CTAButton>
      </HeroBanner>
      {/* </Container> */}
      <Container>
        <Title>Catagories</Title>
        <Features>
          <FeatureItem>
            <h2>Wood Paints</h2>
            <p>Detail about Wood Paint</p>
          </FeatureItem>
          <FeatureItem>
            <h2>Steel Paint</h2>
            <p>Detail about Steel Paint</p>
          </FeatureItem>
          <FeatureItem>
            <h2>Thinner</h2>
            <p>Detail about Thinner</p>
          </FeatureItem>
        </Features>
        <Logos>
          <img
            src='https://img.freepik.com/free-photo/tools-art-repairing-paint-space-text_185193-108853.jpg?t=st=1720942396~exp=1720945996~hmac=36545043dfba8f105dfc578e09199403aa195abea4f8c8afe5b3e27cd4b05c55&w=1380'
            alt='Logo 1'
          />
          <img
            src='https://img.freepik.com/free-photo/tools-art-repairing-paint-space-text_185193-108865.jpg?t=st=1720942485~exp=1720946085~hmac=e84562be8be1bc79df3a210f226003453115be79d0b9965249f2feb2f916f1b6&w=1380'
            alt='Logo 2'
          />
          <img
            src='https://img.freepik.com/premium-photo/can-blue-paint-roller-orange-surface_185193-11741.jpg'
            alt='Logo 3'
          />
          <img
            src='https://www.picclickimg.com/yAgAAOSwBCRj8zfC/5-Lt-Standard-Cellulose-Thinner-Std-Thinner-Gun.webp'
            alt='Logo 4'
          />
        </Logos>
      </Container>
      {/* <Container id='features'> */}
      <div
        style={{ background: '#25262e', textAlign: 'center', display: 'flex' }}
      >
        <div>
          {' '}
          <Title>Our Products</Title>
          <SliderContainer>
            <Slides style={{ transform: `translateX(-${index * 100}%)` }}>
              <Slide>
                <img
                  style={{ width: '100%' }}
                  src='https://img.freepik.com/free-photo/tools-art-repairing-paint-space-text_185193-108853.jpg?t=st=1720942396~exp=1720945996~hmac=36545043dfba8f105dfc578e09199403aa195abea4f8c8afe5b3e27cd4b05c55&w=1380'
                  alt='Slide 1'
                />
              </Slide>
              <Slide>
                <img
                  style={{ width: '100%' }}
                  src='https://img.freepik.com/free-photo/tools-art-repairing-paint-space-text_185193-108865.jpg?t=st=1720942485~exp=1720946085~hmac=e84562be8be1bc79df3a210f226003453115be79d0b9965249f2feb2f916f1b6&w=1380'
                  alt='Slide 2'
                />
              </Slide>
              <Slide>
                <img
                  style={{ width: '100%' }}
                  src='https://www.picclickimg.com/yAgAAOSwBCRj8zfC/5-Lt-Standard-Cellulose-Thinner-Std-Thinner-Gun.webp'
                  alt='Slide 3'
                />
              </Slide>
            </Slides>
            <SliderButtons>
              <SliderButton onClick={() => showSlide(-1)}>❮</SliderButton>
              <SliderButton onClick={() => showSlide(1)}>❯</SliderButton>
            </SliderButtons>
          </SliderContainer>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              nostrum ducimus doloremque quisquam
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              nostrum ducimus doloremque quisquam
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              nostrum ducimus doloremque quisquam
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              nostrum ducimus doloremque quisquam
            </li>
          </ul>
        </div>
      </div>
      {/* </Container> */}
      {/* <Footer /> */}
      <Particles className='particles' />
      <StarBackground className='star-background' />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import './footer.css';
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer>
      <div class='row primary'>
        <div class='column about'>
          <img src={logo} width={150} />

          <p>
            Garuda Paints: Transforming spaces with vibrant colors and
            long-lasting finishes. Experience the superior quality and
            durability that brings your walls to life.
          </p>

          {/* <div class='social'>
            <i class='fa-brands fa-facebook-square'></i>
            <i class='fa-brands fa-instagram-square'></i>
            <i class='fa-brands fa-twitter-square'></i>
            <i class='fa-brands fa-youtube-square'></i>
            <i class='fa-brands fa-whatsapp-square'></i>
          </div> */}
        </div>

        <div class='column links'>
          <h3>Menu Links</h3>

          <ul>
            <li>
              <a href='#faq'>Home</a>
            </li>
            <li>
              <a href='#cookies-policy'>Catagories</a>
            </li>
            <li>
              <a href='#terms-of-services'>Products</a>
            </li>
            <li>
              <a href='#support'>Contact</a>
            </li>
          </ul>
        </div>

        <div class='column links'>
          <h3>Social Links</h3>
          <ul>
            <li>
              <a href='#faq'>
                <i className='fa-brands fa-facebook-square'></i> FaceBook
              </a>
            </li>
            <li>
              <a href='#cookies-policy'>
                {' '}
                <i class='fa-brands fa-instagram-square'></i> Instagram
              </a>
            </li>
            <li>
              <a href='#terms-of-services'>
                {' '}
                <i class='fa-brands fa-twitter-square'></i> Twitter
              </a>
            </li>
            <li>
              <a href='#support'>
                <i class='fa-brands fa-youtube-square'></i> Youtube
              </a>
            </li>
          </ul>
        </div>

        <div class='column subscribe'>
          <h3>Contact</h3>
          <div>
            <input type='email' placeholder='Your email id here' />
            <input type='text' placeholder='Your Mobile Number here' />
            <textarea
              style={{ borderRadius: '5px' }}
              rows={4}
              cols={60}
              placeholder='Type some Message'
            ></textarea>
            <button className='footer-btn'>Submit</button>
          </div>
        </div>
      </div>

      <div class='row copyright'>
        {/* <div class='footer-menu'>
          <a href=''>Home</a>
          <a href=''>About</a>
          <a href=''>Contact</a>
          <a href=''>Blog</a>
          <a href=''>Social</a>
        </div> */}
        <p>Copyright &copy; 2024 Garuda Paints</p>
      </div>
    </footer>
  );
};

export default Footer;

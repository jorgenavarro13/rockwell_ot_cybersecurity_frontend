import React from 'react';
import './Footer.css';
import { FaLinkedinIn, FaFacebookF, FaXTwitter, FaYoutube, FaBlog} from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="footer-container">
      {/* possible despues anadir los efectos que estan en el sitio */}
      {/* los iconos de linkedin y facebook se encenden azules con hover */}
      {/* los iconos de youtube y blog se encenden rojos */}
      {/* por ahora, todos estan rojos */}
      <div className="footer-socials">
        <a href="https://www.linkedin.com/company/rockwell-automation" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href="https://www.facebook.com/ROKAutomation" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="http://twitter.com/ROKAutomation" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
        <a href="http://www.youtube.com/ROKAutomation" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        <a href="https://www.rockwellautomation.com/es-mx/company/news/blogs.html" target="_blank" rel="noopener noreferrer"><FaBlog /></a>
      </div>

      <div className="footer-brand-block">
        <span className="footer-copyright">© 2026 Rockwell Automation & TEC de Monterrey</span>
        
        <div className="footer-separator"></div>
        
        <img 
          src="https://www.rockwellautomation.com/content/dam/rockwell-automation/sites/images/logos/2019_Logo_rgb_RA_Bug-LeftText_White.svg" 
          alt="Rockwell Automation" 
          className="footer-logo"
        />
      </div>

    </footer>
  );
}

export default Footer;
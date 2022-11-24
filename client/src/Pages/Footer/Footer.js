import React from "react";
import "./FooterStyle.css";
import { Link } from "react-router-dom";
import { CgFacebook, CgYoutube, CgInstagram } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="social-media-link">
        <Link>
          <CgFacebook></CgFacebook>
        </Link>

        <Link>
          <CgYoutube></CgYoutube>
        </Link>

        <Link>
          <CgInstagram></CgInstagram>
        </Link>
      </div>

      <div className="category-footer-links">
        <Link className="link"> Category</Link>
        <Link className="link"> Category</Link>
        <Link className="link"> Category</Link>
        <Link className="link"> Category</Link>
        <Link className="link"> Category</Link>
        <Link className="link"> Category</Link>
      </div>

      <div className="website-link">
        <Link className="link">Contact Us</Link>
        <Link className="link">About Us</Link>
        <Link className="link">Copy Write</Link>
      </div>
    </div>
  );
};

export default Footer;

//#region Imports
import React from "react";
import { FaTwitter, FaYoutube, FaFacebookF, FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
//#endregion

const Footer = () => {
  return (
    <footer className={`pt-5 ${styles.footer}`}>
      <div className="container pb-5">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
            <h6 className={`small fw-bold ${styles.link_title} text-uppercase`}>Quick Links</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Live
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Videos
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Press
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Advertise
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
            <h6 className={`small fw-bold ${styles.link_title} text-uppercase`}>Legal</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Terms
                </a>
              </li>
              <li className="nav-item mb-2">
                <Link href="privacy-policy" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Returns Policy
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Cookie Policy
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white  ${styles.footer_text_size}`}>
                  Personal Info
                </a>
              </li>
            </ul>
          </div> */}
          <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5 mt-sm-5 mt-md-5 mt-lg-0 mt-xl-0">
            <h6 className={`small fw-bold ${styles.link_title} text-uppercase`}>Contact Center</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className={`nav-link p-0 text-white ${styles.footer_text_size}`}>
                  13 Adelaide Rd, Saint Kevin's <br /> Dublin, D02 P950, Ireland <br /> European Union
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mt-5 mt-sm-5 mt-md-5 mt-lg-0 mt-xl-0">
            <h6 className={`small fw-bold ${styles.link_title} text-uppercase`}>Payment Method</h6>
            <div className="row">
              <div className="col-5">
                <div className="card d-flex d-row py-1 my-2 px-1 align-items-center">
                  <Image priority alt={"image"} src="/assets/icons/visa.png" width={30} height={15} />
                </div>
              </div>
              <div className="col-5">
                <div className="card d-flex d-row py-1 my-2 px-1 align-items-center">
                  <Image priority alt={"image"} src="/assets/icons/google-pay.png" width={30} height={15} />
                </div>
              </div>
              <div className="col-5">
                <div className="card d-flex d-row py-1 my-2 px-1 align-items-center">
                  <Image priority alt={"image"} src="/assets/icons/mastercard.png" width={20} height={15} />
                </div>
              </div>
              <div className="col-5">
                <div className="card d-flex d-row py-1 my-2 px-1 align-items-center">
                  <Image priority alt={"image"} src="/assets/icons/paypal.png" width={30} height={15} />
                </div>
              </div>
              <div className="col-5">
                <div className="card d-flex d-row py-1 my-2 px-1 align-items-center">
                  <Image priority alt={"image"} src="/assets/icons/apple-pay.png" width={30} height={15} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-xl-4 col-xl-4 d-none d-sm-none d-md-none d-lg-block">
            <div className="row">
              <div className="col-10">
                <h6 className={`small fw-bold ${styles.link_title} text-uppercase`}>Our Mission</h6>
                <p className={`small text-white ${styles.footer_text_size}`}>
                  To spread the gospel and the good news of the Kingdom of heaven to every willing and welcoming heart. Promote biblical values, empower God's children
                  worldwide, and commit to transforming lives with a message of faith, hope, and love
                </p>
              </div>
              <div className="col-2">
                <a href="#">
                  <Image priority alt={"image"} src="/assets/images/ktn-logo.png" width={40} height={50} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top px-3 px-sm-3 px-md-5 px-lg-5 px-xl-5">
        <div className="container-fluid py-3 d-flex justify-content-between">
          <p className={`p text-white text-uppercase ${styles.footer_text}`}>© 2023 KINGDOM TELEVISION NETWORK LIMITED</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className={`link-white text-white rounded-circle d-flex flex-row justify-content-center align-items-center ${styles.social_icon}`} href="https://www.tiktok.com/@kingdom24.tv">
                <FaTiktok className={`${styles.icon}`} />
              </a>
            </li>
            <li className="ms-3">
              <a className={`link-white text-white rounded-circle d-flex flex-row justify-content-center align-items-center ${styles.social_icon}`} href="https://www.instagram.com/kingdom24tv/">
                <AiFillInstagram className={`${styles.icon}`} />
              </a>
            </li>
            <li className="ms-3">
              <a className={`link-white text-white rounded-circle d-flex flex-row justify-content-center align-items-center ${styles.social_icon}`} href="https://www.youtube.com/@ApostoloOnorioCutane">
                <FaYoutube  className={`${styles.icon}`} />
              </a>
            </li>
            <li className="ms-3">
              <a className={`link-white text-white rounded-circle d-flex flex-row justify-content-center align-items-center ${styles.social_icon}`} href="https://www.facebook.com/kingdom24tv/">
                <FaFacebookF className={`${styles.icon}`} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//#region Imports
import React, { useContext } from "react";
// import { GoSearch } from "react-icons/go";
// import { FiShoppingCart } from "react-icons/fi";
import { FaVoteYea } from "react-icons/fa";
import styles from "./header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { FaBars, FaSignInAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseSquare, AiFillHome } from "react-icons/ai";
import { BsCameraVideoFill, BsFillPlayCircleFill } from "react-icons/bs";
import { GiArchiveRegister, GiNotebook } from "react-icons/gi";
import { GlobalContext } from "@/context/Provider";
import Image from "next/image";
import LangTranslator from '../Language';
//#endregion

const Header = () => {
  const router = useRouter();
  const { status } = useSession();
  const { user, setUser, cart, setCart } = useContext(GlobalContext);
  const logout = async () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setCart(null);
    await signOut({ redirect: false, callbackUrl: "/login" });
    return;
  };
  return (
    <nav className={`navbar navbar-expand-lg bg-transparent w-100 pt-0 ${styles.header}`}>
      <div className="container-fluid pe-0 d-flex flex-row align-items-between">
        <div className="d-flex">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars color="white" />
          </button>
          <li className="pl-3 py-3 d-block d-lg-none d-xl-none">
            <LangTranslator color="#fff"/>
          </li>
        </div>
        <Link className="navbar-brand" href="/">
          <Image priority src="/assets/images/ktn-logo.png" alt="KTN" width="43" height="49" />
        </Link>
        <div className={`collapse navbar-collapse ${styles.mobileMenu}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 py-0 px-4  nav-opacity">
            <li className={`nav-item px-0 pt-3 pb-5 d-lg-none d-xl-none d-xxl-none d-flex flex-row justify-content-between`}>
              <a
                className="nav-link position-relative text-white navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                href="#"
              >
                <AiFillCloseSquare size={35} />
              </a>
              <a className="nav-link position-relative text-white" href="cart">
                <FaVoteYea size={18} />
                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart && cart?.items ? cart?.items?.length : 0}
                  <span className="visually-hidden">Items</span>
                </span>
              </a>
              
               <>
               {user && (
                  <div className="nav-item px-2 dropdown">
                    <Link
                      className="nav-link text-white d-flex flex-row justify-content-center align-items-center dropdown-toggle"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                      aria-expanded="false"
                      href="#"
                    >
                      <h6 className={`h6 text-end me-2 mt-1 ${styles.name}`}>
                        {`${user?.first_name} ${user?.last_name}`} <br />
                        <small className={`small ${styles.small}`}>{user?.city ?? user?.country ?? "Unknown City"}</small>
                      </h6>
                      <div className={`${styles.image_container}`}>
                        <Image priority height={30} width={30} alt={"image"} src={`${user?.image ? user?.image : '/assets/users/user_avatar.png'}`} className={`${styles.image}`} />
                      </div>
                    </Link>
                    <ul className={`dropdown-menu ${styles.dropdown} dropstart`} aria-labelledby="dropdownMenuLink">
                      <li>
                        <Link className="dropdown-item" href="profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={logout} href="#">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
               )}
              </>
            </li>
            <li className={`nav-item px-0 py-3 d-lg-none d-xl-none d-xxl-none`}>
              <form>
                <div className={`input-group ${styles.mobileContainer}`}>
                  <input type="text" placeholder="Search for anything...." className={`form-control ${styles.mobileSearch}`} id="search_query" />
                  <button
                    className={`btn btn-outline-secondary d-flex flex-row justify-content-center align-items-center ${styles.searchButton}`}
                    type="button"
                    id="button-addon2"
                  >
                    <BiSearch />
                  </button>
                </div>
              </form>
            </li>
            <li className={`nav-item px-2 py-3 ${styles.mobile_nav}  ${router.pathname === "/" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} aria-current="page" href="/">
                <AiFillHome className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> <span>HOME</span>
              </Link>
            </li>
            <li className={` nav-item px-2 py-3 ${styles.mobile_nav} ${router.pathname === "/live-events" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} href="/live-events">
                <BsCameraVideoFill className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> LIVE
              </Link>
            </li>
            <li className={` nav-item px-2 py-3 ${styles.mobile_nav} ${router.pathname === "/videos" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} href="/videos">
                <BsFillPlayCircleFill className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> VIDEOS
              </Link>
            </li>
            <li className={` nav-item px-2 py-3 ${styles.mobile_nav} ${router.pathname === "/press-release" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} href="/press-release">
                <GiNotebook className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> PRESS
              </Link>
            </li>
            <li className={` nav-item px-2 py-3 ${styles.mobile_nav} ${router.pathname === "/advertisement" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} href="/advertisement">
                <BsCameraVideoFill className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> ADVERTISE
              </Link>
            </li>
            <li
              className={` nav-item px-2 py-3 ${styles.mobile_nav} dropdown ${
                router.pathname === "/partnerships" || router.pathname === "/payment" ? styles.active : ""
              }`}
            >
              <Link className={`nav-link text-white dropdown-toggle ${styles.link}`} id="partnership_dropdown" data-bs-toggle="dropdown" aria-expanded="false" href="#">
                <BsCameraVideoFill className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> PARTNERSHIP
              </Link>
              <ul className="dropdown-menu" aria-labelledby="partnership_dropdown">
                <li>
                  <Link className="dropdown-item" href="/partnerships">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/online-giving">
                    Online Giving
                  </Link>
                </li>
              </ul>
            </li>
            <li className={` nav-item px-2 py-3 ${styles.mobile_nav_last} ${styles.mobile_nav} ${router.pathname === "/contact-us" ? styles.active : ""}`}>
              <Link className={`nav-link text-white ${styles.link}`} href="/contact-us">
                <BsCameraVideoFill className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> CONTACT
              </Link>
            </li>
           
            <li className="nav-item dropdown ps-4 pe-2 py-3 d-none d-lg-block d-xl-block">
              <LangTranslator color="#fff"/>
             </li>
            {/* <li className={`nav-item px-2 py-3 ${styles.mobile_nav} d-none d-lg-block d-xl-block`}>
              <a className={`nav-link text-white ${styles.link}`} href="#">
                <GoSearch size={18} />
              </a>
            </li> */}
            <li className="nav-item ps-2 pe-4 py-3 d-none d-lg-block d-xl-block">
              <Link className="nav-link position-relative text-white" href="cart">
                <FaVoteYea size={18} />
                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart && cart?.items ? cart?.items?.length : 0}
                  <span className="visually-hidden">Items</span>
                </span>
              </Link>
            </li>
            {status != "authenticated" ? (
              <>
                <li className={`nav-item px-2 py-3 d-none d-sm-none d-md-none d-lg-block d-xl-block ${styles.mobile_nav}`}>
                  <Link className={`nav-link text-white ${styles.link}`} href="login">
                    LOGIN
                  </Link>
                </li>
                <li className={`nav-item px-2 py-3 d-flex flex-row justify-content-between ${styles.mobile_nav} ${styles.mobileLoginContainer}`}>
                  <Link className={`btn btn-primary px-3 py-2 nav-link d-lg-none d-xl-none d-xxl-none`} href="login">
                    <FaSignInAlt className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> LOGIN
                  </Link>
                  <Link className="btn btn-primary px-3 py-2 nav-link" href="sign-up">
                    <GiArchiveRegister className={`${styles.mobileIcon} d-lg-none d-xl-none d-xxl-none`} /> SIGNUP
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item px-2 py-2 d-none d-lg-block d-xl-block dropdown">
                  <Link
                    className="nav-link text-white d-flex flex-row justify-content-center align-items-center dropdown-toggle"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                    href="#"
                  >
                    {user !== null && user !== undefined ? (<h6 className={`h6 text-end me-2 mt-1 ${styles.name}`}>
                      {`${user?.first_name} ${user?.last_name}`} <br />
                      <small className={`small ${styles.small}`}>{user?.city ?? user?.country ?? "Unknown City"}</small>
                    </h6>) : (<h6 className={`h6 text-end me-2 mt-1 ${styles.name}`}>Loading... </h6>)}

                    <div className={`${styles.image_container}`}>
                      <Image priority height={30} width={30} alt={"image"} src={`${user?.image ? user?.image : '/assets/users/user_avatar.png'}`} className={`${styles.image}`} />
                    </div>
                  </Link>
                  <ul className={`dropdown-menu ${styles.dropdown} dropstart`} aria-labelledby="dropdownMenuLink">
                    <li>
                      <Link className="dropdown-item" href="profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logout} href="#">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.logout} d-lg-none d-xl-none d-xxl-none`}>
                  <Link className={`btn btn-secondary w-100 border-0`} onClick={logout} href="#">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

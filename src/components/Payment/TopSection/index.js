//#region Imports
import { CONFIRMATION, MAKE_PAYMENT, PAYMENT_PROCESS, SHOPPING_CART } from "@/constants/constants";
import Link from "next/link";
import React, { useContext } from "react";
import styles from "./top.module.css";
import { GlobalContext } from "@/context/Provider";
//#endregion

const TopSection = ({ cart, activeTab, onTabChange }) => {
  const { user } = useContext(GlobalContext);
  return (
    <section className={`row ${styles.section}`}>
      <div className={`row ${styles.overlay}`}>
        <div className={`d-flex flex-column justify-content-center align-items-center`}>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-2 p-sm-2 p-md-3 p-lg-5 p-xl-5 d-flex flex-column justify-content-center align-items-center ${styles.top_container}`}
          >
            <h4 className={`h4 text-white`}>{cart ? "Payment Process" : "Your Cart is Empty"}</h4>
            <Link href="partnerships" className={`btn btn-primary mt-4 d-none d-sm-none d-md-block d-lg-block d-xl-block`} style={{ borderRadius: 0 }}>
              Explore Partnerships
            </Link>
          </div>
          {onTabChange && (
            <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 w-100 ${styles.bottom_title}`}>
              <nav className="navbar py-0 navbar-expand navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl bg-transparent">
                <div className="container-fluid bg-transparent">
                  <div className={`collapse navbar-collapse d-flex flex-row bg-transparent justify-content-center ${styles.mid_nav}`} id="paymentContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center align-items-center">
                      <li className="nav-item px-0 px-sm-0 px-md-3 px-lg-4 px-xl-4">
                        <Link
                          className={`nav-link text-white`}
                          aria-current="page"
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            onTabChange(SHOPPING_CART);
                          }}
                        >
                          <span className={`${styles.disc} ${activeTab == SHOPPING_CART && styles.activeDisc}`}>1</span>
                          Offering
                        </Link>
                      </li>
                      <li className="nav-item px-0 px-sm-0 px-md-3 px-lg-4 px-xl-4">
                        <hr className={`border ${styles.divider}`} />
                      </li>
                      <li className="nav-item px-0 px-sm-0 px-md-3 px-lg-4 px-xl-4">
                        <Link
                          className={`nav-link text-white`}
                          onClick={(event) => {
                            event.preventDefault();
                            onTabChange(!user ? PAYMENT_PROCESS : MAKE_PAYMENT);
                          }}
                          href="#"
                        >
                          <span className={`${styles.disc} ${(activeTab == PAYMENT_PROCESS || activeTab == MAKE_PAYMENT) && styles.activeDisc}`}>2</span>
                          Payment Process
                        </Link>
                      </li>
                      <li className="nav-item px-0 px-sm-0 px-md-3 px-lg-4 px-xl-4">
                        <hr className={`border ${styles.divider}`} />
                      </li>
                      <li className="nav-item px-0 px-sm-0 px-md-3 px-lg-4 px-xl-4">
                        <Link
                          className={`nav-link text-white`}
                          onClick={(event) => {
                            event.preventDefault();
                            onTabChange(!user ? PAYMENT_PROCESS : CONFIRMATION);
                          }}
                          href="#"
                        >
                          <span className={`${styles.disc} ${activeTab == CONFIRMATION && styles.activeDisc}`}>3</span>
                          Confirmation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSection;

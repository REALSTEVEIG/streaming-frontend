//#region Imports
import { EDIT, SUBSCRIPTION, TRANSACTIONS } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import Link from "next/link";
import React, { useContext } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import styles from "./styles.module.css";
//#endregion

const ProfileSection = ({ setIsEdit, setIsTransactions, setIsSubscriptions, setIsProfile }) => {
  const { user } = useContext(GlobalContext);
  return (
    <>
      <div className="row my-4">
        <div className={`col-12 px-5 d-flex flex-row justify-content-end`}>
          <Link
            href={`#`}
            onClick={(event) => {
              event.preventDefault();
              setIsSubscriptions(SUBSCRIPTION);
              setIsProfile(null);
              setIsEdit(null);
              setIsTransactions(null);
            }}
            className="btn btn-primary border text-white px-4"
          >
            Subscriptions
          </Link>
          <Link
            href={`#`}
            onClick={(event) => {
              event.preventDefault();
              setIsTransactions(TRANSACTIONS);
              setIsProfile(null);
              setIsSubscriptions(null);
              setIsEdit(null);
            }}
            className="btn btn-primary border text-white bg-dark px-4"
          >
            Payments
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-10 col-lg-7 col-xl-7">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>01</span>
                    Basic Info
                  </h6>
                </div>
                <div className="card-body">
                  <div className={`row ms-lg-5 ${styles.card}`}>
                    <div className={`col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5`}>
                      <table className="table">
                        <tr>
                          <td className="small">
                            <span className="fw-bold">First Name:</span> {user?.first_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Birth Date:</span> {user?.birth_date}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Civil Status:</span> {user?.marital_status}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Country of Residence:</span> {user?.country_of_residence}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4`}>
                      <table className="table">
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Last Name:</span> {user?.last_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Gender:</span> {user?.gender}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Country of Origin:</span> {user?.country_of_origin}
                          </td>
                        </tr>
                        <tr>
                          <td className="small">
                            <span className="fw-bold">City:</span> {user?.city}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3`}>
                      <button
                        className={`btn btn-secondary btn-sm bg-dark small`}
                        onClick={() => {
                          setIsEdit(EDIT);
                          setIsTransactions(null);
                          setIsProfile(null);
                          setIsSubscriptions(null);
                        }}
                      >
                        Modify <BsFillPencilFill size={10} color={"#ffffff"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>02</span>
                    Security
                  </h6>
                </div>
                <div className="card-body">
                  <div className={`row ms-lg-5`}>
                    <div className={`col-12 col-sm-12 col-md-8 col-lg-9 col-xl-9`}>
                      <table className="table">
                        <tr>
                          <td className="small">
                            <span className="fw-bold">Email:</span> {user?.email}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className={`col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3`}>
                      <button className={`btn btn-secondary btn-sm bg-dark small`}>
                        Modify <BsFillPencilFill size={10} color={"#ffffff"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;

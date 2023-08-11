//#region Imports
import { PROFILE, TRANSACTIONS } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import { convertToCurrency, getEuroSign } from "@/core/helpers";
import { getUserPartnershipSubscriptions } from "@/services/partnerships.service";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
//#endregion

const Subscriptions = ({ setIsEdit, setIsTransactions, setIsSubscriptions, setIsProfile }) => {
  const { user } = useContext(GlobalContext);
  const [partnerships, setPartnerships] = useState(null);
  const getPartnerships = async () => {
    const result = await getUserPartnershipSubscriptions(user?._id);
    setPartnerships(result?.data ?? []);
  };

  useEffect(() => {
    getPartnerships();
  }, []);

  return (
    <>
      <div className="row my-4">
        <div className={`col-12 px-5 d-flex flex-row justify-content-end`}>
          <Link
            href={`#`}
            onClick={(event) => {
              event.preventDefault();
              setIsProfile(PROFILE);
              setIsSubscriptions(null);
              setIsEdit(null);
              setIsTransactions(null);
            }}
            className="btn btn-primary border text-white px-4"
          >
            Profile
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
        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 m-auto">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>01</span>
                    Subscriptions
                  </h6>
                </div>
                <div className="card-body">
                  <div className={`row ms-lg-5 ${styles.card}`}>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 m-auto`}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th></th>
                            <th>Partnership</th>
                            <th>Frequency</th>
                            <th>Amount</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partnerships?.map((item, index) => {
                            return (
                              <tr key={item?._id}>
                                <td className="small">{++index}</td>
                                <td>
                                  {item?.image_url && (
                                    <Image
                                      priority
                                      src={
                                        item?.image_url?.includes("http")
                                          ? item?.image_url
                                          : `${item?.image_url ? "http://" : ""}${item?.image_url ?? "/assets/icons/logo-knt-blue.png"}`
                                      }
                                      alt="image"
                                      width={25}
                                      height={30}
                                    />
                                  )}
                                </td>
                                <td className="small">{item?.name}</td>
                                <td className="small">{item?.frequency}</td>
                                <td className="small">{`${getEuroSign()}${convertToCurrency(item?.amount)}`}</td>
                                <td>{`${item?.description?.substring(0, 100)}...`}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

export default Subscriptions;

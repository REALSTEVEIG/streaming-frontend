//#region Imports
import { PROFILE, SUBSCRIPTION } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import { convertToCurrency, getEuroSign, getFormattedShortDate } from "@/core/helpers";
import { getUserPartnershipPayments } from "@/services/partnerships.service";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Pagination from "@/components/Pagination";
//#endregion

const Transactions = ({ setIsEdit, setIsTransactions, setIsSubscriptions, setIsProfile }) => {
  const { user } = useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [limit, setLimit] = useState(9);
  const [totalSize, setTotalSize] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  const getTransactions = async () => {
    const result = await getUserPartnershipPayments({id: user?._id, page, size, limit});
    setTotalSize(result.count);
    if (Math.ceil(result.count/size) <= 1) setIsEnd(true);
    else setIsEnd(false);

    if (page > 0) setIsFirst(false);
    else setIsFirst(true);
    setTransactions(result?.data);
  };

  useEffect(() => {
    getTransactions();
  }, [page]);

  return (
    <>
      <div className="row my-4">
        <div className={`col-12 px-5 d-flex flex-row justify-content-end`}>
          <Link
            href={"#"}
            onClick={(event) => {
              event.preventDefault();
              setIsProfile(PROFILE);
              setIsSubscriptions(null);
              setIsEdit(null);
              setIsTransactions(null);
            }}
            className="btn btn-primary bg-dark me-3 px-4"
          >
            Profile
          </Link>
          <Link
            href={"#"}
            onClick={(event) => {
              event.preventDefault();
              setIsProfile(null);
              setIsSubscriptions(SUBSCRIPTION);
              setIsEdit(null);
              setIsTransactions(null);
            }}
            className="btn btn-primary bg-dark me-3 px-4"
          >
            Subscriptions
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 m-auto">
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>01</span>
                    Transactions
                  </h6>
                </div>
                <div className="card-body">
                  <div className={`row ms-lg-5 ${styles.card}`}>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12`}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions?.map((item, index) => {
                            return (
                              <tr key={item?._id}>
                                <td className="small">{parseInt(size)*(parseInt(page)-(page <= 1 ? 0 : 1))+index+1}</td>
                                <td className="small">{item?.narration}</td>
                                <td className="small">{`${getEuroSign()}${convertToCurrency(item?.amount)}`}</td>
                                <td className="small">{getFormattedShortDate(item?.created_at_timestamp)}</td>
                                <td className="small">
                                  {item?.status == "succeeded" ? (
                                    <span className={`badge bg-success`}>{item?.status}</span>
                                  ) : (
                                    <span className={`badge bg-info`}>{item?.status}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                <Pagination isEnd={isEnd} isFirst={isFirst} page={page} setIsEnd={setIsEnd} setIsFirst={setIsFirst} setPage={setPage} size={size} totalSize={totalSize} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;

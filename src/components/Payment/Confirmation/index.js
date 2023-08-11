import { convertToCurrency, getEuroSign, getFormattedShortDate } from "@/core/helpers";
import React from "react";
import axios from "axios";

const Confirmation = ({ transaction }) => {

  let cart = localStorage.getItem("cart");

  if (transaction.status === "succeeded") {
    console.log("transaction :>>>>>>>>>>>>>>", transaction)

    axios.get(`http://localhost/nodemailer/${cart}`)
    .then((res) => {
      console.log("res: ", res)
    })
    .catch((err) => {
      console.log("err: ", err)
    })
  } 

  else {
    console.log("transaction not successful :>>>>>>>>>>>>>>")
  }

  return (
    <div className="row justify-content-center py-5">
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div className="card p-5">
          <div className="card-header bg-transparent border-0 text-center">
            <small className="small fw-bold">Payment has been placed</small>
          </div>
          <div className="card-body py-5">
            <table className="table">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td className="text-end">{getFormattedShortDate(transaction?.created_at_timestamp)}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td className="text-end">Credit Card</td>
                </tr>
                <tr>
                  <td>Product Price</td>
                  <td className="text-end">{`${getEuroSign()}${convertToCurrency(transaction?.amount)}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-transparent border-0 d-flex flex-row justify-content-between">
            <small className="small fw-bold">Total</small>
            <small className="small fw-bold">{`${getEuroSign()}${convertToCurrency(transaction?.amount)}`}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

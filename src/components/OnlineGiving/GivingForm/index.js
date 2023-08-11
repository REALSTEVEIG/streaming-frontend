import React, { useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.css";
import { convertToCurrency } from "@/core/helpers";
import { useRouter } from "next/router";

const GivingForm = ({ isLoading, onAddToCart }) => {
  const router = useRouter();

  const [amount, setAmount] = useState(0);
  return (
    <div className="row">
      <div className={`col-12 col-sm-12 col-md-10 col-lg-5 col-xl-5 mx-auto`}>
        <div className={`card border-0 px-5 py-3 ${styles.card}`}>
          <div className="card-header border-0 bg-transparent d-flex flex-row justify-content-between">
            <h4 className={`h4 ${styles.title} fw-bold`}>Church Offering</h4>
            <h5 className={`h5 ${styles.amount} fw-bold`}>
              Amount: <span className="ktn-text-primary">€{amount.toFixed(2)}</span>
            </h5>
          </div>
          <div className={`card-body`}>
            <p className={`p d-none d-sm-none d-md-none d-lg-block d-xl-block ${styles.p_text}`}>
              The offering in Christianity is a gift of money to the Church beyond a Christian’s payment of his/her tithes. Therefore, if you enjoyed the message today
              and wish to offer a gift to Nations of Christ Ministerial Church. Please use the button below and select the appropriate amount.
            </p>
            <div className="row py-5">
              <div className={`col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex flex-column justify-content-center align-items-end`}>
                <div className="input-group">
                  <span className="input-group-text">€</span>
                  <input
                    onKeyUp={(event) => {
                      setAmount(parseInt(event.currentTarget.value ? event.currentTarget.value : 0));
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span className="input-group-text">.00</span>
                </div>
              </div>
              <div className={`col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center align-items-end`}>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    onAddToCart(amount);
                    setAmount(0);
                    router.push("/cart");
                  }}
                  disabled={isLoading}
                  type={`submit`}
                  className={`btn btn-sm px-3 py-2 btn-secondary ${styles.button}`}
                >
                  {isLoading ? "Processing..." : "GIVE"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GivingForm;

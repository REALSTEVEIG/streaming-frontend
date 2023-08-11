import Link from "next/link";
import React from "react";
import styles from "@/styles/login.module.css";
import { BiChevronLeft } from "react-icons/bi";
import { LOGIN } from "@/constants/constants";

const ConfirmOTP = ({ title, register, onSubmit, style, msg, errors, isLoading, onChange }) => {
  return (
    <div className="row d-flex flex-column justify-content-center align-items-center">
      <div className="col-12 position-relative mb-5">
        <Link
          href={"#"}
          className={`nav-link ${styles.back_button}`}
          onClick={(event) => {
            event.preventDefault();
            onChange(LOGIN);
          }}
        >
          <BiChevronLeft size={25} /> Back
        </Link>
      </div>
      <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-center align-items-center`}>
        <h5 className="h5 fw-bold">Confirm OTP</h5>
        <h6 className="h6 ktn-text-primary">{"Enter the OTP sent to your email"}</h6>

        <div className={`row pt-3`}>
          {msg && style && <div className={`${style}`}>{msg}</div>}
          <div className="col-12 w-100 mb-3">
            <label htmlFor="otp" className={`form-label`}>
              OTP
            </label>
            <input
              type="number"
              maxLength={6}
              max={6}
              {...register("otp", { required: true })}
              className={`form-control input-text w-100 ${styles.input}`}
              id="otp"
              placeholder="Enter your OTP"
            />
            {errors.otp && (
              <span role="alert" className="text-danger">
                {errors.otp.message}
              </span>
            )}
          </div>
        <div className={`col-12 ${!title && "pb-5 pb-sm-5 pb-md-3 pb-lg-2 pb-xl-2"} d-flex flex-row justify-content-center`}>
          <input
            type={"submit"}
            onClick={onSubmit}
            disabled={isLoading}
            value={`${isLoading ? "Processing" : "Confirm OTP"}`}
            className={`btn btn-success w-50 ${styles.login_btn}`}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOTP;

import Link from "next/link";
import React from "react";
import styles from "@/styles/login.module.css";
import { BiChevronLeft } from "react-icons/bi";
import { LOGIN } from "@/constants/constants";

const ConfirmEmail = ({ title, register, onSubmit, style, msg, errors, isLoading, onChange }) => {
  return (
    <div className="row d-flex flex-column justify-content-center align-items-center h-100">
      <div className="col-12 position-relative mb-5">
        <Link href={"#"} onClick={(event)=>{event.preventDefault(); onChange(LOGIN)}} className={`nav-link ${styles.back_button}`}>
          <BiChevronLeft size={25} /> Back
        </Link>
      </div>
      <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-center align-items-center`}>
        <h5 className="h5 fw-bold">Verify Email</h5>
        <h6 className="h6 ktn-text-primary">{"Enter your registered email to proceed."}</h6>
        {msg && style && <div className={`${style}`}>{msg}</div>}
        <div className={`row pb-5 pt-3`}>
          <div className="col-12 w-100 mb-5">
            <label htmlFor="email" className={`form-label`}>
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`form-control input-text w-100 ${styles.input}`}
              id="email"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span role="alert" className="text-danger">
                {errors.email.message}
              </span>
            )}
          </div>
          
        <div className={`col-12 ${!title && "pb-5 pb-sm-5 pb-md-3 pb-lg-2 pb-xl-2"} d-flex flex-row justify-content-center`}>
          <input
            type={"submit"}
            onClick={onSubmit}
            disabled={isLoading}
            value={`${isLoading ? "Processing" : "Confirm Email"}`}
            className={`btn btn-success w-50 ${styles.login_btn}`}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;

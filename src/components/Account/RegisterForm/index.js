import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "@/styles/login.module.css";
import { FaFacebookF } from "react-icons/fa";
import { BiChevronLeft } from "react-icons/bi";

const RegisterForm = ({ isRegister, watch, register, onSubmit, style, msg, errors, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="row d-flex flex-column justify-content-center align-items-center">
      <div className="col-12 position-relative d-block d-sm-block d-md-block d-lg-none d-xl-none mb-5">
        <Link href={"/"} className={`nav-link ${styles.back_button}`}>
          <BiChevronLeft size={25} /> Back
        </Link>
      </div>
      <div className={`col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 d-flex flex-column justify-content-center align-items-center`}>
        <h5 className="h5 fw-bold">{!isRegister && "Sign Up"}</h5>
        {!isRegister && <h6 className="h6 ktn-text-primary">Create your new account</h6>}
        {style && msg && <div className={`${styles}`}>{msg}</div>}
        <div className={`row ${!isRegister && "pt-3"}`}>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
            <label htmlFor="first_name" className={`form-label`}>
              First Name
            </label>
            <input
              type="text"
              {...register("first_name", {
                required: "required",
              })}
              className={`form-control input-text w-100 ${styles.input}`}
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <span role="alert" className="text-danger">
                {errors.first_name.message}
              </span>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
            <label htmlFor="last_name" className={`form-label`}>
              Last Name
            </label>
            <input
              {...register("last_name", {
                required: "required",
              })}
              type="text"
              className={`form-control input-text w-100 ${styles.input}`}
              id="last_name"
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <span role="alert" className="text-danger">
                {errors.last_name.message}
              </span>
            )}
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="email" className={`form-label`}>
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
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
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "required",
              })}
              className={`form-control w-100 input-text ${styles.input}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span role="alert" className="text-danger">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirm_password", {
                required: "required",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Password mismatch";
                  }
                },
              })}
              className={`form-control input-text w-100 ${styles.input}`}
              placeholder="Enter your password"
            />
            {errors.confirm_password && (
              <span role="alert" className="text-danger">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
        </div>
        <input type={"submit"} {...{ disabled: isLoading }} value={`${isLoading ? "Loading...." : "Sign Up"}`} className={`btn btn-success w-50 ${styles.login_btn}`} />
        {/* {!isRegister && (
          <div className="col-12">
            <div className="row d-flex flex-column pt-2 pt-sm-2 pt-md-2 pt-lg-2 pt-xl-2 justify-content-center align-items-center">
              <div className={`col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 d-flex flex-row justify-content-center align-items-center`}>
                <hr className="w-50" />
                <small className="small">Or</small>
                <hr className={`w-50`} />
              </div>
              <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-row justify-content-between mt-4 mt-sm-4 mt-md-4 mt-lg-4 mt-xl-4`}>
                <Link href={`#`} onClick={(event)=>{event.preventDefault();}} className={`btn btn-primary ${styles.social_buttons} text-dark`}>
                  <FcGoogle size={18} /> <span className="d-none d-sm-none d-md-none d-lg-block d-xl-block">Continue with Google</span>
                </Link>
                <Link href={`#`} onClick={(event)=>{event.preventDefault();}} className={`btn btn-primary ${styles.social_buttons} text-dark`}>
                  <FaFacebookF size={18} color={"blue"} /> <span className="d-none d-sm-none d-md-none d-lg-block d-xl-block">Continue with Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </form>
  );
};

export default RegisterForm;

import { CONFIRM_EMAIL, EMAIL_LOGIN, FACEBOOK_LOGIN } from "@/constants/constants";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "@/styles/login.module.css";
import { FaFacebookF } from "react-icons/fa";
import { BiChevronLeft } from "react-icons/bi";

const LoginForm = ({ title, setIsRegister, register, onSubmit, style, msg, errors, isLoading, onLoginProvider,onChange }) => {
  return (
    <div className="row d-flex flex-column justify-content-center align-items-center">
      <div className="col-12 position-relative d-block d-sm-block d-md-block d-lg-none d-xl-none mb-5">
        <Link href={"/"} className={`nav-link ${styles.back_button}`}>
          <BiChevronLeft size={25} /> Back
        </Link>
      </div>
      <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-column justify-content-center align-items-center`}>
        {!setIsRegister && <h5 className="h5 fw-bold">{title ?? "Login"}</h5>}
        {!setIsRegister && <h6 className="h6 ktn-text-primary">{"Login to your account"}</h6>}

        <div className={`row ${!setIsRegister ? "pt-3" : ''}`}>
          {msg && style && <div className={`${style}`}>{msg}</div>}
          <div className="mb-3">
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`form-control input-text w-100 ${styles.input}`}
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span role="alert" className="text-danger">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div className={`${setIsRegister ? 'col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7' : 'col-12'} pb-5 d-flex flex-row justify-content-between`}>
          <div className="form-check d-flex flex-row align-items-center">
            <input className="form-check-input me-2" type="checkbox" {...register("remember_me")} value="" id="remember_me" required />
            <label className={`form-check-label ${styles.label}`} htmlFor="remember_me">
              Keep me logged in
            </label>
          </div>
          <Link className={`nav-link ${styles.label}`} href={`#`} onClick={(event)=>{event.preventDefault(); onChange && onChange(CONFIRM_EMAIL)}}>
            Forgot your password?
          </Link>
        </div>
        <div className={`col-12 ${!title && "pb-5 pb-sm-5 pb-md-3 pb-lg-2 pb-xl-2"} d-flex flex-row justify-content-center`}>
          <input
            type={"submit"}
            onClick={onSubmit}
            disabled={isLoading}
            value={`${isLoading ? "Processing" : "Log In"}`}
            className={`btn btn-success w-50 ${styles.login_btn}`}
          />
        </div>
        {/* {!setIsRegister && (
          <div className="col-12">
            <div className="row d-flex flex-column pt-2 pt-sm-2 pt-md-2 pt-lg-2 pt-xl-2 justify-content-center align-items-center">
              <div className={`col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 d-flex flex-row justify-content-center align-items-center`}>
                <hr className="w-50" />
                <small className="small">Or</small>
                <hr className={`w-50`} />
              </div>
              <div className={`col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex flex-row justify-content-between mt-4 mt-sm-4 mt-md-4 mt-lg-0 mt-xl-0`}>
                <Link
                  href={`#`}
                  onClick={(event) => {
                    event.preventDefault();
                    onLoginProvider(EMAIL_LOGIN);
                  }}
                  className={`btn btn-primary ${styles.social_buttons} text-dark`}
                >
                  <FcGoogle size={18} /> <span className="d-none d-sm-none d-md-none d-lg-block d-xl-block">Continue with Google</span>
                </Link>
                <Link
                  href={`#`}
                  onClick={(event) => {
                    event.preventDefault();
                    onLoginProvider(FACEBOOK_LOGIN);
                  }}
                  className={`btn btn-primary ${styles.social_buttons} text-dark`}
                >
                  <FaFacebookF size={18} color={"blue"} /> <span className="d-none d-sm-none d-md-none d-lg-block d-xl-block">Continue with Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LoginForm;

//#region Imports
import Link from "next/link";
import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import AppHead from "@/components/Layout/Head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { CONFIRM_EMAIL, CONFIRM_OTP, CREATE_PASSWORD, EMAIL_LOGIN, FACEBOOK_LOGIN, LOGIN } from "@/constants/constants";
import LoginForm from "@/components/Account/LoginForm";
import Image from "next/image";
import ConfirmEmail from "@/components/Account/RecoverPassword/ConfirmEmail";
import ConfirmOTP from "@/components/Account/RecoverPassword/ConfirmOTP";
import CreatePassword from "@/components/Account/RecoverPassword/CreatePassword";
import { initializePasswordReset, resetPassword, verifyPasswordResetOTP } from "@/services/account.service";
//#endregion

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const [component, setComponent] = useState(LOGIN);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading((value) => !value);
    let result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });
  
    if (result.ok) {
      setMsg("Success");
      setStyle("alert alert-success");
      router.push("/profile");
      return;
    }
    setMsg("Invalid login attempt!");
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
  };

  const onLoginProvider = async (type) => {
    setMsg("");
    setStyle("");
    switch (type) {
      case EMAIL_LOGIN:
        await signIn(EMAIL_LOGIN);
        return;
      case FACEBOOK_LOGIN:
        await signIn(FACEBOOK_LOGIN);
    }
  };

  const onChange = (value) => {
    setMsg("");
    setStyle("");
    setComponent(value);
  };

  const onConfirmEmail = async (data) => {
    setIsLoading((value) => !value);
    setMsg("");
    setStyle("");
    let result = await initializePasswordReset(data.email);
    if (result.success) {
      setToken(result?.session_token);
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsLoading((value) => !value);
      setComponent(CONFIRM_OTP);
      setTimeout(() => {
        setMsg("");
        setStyle("");
        setComponent(CONFIRM_OTP);
      }, 1000);
      return;
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
    return;
  };

  const onConfirmOTP = async (data) => {
    setIsLoading((value) => !value);
    setMsg("");
    setStyle("");
    data.access_token = token;
    let result = await verifyPasswordResetOTP(data);
    if (result.success) {
      setToken(result.data?.token);
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsLoading((value) => !value);
      setComponent(CREATE_PASSWORD);
      setTimeout(() => {
        setMsg("");
        setStyle("");
        setComponent(CREATE_PASSWORD);
      }, 1000);
      return;
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
    return;
  };

  const onCreatePassword = async (data) => {
    setIsLoading((value) => !value);
    setMsg("");
    setStyle("");
    data.access_token = token;
    let result = await resetPassword(data);
    if (result.success) {
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsLoading((value) => !value);
      setComponent(LOGIN);
      setTimeout(() => {
        setMsg("");
        setStyle("");
        setComponent(LOGIN);
      }, 1000);
      return;
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
    return;
  };

  return (
    <>
      <AppHead title={"Login"} />
      <div className={`container my-0 ${styles.login_container}`}>
        <div className={`row p-0 p-sm-0 p-md-0 p-lg-4 p-xl-4`}>
          <div className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 d-none d-sm-none d-md-none d-lg-block d-xl-block ${styles.login}`}>
            <div className={`col-12 d-flex flex-column justify-content-between ${styles.left_container}`}>
              <Link href={"/"}>
                <Image priority height={25} width={25} alt={"image"} src={`/assets/images/ktn-logo.png`} className={`mt-3 ms-3 ${styles.logo}`} />
              </Link>
              <div className={`col-9 d-flex flex-column justify-content-center mx-auto`}>
                <small className="small ktn-text-primary">Welcome Back!</small>
                <h2 className="h2 text-uppercase text-white">kingdom tv</h2>
                <small className="small text-white">
                  Welcoming Promote biblical values, empower God's children worldwide, and commit to transforming lives with a message of faith, hope, and love.
                </small>
              </div>
              <small className={`small text-white me-3 mb-3 ${styles.signup}`}>
                Don't have an account?
                <Link className={`ktn-text-primary text-inline mx-2`} href="sign-up">
                  Sign Up
                </Link>
                here
              </small>
            </div>
          </div>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 py-5 px-5 px-sm-5 px-md-5 px-lg-5 px-xl-5 d-flex flex-column justify-content-center align-items-center m-auto ${styles.right_login}`}
          >
            {component === LOGIN && (
              <LoginForm
                isLoading={isLoading}
                errors={errors}
                msg={msg}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                style={style}
                onLoginProvider={onLoginProvider}
                onChange={onChange}
              />
            )}
            {component === CONFIRM_EMAIL && (
              <ConfirmEmail
                isLoading={isLoading}
                errors={errors}
                msg={msg}
                onSubmit={handleSubmit(onConfirmEmail)}
                register={register}
                onChange={onChange}
                style={style}
              />
            )}
            {component === CONFIRM_OTP && (
              <ConfirmOTP isLoading={isLoading} errors={errors} msg={msg} onSubmit={handleSubmit(onConfirmOTP)} onChange={onChange} register={register} style={style} />
            )}
            {component === CREATE_PASSWORD && (
              <CreatePassword
                isLoading={isLoading}
                errors={errors}
                msg={msg}
                onSubmit={handleSubmit(onCreatePassword)}
                onChange={onChange}
                register={register}
                style={style}
                watch={watch}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

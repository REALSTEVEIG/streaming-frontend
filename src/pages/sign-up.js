//#region Imports
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/login.module.css";
import AppHead from "@/components/Layout/Head";
import { useForm } from "react-hook-form";
import { createAccount } from "@/services/account.service";
import { useRouter } from "next/router";
import RegisterForm from "@/components/Account/RegisterForm";
import Image from "next/image";
//#endregion

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading((value) => !value);
    let result = await createAccount(data);
    if (result.success) {
      setIsLoading((value) => !value);
      router.push("login");
      return;
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
  };

  return (
    <>
      <AppHead title={"SignUp"} />
      <div className={`container my-0 ${styles.login_container}`}>
        <div className="row p-0 p-sm-0 p-md-0 p-lg-4 p-xl-4">
          <div className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 d-none d-sm-none d-md-none d-lg-block d-xl-block ${styles.login}`}>
            <div className={`col-12 d-flex flex-column justify-content-between ${styles.left_container}`}>
              <Link href={"/"}>
                <Image priority height={41} width={34} alt={"image"} src={`/assets/images/ktn-logo.png`} className={`mt-3 ms-3 ${styles.logo}`} />
              </Link>
              <div className={`col-9 d-flex flex-column justify-content-center mx-auto`}>
                <small className="small ktn-text-primary">Welcome to!</small>
                <h2 className="h2 text-uppercase text-white">kingdom tv</h2>
                <small className="small text-white">
                  Welcoming Promote biblical values, empower God's children worldwide, and commit to transforming lives with a message of faith, hope, and love.
                </small>
              </div>
              <small className={`small text-white me-3 mb-3 ${styles.signup}`}>
                Already have an account?
                <Link className={`ktn-text-primary text-inline mx-2`} href="login">
                  Login
                </Link>
                here
              </small>
            </div>
          </div>
          <div
            className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 py-5 px-5 px-sm-5 px-md-5 px-lg-5 px-xl-5 d-flex flex-column justify-content-center align-items-center ${styles.right_login}`}
          >
            <RegisterForm watch={watch} isLoading={isLoading} errors={errors} msg={msg} onSubmit={handleSubmit(onSubmit)} register={register} style={style} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

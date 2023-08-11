//#region Imports
import { GlobalContext } from "@/context/Provider";
import { contactUs } from "@/services/user.service";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormNext } from "react-icons/gr";
import styles from "./top.module.css";
import { getSectionBanner } from "@/services/settings.service";
import { PAGES } from "@/constants/constants";
//#endregion

const TopSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState("");
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const { user } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const setDefault = () => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("email", user.email);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading((value) => !value);
    let result = await contactUs(data);
    if (result && result.success) {
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsLoading((value) => !value);
      return;
    }
    setMsg(result?.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
  };

  const getBanner = async () => {
    let result = await getSectionBanner(PAGES.CONTACT_BANNER);
    if (result.success) {
      setBanner(result.data?.image_url);
    }
  };
  useEffect(() => {
    getBanner();
  }, []);

  useEffect(() => {
    setDefault();
  }, []);

  return (
    <section
      style={{
        background: `url("${banner ? banner : "/assets/images/partnership.png"}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={`row ${styles.section}`}
    >
      <div className={`col-12`}>
        <div className={`row p-0 p-sm-0 p-md-3 p-lg-5 p-xl-5 ${styles.overlay}`}>
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <div
              className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4 pt-2 pt-sm-2 pt-md-3 pt-lg-5 pt-xl-5 px-2 px-sm-2 px-md-3 px-lg-5 px-xl-5 d-flex flex-column justify-content-center align-items-center`}
            >
              <h4 className={`h4 text-white fw-bold text-uppercase`}>Contact Us</h4>
              <small className="small text-white">Talk with the KTN customer care service. </small>
              <hr className="text-white my-2 border border-1" />
            </div>
            <div className={`col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 py-3 px-5 ${styles.form_section}`}>
              {!isLoading && msg && style && <div className={`${style}`}>{msg}</div>}
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="form-check form-check-inline mb-3">
                    <input className="form-check-input" type="checkbox" {...register("isPrayerRequest")} />
                    <label className="form-check-label ktn-text-primary" htmlFor="isPrayerRequest">
                      Prayer Request
                    </label>
                  </div>
                </div>
                <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <label htmlFor="first_name" className="form-label ktn-text-primary">
                    First Name
                  </label>
                  <input type="text" {...register("first_name", { required: "required" })} className="form-control" />
                  {errors.first_name && (
                    <span role="alert" className="text-danger small">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <label htmlFor="last_name" className="form-label ktn-text-primary">
                    Last Name
                  </label>
                  <input type="text" className="form-control" {...register("last_name")} />
                </div>
                <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <label htmlFor="first_name" className="form-label ktn-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <span role="alert" className="text-danger small">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-3 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <label htmlFor="subject" className="form-label ktn-text-primary">
                    Subject
                  </label>
                  <input type="text" className="form-control" {...register("subject", { required: "required" })} />
                  {errors.subject && (
                    <span role="alert" className="text-danger small">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label ktn-text-primary">
                    Message
                  </label>
                  <textarea className="form-control" {...register("message", { required: "required" })} id="message" rows="3"></textarea>
                  {errors.message && (
                    <span role="alert" className="text-danger small">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <div className="text-end">
                  <button type="submit" disabled={isLoading} className="btn btn-primary">
                    {isLoading ? "Processing..." : "SEND"} {!isLoading && <GrFormNext />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;

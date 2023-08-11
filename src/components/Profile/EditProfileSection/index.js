//#region Imports
import { SUBSCRIPTION, TRANSACTIONS } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import { changePassword } from "@/services/account.service";
import { getCountries } from "@/services/helpers.service";
import { getAuthorizedUser, updateUser } from "@/services/user.service";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

//#endregion

const EditProfileSection = ({ setIsEdit, setIsTransactions, setIsSubscriptions, setIsProfile }) => {
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfile, setEditProfile] = useState(false);
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const [countries, setCountries] = useState([]);
  const { user, setUser } = useContext(GlobalContext);

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getAllCountries = async () => {
    let result = await getCountries();
    setCountries(result.data);
  };

  const onSubmitProfile = async (data) => {
    setIsLoading(true);
    setEditProfile(true);
    
    data.image = data.image[0];
    let formData = new FormData()
    for (let item of Object.keys(data)) {
      formData.append(`${item}`, data[`${item}`])
    }
  
    let result = await updateUser(formData);
    // console.log("Update Result :>>>>>>>>>>>>", result);
    if (result && result.success) {
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsEdit((value) => !value);
      let new_records = await getAuthorizedUser();
      // console.log("New Records :>>>>>>>>>>>>>", new_records);
      if(new_records.success){
        setUser({ ...new_records?.data });
        setIsLoading(false);
        setEditProfile(false);
        router.push("/");
        return;
      }
      setIsLoading(false);
      setEditProfile(false);
      router.push("/");
      return;
    }
    
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsEdit((value) => !value);
    setIsLoading(false);
  };

  const onSubmitPassword = async (data) => {
    console.log("submit button!!")
    setIsLoading(true);
    setEditProfile(false);
    let result = await changePassword(data);
    result = result.data;
    if (result && result.success) {
      setMsg(result.message);
      setStyle("alert alert-success");
      setIsEdit(false);
      setIsLoading(false);
      return;
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsEdit(false);
    setIsLoading(false);
  };

  const setDefault = () => {
    for (const key in user) {
      if (key !== "image") {
        if (key == "_id") setValue("user_id", user[key]);
        else setValue(key, user[key]);
      }
    }
  };

  useEffect(() => {
    getAllCountries();
    setDefault();
  }, []);

  return (
    <>
      <div className="row my-4">
        <div className={`col-12 px-5 d-flex flex-row justify-content-end`}>
          <Link
            href={`#`}
            onClick={(event) => {
              event.preventDefault();
              setIsSubscriptions(SUBSCRIPTION);
              setIsEdit(null);
              setIsProfile(null);
              setIsTransactions(null);
            }}
            className="btn btn-primary border text-white px-4"
          >
            Subscriptions
          </Link>
          <Link
            href={`#`}
            onClick={(event) => {
              event.preventDefault();
              setIsTransactions(TRANSACTIONS);
              setIsEdit(null);
              setIsProfile(null);
              setIsSubscriptions(null);
            }}
            className="btn btn-primary border text-white bg-dark px-4"
          >
            Payments
          </Link>
        </div>
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-sm-12 col-md-10 col-lg-7 col-xl-7">
          <div className="row">
            <form onSubmit={handleSubmit(onSubmitProfile)} className="col-12">
              {isEditProfile && msg && style && <div className={`${style}`}>{msg}</div>}
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>01</span>
                    Basic Info
                  </h6>
                </div>
                <div className="card-body pt-0">
                  <div className={`row ms-lg-5 ${styles.card}`}>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9`}>
                      <div className="row justify-content-between">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <select
                              {...register("title", {
                                required: "required",
                              })}
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                            >
                              <option defaultValue={0}>Select Gender</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Dr.">Dr.</option>
                              <option value="Revd.">Revd.</option>
                              <option value="Prof.">Prof.</option>
                            </select>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="title">
                              Title
                            </label>
                          </div>
                          {errors.title && (
                            <span role="alert" className="text-danger small">
                              {errors.title.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...register("first_name", {
                                required: "required",
                              })}
                              placeholder={user?.first_name}
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="first_name">
                              First Name
                            </label>
                          </div>
                          {errors.first_name && (
                            <span role="alert" className="text-danger small">
                              {errors.first_name.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                              {...register("last_name", {
                                required: "required",
                              })}
                              placeholder="Last Name"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="last_name">
                              Last Name
                            </label>
                          </div>
                          {errors.last_name && (
                            <span role="alert" className="text-danger small">
                              {errors.last_name.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="date"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                              {...register("birth_date", {
                                required: "required",
                              })}
                              placeholder="Birth Date"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="birth_date">
                              Birth Date
                            </label>
                          </div>
                          {errors.birth_date && (
                            <span role="alert" className="text-danger small">
                              {errors.birth_date.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <select
                              {...register("gender", {
                                required: "required",
                              })}
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                            >
                              <option defaultValue={0}>Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="gender">
                              Gender
                            </label>
                          </div>
                          {errors.gender && (
                            <span role="alert" className="text-danger small">
                              {errors.gender.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <select
                              {...register("marital_status", {
                                required: "required",
                              })}
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                            >
                              <option defaultValue={0}>Select Status</option>
                              <option value="Married">Married</option>
                              <option value="Single">Single</option>
                              <option value="Divorced">Divorced</option>
                            </select>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="marital_status">
                              Civil Status
                            </label>
                          </div>
                          {errors.marital_status && (
                            <span role="alert" className="text-danger small">
                              {errors.marital_status.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <select
                              {...register("country_of_origin", {
                                required: "required",
                              })}
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                            >
                              <option defaultValue={0}>Select</option>
                              {countries?.map((item, index) => {
                                return (
                                  <option key={index.toString()} value={item.name.common}>
                                    {item.name.common}
                                  </option>
                                );
                              })}
                            </select>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="country_of_origin">
                              Country of Origin
                            </label>
                          </div>
                          {errors.country_of_origin && (
                            <span role="alert" className="text-danger small">
                              {errors.country_of_origin.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <select
                              {...register("country_of_residence", {
                                required: "required",
                              })}
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                            >
                              <option defaultValue={0}>Select</option>
                              {countries?.map((item, index) => {
                                return (
                                  <option key={index.toString()} value={item.name.common}>
                                    {item.name.common}
                                  </option>
                                );
                              })}
                            </select>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="country_of_residence">
                              Country of Residence
                            </label>
                          </div>
                          {errors.country_of_residence && (
                            <span role="alert" className="text-danger small">
                              {errors.country_of_residence.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...register("city", {
                                required: "required",
                              })}
                              placeholder="City"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="city">
                              City
                            </label>
                          </div>
                          {errors.city && (
                            <span role="alert" className="text-danger small">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...register("zip_code", {
                                required: "required",
                              })}
                              placeholder="Zip Code"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="zip_code">
                              Zip Code
                            </label>
                          </div>
                          {errors.zip_code && (
                            <span role="alert" className="text-danger small">
                              {errors.zip_code.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <textarea
                              type="text"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...register("address", {
                                required: "required",
                              })}
                              placeholder="Address"
                            ></textarea>
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="address">
                              Address
                            </label>
                          </div>
                          {errors.address && (
                            <span role="alert" className="text-danger small">
                              {errors.address.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="file"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...register("image")}
                              placeholder="Profile Picture"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="image">
                              Profile Image
                            </label>
                          </div>
                          {errors.image && (
                            <span role="alert" className="text-danger small">
                              {errors.image.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3`}>
                      <input className={`btn btn-secondary btn-sm bg-dark small px-4`} type="submit" value={`${isLoading && isEditProfile ? "Loading..." : "Save"}`} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="col-12">
              {!isEditProfile && msg && style && <div className={`${style}`}>{msg}</div>}
              <div className="card bg-transparent border-0">
                <div className="card-header border-0 bg-transparent">
                  <h6 className="small fw-bold">
                    <span className={`text-white me-3 ${styles.outerDisc}`}>02</span>
                    Security
                  </h6>
                </div>
                <div className="card-body">
                  <div className={`row ms-lg-5 ${styles.card}`}>
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9`}>
                      <div className="row justify-content-between">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="password"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small} ${styles.form_control}`}
                              {...passwordRegister("old_password", {
                                required: "required",
                              })}
                              placeholder="Password"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="old_password">
                              Old Password
                            </label>
                          </div>
                          {passwordErrors.old_password && (
                            <span role="alert" className="text-danger small">
                              {passwordErrors.old_password.message}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                          <div className="form-floating">
                            <input
                              type="password"
                              className={`form-control border border-top-0 border-start-0 border-end-0 small ${styles.btn_small}`}
                              {...passwordRegister("new_password", {
                                required: "required",
                              })}
                              placeholder="New Password"
                            />
                            <label className={`${styles.small} ktn-text-primary`} htmlFor="new_password">
                              New Password
                            </label>
                          </div>
                          {passwordErrors.new_password && (
                            <span role="alert" className="text-danger small">
                              {passwordErrors.new_password.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3`}>
                      <input className={`btn btn-secondary btn-sm bg-dark small px-4`} type="submit" value={`${isLoading && !isEditProfile ? "Loading..." : "Save"}`} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileSection;

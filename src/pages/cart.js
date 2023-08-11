//#region Imports
import LoginForm from "@/components/Account/LoginForm";
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import Confirmation from "@/components/Payment/Confirmation";
import PaymentInfo from "@/components/Payment/PaymentInfo";
import ShoppingCart from "@/components/Payment/ShoppingCart";
import TopSection from "@/components/Payment/TopSection";
import { CONFIRMATION, MAKE_PAYMENT, EMAIL_LOGIN, FACEBOOK_LOGIN, PAYMENT_PROCESS, SHOPPING_CART } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import { getAuthorizedUser, getUserActiveCart } from "@/services/user.service";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RegisterForm from "@/components/Account/RegisterForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AccountWrapper from "@/components/Payment/AccountWrapper";
import { createAccount } from "@/services/account.service";
import { signIn } from "next-auth/react";
import { removeFromCart, saveToCart } from "@/services/cart.service";
const stripePromise = loadStripe("pk_live_51MBy2uBtrLKS0JgP1cpYhuJK6IE65H7hYRxkikytZUzBJGCkMz9irWa4ktPccjAaONzoRIl36Lt0HwEbihB4e5st00rzTBToSX");
//#endregion

const PaymentProcess = () => {
  const { cart, user, setCart, setUser } = useContext(GlobalContext);
  const [transaction, setTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState(SHOPPING_CART);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    watch,
    formState: { errors: signUpErrors },
  } = useForm();

  const onLogin = async (data) => {
    setIsLoading((value) => !value);
    let result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (result.ok) {
      const activeUser = await getAuthorizedUser();
      setUser(activeUser?.data);
      let savedCart = await saveToCart(cart);
      if (savedCart?.success) {
        setCart(savedCart.data);
      }
      setMsg("Success");
      setStyle("alert alert-success");
      onChangeTab(MAKE_PAYMENT);
      return;
    }
    setMsg("Invalid login attempt!");
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
    return;
  };

  const onRegister = async (data) => {
    setIsLoading((value) => !value);
    let result = await createAccount(data);
    if (result.success) {
      let login = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: `${window.location.origin}`,
      });
      if (login.ok) {
        const activeUser = await getAuthorizedUser();
        setUser(activeUser?.data);
        let savedCart = await saveToCart(cart);
        if (savedCart?.success) {
          setCart(savedCart.data);
        }
        setMsg("Success");
        setStyle("alert alert-success");
        setIsLoading((value) => !value);
        onChangeTab(MAKE_PAYMENT);
        return;
      }
    }
    setMsg(result.message);
    setStyle("alert alert-danger");
    setIsLoading((value) => !value);
    return;
  };

  const onLoginProvider = async (type) => {
    switch (type) {
      case EMAIL_LOGIN:
        await signIn(EMAIL_LOGIN);
        return;
      case FACEBOOK_LOGIN:
        await signIn(FACEBOOK_LOGIN);
    }
  };

  const getCart = async () => {
    if (user) {
      const result = await getUserActiveCart(user._id);
      setCart(result?.data ? result?.data[0] : null);
      setActiveTab(SHOPPING_CART);
    }
  };

  const onRemoveItem = async (item) => {
    if (user) {
      let result = await removeFromCart(item?._id);
      if (result?.success) {
        setCart(result?.data);
        return;
      }
    }
    let items = cart?.items;
    if(item.partnership){
      items = items?.length > 0 ? items.filter((selItem)=>selItem.partnership?._id != item?.partnership?._id) : items;
      cart.items = items;
      setCart({...cart});
      return;
    }
    items = items?.length > 0 ? items?.filter((selItem)=>selItem.partnership) : items;
    cart.items = [...items];
    setCart({...cart});
    return;
  };

  const onAlternative = async () => {
    setIsRegister((value) => !value);
  };

  const onChangeTab = async (tab) => {
    setIsLoading((value) => !value);
    if (!user) setIsRegister((value) => !value);
    switch (tab) {
      case PAYMENT_PROCESS:
        if (!user) setIsRegister((value) => !value);
        break;
      default:
        break;
    }
    setIsLoading((value) => !value);
    setActiveTab(tab);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <AppHead title={"Payment"} />
      <TopSection cart={cart} activeTab={activeTab} onTabChange={onChangeTab} />
      {activeTab === SHOPPING_CART && cart && cart.items && (
        <ShoppingCart isLoading={isLoading} items={cart.items} onTabChange={onChangeTab} onRemoveItem={onRemoveItem} />
      )}
      {activeTab === PAYMENT_PROCESS && cart && cart.items && !user && !isRegister && (
        <AccountWrapper onAlternative={onAlternative} alternative={"Sign Up Instead"} title={"Login to proceed"}>
          <LoginForm
            isLoading={isLoading}
            setIsRegister={setIsRegister}
            errors={errors}
            msg={msg}
            onSubmit={handleSubmit(onLogin)}
            register={register}
            style={style}
            onLoginProvider={onLoginProvider}
          />
        </AccountWrapper>
      )}
      {activeTab === PAYMENT_PROCESS && cart && cart.items && !user && isRegister && (
        <AccountWrapper onAlternative={onAlternative} alternative={"Sign In Instead"} title={"Signup to proceed"}>
          <RegisterForm
            isLoading={isLoading}
            onSubmit={signUpHandleSubmit(onRegister)}
            isRegister={isRegister}
            watch={watch}
            errors={signUpErrors}
            register={signUpRegister}
          />
        </AccountWrapper>
      )}
      {activeTab === MAKE_PAYMENT && cart && cart.items && (
        <Elements stripe={stripePromise}>
          <PaymentInfo setTransaction={setTransaction} onChangeTab={onChangeTab} setIsRegister={setIsRegister} />
        </Elements>
      )}
      {activeTab === CONFIRMATION && transaction && <Confirmation transaction={transaction} />}
    </>
  );
};

const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

PaymentProcess.getLayout = getLayout;

export default PaymentProcess;

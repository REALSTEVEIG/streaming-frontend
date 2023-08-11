//#region Imports
import Layout from "@/components/Layout";
import AppHead from "@/components/Layout/Head";
import GivingForm from "@/components/OnlineGiving/GivingForm";
import TopSection from "@/components/OnlineGiving/TopSection";
import { GlobalContext } from "@/context/Provider";
import { saveToCart } from "@/services/cart.service";
import { addToCart } from "@/services/helpers.service";
import React, { useContext, useState } from "react";
import { Toast } from "react-bootstrap";
//#endregion

const OnlineGiving = () => {
  const { cart, setCart, user } = useContext(GlobalContext);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onAddToCart = async (item) => {
    setIsLoading((value) => !value);
    if (user) {
      let result = await saveToCart({
        items: [
          {
            quantity: 1,
            amount: item,
          },
        ],
      });
      if (result.success) {
        setDescription(`${typeof item !== "object" ? item : item?.name} added to cart`);
        setShow(true);
        setCart(result?.data);
      } else {
        setDescription(result.message);
        setShow(true);
      }
      setIsLoading((value) => !value);
      return;
    }
    let newCart = addToCart(cart, {
      quantity: 1,
      amount: item,
    });
    if (newCart.success) {
      setCart({ ...newCart.data });
    }
    setTimeout(()=>{
      setIsLoading((value) => !value);
    }, 1500)
  };

  return (
    <>
      <AppHead title={"Online Giving"} />
      <TopSection />
      <GivingForm isLoading={isLoading} onAddToCart={onAddToCart} />
      <Toast show={show} onClose={setShow} className="position-absolute top-0 right-0 bg-success">
        <Toast.Body>{description}</Toast.Body>
      </Toast>
    </>
  );
};
const getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

OnlineGiving.getLayout = getLayout;

export default OnlineGiving;

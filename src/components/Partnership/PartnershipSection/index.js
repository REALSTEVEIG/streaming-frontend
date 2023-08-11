//#region Imports
import { GlobalContext } from "@/context/Provider";
import { removeFromCart, saveToCart } from "@/services/cart.service";
import { addToCart } from "@/services/helpers.service";
import React, { useContext, useRef, useState } from "react";
import PartnershipItem from "../PartnershipItem";
import Toast from "react-bootstrap/Toast";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles.module.css";
//#endregion

const PartnershipSection = ({ items }) => {
  const { cart, setCart, user } = useContext(GlobalContext);
  const buttonRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const onAddToCart = async (item) => {
    setIsLoading((value) => !value);
    setSelectedItem(item);
    if (user) {
      let result = await saveToCart({
        items: [
          {
            quantity: 1,
            partnership: item,
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
      handleShowToast();
      return;
    }
    let newCart = addToCart(cart, {
      quantity: 1,
      partnership: item,
    });
    if (newCart.success) {
      setCart({ ...newCart.data });
    }
    setSelectedItem(null);

    setTimeout(() => {
      setIsLoading((value) => !value);
    }, 1000);
  };

  const onRemoveItem = async (item) => {
    setShowToast(true);
    setIsLoading((value) => !value);
    if (user) {
      let selItem = cart?.items?.find((selItem)=>selItem?.partnership?._id == item?._id);
      let result = await removeFromCart(selItem?._id);
      if (result?.success) {
        setCart({...result?.data});
        setIsLoading((value) => !value);
        return;
      }
    }

    let items = cart?.items?.length > 0 ? cart?.items?.filter((selItem) => selItem.partnership?._id != item?._id) : cart?.items;
    cart.items = items;
    setCart({ ...cart });
    setTimeout(() => {
      setIsLoading((value) => !value);
    }, 1000);
    return;
  };

  const sortASC = (a, b) => {
    return a.amount - b.amount;
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  return (
    <>
    {/* <Toast show={showToast} onClose={() => setShowToast(false)} style={{ position: "absolute", top: `${buttonRef.current?.offsetTop - 50}vh` }}>
              <Toast.Body>{description}</Toast.Body>
            </Toast> */}
      <div className="row mx-auto py-5 justify-content-center position-relative">
        <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 m-auto">
          <div className="row">
            
            {items?.sort(sortASC).map((item) => {
              return (
                <PartnershipItem
                  buttonRef={buttonRef}
                  onRemove={onRemoveItem}
                  selectedItem={selectedItem}
                  isLoading={isLoading}
                  onAddToCart={onAddToCart}
                  key={item._id}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="row mx-auto py-5 position-relative justify-content-end me-0 me-sm-0 me-md-4 me-lg-5 me-xl-5">
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 me-0 me-sm-0 me-md-4 me-lg-5 me-xl-5 text-end">
          <Link href={"/cart"} className={`btn btn-secondary bg-dark ${styles.back_button}`}>
            Proceed to Checkout <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PartnershipSection;

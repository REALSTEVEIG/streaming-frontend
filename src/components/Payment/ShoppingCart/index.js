// import {api} from "config"
import { MAKE_PAYMENT, PAYMENT_PROCESS } from "@/constants/constants";
import { GlobalContext } from "@/context/Provider";
import { convertToCurrency, getEuroSign } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
// other imports...


const ShoppingCart = ({ isLoading, onTabChange, items, onRemoveItem }) => {
  const { user } = useContext(GlobalContext);
  const [itemQuantities, setItemQuantities] = useState([]);

  useEffect(() => {
    setItemQuantities(items.map(item => item.quantity));
  }, [items]);

  const handleQuantityChange = async (index, newQuantity) => {
    const updatedQuantities = [...itemQuantities];
    updatedQuantities[index] = newQuantity;
    setItemQuantities(updatedQuantities);

    try {
      const cartItemId = items[index]?._id;

      if (!cartItemId) {
        throw new Error("Cart item ID not found");
      }

      const response = await axios.get(`http://localhost/cart-qaunt/${cartItemId}/${newQuantity}`);

      if (response.data.success) {
        console.log("Cart item updated successfully");
      } else {
        console.log("Error updating cart item:", response);
      }
    } catch (error) {
      console.log("An error occurred while updating cart item:", error);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((accumulator, currentValue, index) => {
      const itemQuantity = itemQuantities[index];
      const itemPrice = currentValue?.partnership?.amount || currentValue?.amount;
      return accumulator + Number(itemQuantity) * Number(itemPrice);
    }, 0);
  };

  return (
    <div className="row justify-content-center py-5">
      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <div className="card border-0">
                  <div className="card-header">
                    <small className="small ktn-text-primary fw-bold">01 Offering List</small>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th className="small text-uppercase">ITEM</th>
                          <th className="small text-uppercase">Description</th>
                          <th className="small text-uppercase">AMOUNT</th>
                          <th className="small text-uppercase text-center">Quantity</th>
                          <th className="small text-uppercase">Total</th>
                          <th className="small text-uppercase"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          const itemIndex = index + 1;
                          const itemQuantity = itemQuantities[index];
                          const itemPrice = item?.partnership?.amount || item?.amount;
                          const totalPrice = Number(itemQuantity) * Number(itemPrice);

                          return (
                            <tr key={index}>
                              <td>{itemIndex}</td>
                              <td>
                                {item?.partnership && (
                                  <Image
                                    priority
                                    src={
                                      item?.partnership?.image_url?.includes("http")
                                        ? item?.partnership?.image_url
                                        : `${item?.partnership?.image_url ? "http://" : ""}${item?.partnership?.image_url ?? "/assets/icons/logo-knt-blue.png"}`
                                    }
                                    alt="image"
                                    width={25}
                                    height={30}
                                  />
                                )}
                              </td>
                              <td className="small text-muted">{`${item?.partnership?.name ? item?.partnership?.name + " Partnership" : "Online Giving"}`}</td>
                              <td className="small text-muted">{`${getEuroSign()}${convertToCurrency(itemPrice)}`}</td>
                              <td className="small text-muted text-center">
                                <button onClick={() => handleQuantityChange(index, itemQuantity - 1)}>-</button>
                                {itemQuantity !== undefined ? itemQuantity : 1}
                                <button onClick={() => handleQuantityChange(index, itemQuantity + 1)}>+</button>
                              </td>
                              <td className="small text-muted">{`€${totalPrice}`}</td>
                              <td>
                                <Link
                                  onClick={(event) => {
                                    event.preventDefault();
                                    onRemoveItem(item);
                                  }}
                                  className="small text-danger text-center"
                                  href={"#"}
                                >
                                  <FaTimes />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="card bg-light border-0">
                  <div className="card-header">
                    <small className="small ktn-text-primary fw-bold">Summary</small>
                  </div>
                  <div className="card-body">
                    <table className="table w-100">
                      <tbody>
                        <tr>
                          <th className="small py-2 text-muted">Sum-Total</th>
                          <td className="small py-2 text-end">{`${getEuroSign()}${convertToCurrency(getTotalPrice())}`}</td>
                        </tr>
                        <tr>
                          <th className="small py-2">Total</th>
                          <td className="small py-2 text-end">{`${getEuroSign()}${convertToCurrency(getTotalPrice())}`}</td>
                        </tr>
                        <tr>
                          <td className="pt-5 pb-3" colSpan={2}>
                            <button
                              type="button"
                              disabled={isLoading || items?.length <= 0}
                              onClick={() => {
                                onTabChange(user ? MAKE_PAYMENT : PAYMENT_PROCESS);
                              }}
                              className="btn btn-primary bg-dark py-1 px-5 w-100"
                            >
                              {`${isLoading ? "Loading..." : "Proceed to Payment"}`}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

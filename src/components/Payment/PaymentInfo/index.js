import { CONFIRMATION } from "@/constants/constants";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { GlobalContext } from "@/context/Provider";
import { convertToCurrency, getEuroSign } from "@/core/helpers";
import { createPaymentIntent, saveTransaction } from "@/services/partnerships.service";
import { useRouter } from "next/router";
//#endregion

const PaymentInfo = ({ setTransaction, onChangeTab, isRegister, setIsRegister }) => {
  const router = useRouter();
  const { cart, user, setCart } = useContext(GlobalContext);
  const [intent, setIntent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (cart) {
    router.push("/cart");
    }
  }, [])

  useEffect(() => {
    if (cart) {
      getPaymentIntent();
    }
  }, [cart]);

  const getPaymentIntent = async () => {
    setIsLoading(true);

    let amount = calculateTotalPayment();
    let message = "Payment for";
    for (let item of cart.items) {
      if (item.partnership) {
        message += ` ${item.partnership.name},`;
      } else {
        message += ` ${getEuroSign()}${item.amount} Online Giving,`;
      }
    }
    
  
    try {
      const intent = await createPaymentIntent({
        message: message,
        amount: amount,
        cart_id: cart.cart_id,
      });

      if (intent.success) {
        // console.log(`Intent: ${intent.data}`)
        setIntent(intent.data);
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (error) {
      setError("Failed to create payment intent");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPayment = () => {
    return cart.items.reduce((accumulator, item) => {
      if (item.partnership) {
        return Number(accumulator) + Number(item.quantity) * Number(item.partnership.amount);
      }
      return Number(accumulator) + Number(item.quantity) * Number(item.amount);
    }, 0);
  };

  const processPayment = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      setError("Refresh this page and try again");
      return;
    }

    try {
      const payment = await stripe.confirmCardPayment(intent, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardHolderName,
          },
        },
      });

      if (payment.error) {
        throw new Error(payment.error.message);
      }

      if (payment.paymentIntent.status === "succeeded") {
        let message = "Payment for";
        for (let item of cart.items) {
          if (item.partnership) {
            message += ` ${item.partnership.name},`;
          } else {
            message += ` ${getEuroSign()}${item.amount} Online Giving,`;
          }
        }

        const transaction = await saveTransaction({
          cart_id: cart._id,
          transaction_reference: payment.paymentIntent.id,
          amount: Number(payment.paymentIntent.amount) / 100,
          status: payment.paymentIntent.status,
          narration: payment.paymentIntent.description || message,
        });

        if (transaction.success) {
          setTransaction(transaction.data);
          setMsg("Payment successful");
          setStyle("alert alert-success");
          setCart(null);
          onChangeTab(CONFIRMATION);
        } else {
          throw new Error("Failed to save transaction");
        }
      } else {
        throw new Error("Error processing payment. Please try again.");
      }
    } catch (error) {
      setError("Error processing payment. Please try again: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  return (
    <div className={`row justify-content-center ${!isRegister && "py-5"}`}>
      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="card border-0">
                  <div className="card-header bg-transparent border-0">
                    <small className="small ktn-text-primary fw-bold">
                      <span className={`${styles.disc} ${styles.activeDisc}`}>01</span>
                      Billing Info
                    </small>
                  </div>
                  <div className="card-body table-responsive">
                    <div className="row">
                      <div className="col-12 py-4">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Total Payment</td>
                              <td>
                                {`${getEuroSign()}${convertToCurrency(calculateTotalPayment())}`}
                              </td>
                            </tr>
                            <tr>
                              <td>First Name</td>
                              <td>{user?.first_name}</td>
                            </tr>
                            <tr>
                              <td>Last Name</td>
                              <td>{user?.last_name}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{user?.email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={processPayment} className={`col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ${styles.rightCard}`}>
                <div className="card border-0">
                  <div className="card-header">
                    <small className="small ktn-text-primary fw-bold">
                      <span className={`${styles.disc} ${styles.activeDisc}`}>02</span>
                      Credit Card Info
                    </small>
                  </div>
                  <div className="card-body">
                    {style && msg && <div className={`${style}`}>{msg}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                      <div className="col-12 py-4">
                        <div className="mb-3">
                          <label htmlFor="card_holder_name" className="form-label ktn-text-primary">
                            Card Holder's Name
                          </label>
                          <input
                            type="text"
                            className="form-control border-0"
                            id="card_holder_name"
                            placeholder="Card Holder's Name"
                            value={cardHolderName}
                            onChange={handleCardHolderNameChange}
                          />
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <div className="mb-3">
                              <label htmlFor="card_holder_name" className="form-label ktn-text-primary">
                                Card Details
                              </label>
                              <CardElement
                                options={{
                                  style: {
                                    base: {
                                      fontSize: "16px",
                                      color: "#424770",
                                      "::placeholder": {
                                        color: "#aab7c4",
                                      },
                                    },
                                    invalid: {
                                      color: "#9e2146",
                                    },
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button type="submit" className="btn btn-primary btn-lg w-100" disabled={!stripe || isLoading}>
                      {isLoading ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;

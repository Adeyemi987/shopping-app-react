import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { useHistory } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

const getReference = () => {
  //you can put any unique reference implementation code here
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

  for (let i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

function PaystackCheckout() {
  const [succeeded, setSucceeded] = useState(false);
  const { total_amount, shipping_fee, clearCart } = useCartContext();
  const history = useHistory();

  const { myUser } = useUserContext();
  let config;
  if (myUser)
    config = {
      reference: getReference(),
      email: myUser.email,
      amount: total_amount + shipping_fee,
      publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status === "success" && reference.message === "Approved") {
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        history.push("/");
      }, 10000);
    }
  };
  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay with PayStack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="bts">
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(total_amount + shipping_fee)}</p>
        </article>
      )}
      <PaystackButton {...componentProps} />
    </div>
  );
}

export default PaystackCheckout;

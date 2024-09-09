import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Your cart is empty <span>😕</span>
      </h2>
      <p>
        It seems you haven't ordered any pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;

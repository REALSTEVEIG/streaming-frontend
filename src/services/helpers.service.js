import axios from "axios";

export const getCountries = async () => {
  return await axios.get("https://restcountries.com/v3.1/all");
};

export const addToCart = (cart, item) => {
  let items = cart?.items ?? [];
  if (!items?.length) {
    cart.items?.push(item);
    return {
      success: true,
      error: false,
      message: "Added to cart",
      data: cart,
    };
  }

  let partnership = items && items.length > 0 ? items.find((saved_item) => saved_item?.partnership?._id === item?.partnership?._id) : null;
  if (partnership) {
    partnership.quantity = Number(item?.quantity ? item?.quantity : 0) + Number(partnership.quantity ? partnership.quantity : 0);
    let index = items.findIndex((obj) => obj?.partnership?._id === partnership._id);
    items[index] = { ...partnership };
    cart.items = [...items];
    return {
      success: true,
      error: false,
      message: "Added to cart",
      data: cart,
    };
  }

  if (item?.partnership?._id && items.length > 0) {
    items.push(item);
    cart.items = [...items];
    return {
      success: true,
      error: false,
      message: "Added to cart",
      data: cart,
    };
  }

  let offering = items && items.length > 0 ? items.find((saved_item) => !saved_item.partnership) : null;

  if (offering) {
    if (isNaN(item.amount))
      return {
        success: false,
        error: true,
        message: "Invalid amount",
      };
    offering.amount = Number(item.amount ?? 0) + Number(offering.amount);
    let index = items.findIndex((saved_item) => !saved_item._id);
    items[index] = { ...offering };
    cart.items = [...items];
    return {
      success: true,
      error: false,
      message: "Added to cart",
      data: cart,
    };
  }
  cart.items && cart.items.length > 0 && cart.items.push(item);
  return {
    success: true,
    error: false,
    message: "Added to cart",
    data: cart,
  };
};

export const addToLocalCart = (item) => {
  if (typeof window !== undefined && typeof window !== "undefined") {
    let cart = getLocalCart();
    let items = cart?.items;
    if (!items) {
      cart = { items: [item] };
      return saveCart(cart);
    }

    let partnership = items && items.length > 0 ? items.find((saved_item) => saved_item._id === item._id) : null;
    if (partnership) {
      partnership.quantity = Number(item.quantity ? item.quantity : 0) + Number(partnership.quantity ? partnership.quantity : 0);
      let index = items.findIndex((obj) => obj._id === partnership._id);
      items[index] = partnership;
      cart.items = items;
      return saveCart(cart);
    }

    if (item._id && items.length > 0) {
      console.log("Before Push :>>>>>>>>>", items);
      items.push(item);
      console.log("After push :>>>>>>>>>>>>>>", items);
      cart.items = items;
      return saveCart(cart);
    }

    let offering = items && items.length > 0 ? items.find((saved_item) => !saved_item._id) : null;
    if (offering) {
      if (isNaN(item.amount))
        return {
          success: false,
          error: true,
          message: "Invalid amount",
        };
      offering.amount = Number(!isNaN(item.amount) ? item.amount : 0) + Number(offering.amount);
      let index = items.findIndex((saved_item) => !saved_item._id);
      items[index] = offering;
      cart.items = items;
      return saveCart(cart);
    }
    cart.items && cart.items.length > 0 && cart.items.push(item);
    return saveCart(cart);
  }
};

export const getLocalCart = () => {
  if (typeof window !== undefined && typeof window !== "undefined") {
    let cart = localStorage.getItem("cart");
    return typeof window !== undefined && cart ? JSON.parse(`${atob(cart)}`) : null;
  }
};

export const saveCart = (cart) => {
  if (typeof window !== undefined && typeof window !== "undefined") {
    localStorage.setItem("cart", btoa(JSON.stringify(cart)));
    return {
      success: true,
      error: true,
      message: "Item added to cart",
    };
  }
};

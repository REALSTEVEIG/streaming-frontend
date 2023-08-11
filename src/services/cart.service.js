const { default: axiosInstance } = require("@/core/axios");

export const saveToCart = async (data) => {
  return await axiosInstance.post(`/cart`, data);
};

export const removeFromCart = async (id) => {
  return await axiosInstance.delete(`/cart-items/${id}`);
};

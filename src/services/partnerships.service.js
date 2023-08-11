const { default: axiosInstance } = require("@/core/axios");

export const getPartnerships = async () => {
  let result = await axiosInstance.get(`/partnerships`);
  return result;
};

export const getPartnershipById = async (id) => {
  if (!id) return { success: false, message: "No partnership selected or not found", data: null };
  let result = await axiosInstance.get(`/partnerships/${id}`);
  return result;
};

export const getUserPartnershipPayments = async ({id, page, size, limit}) => {
  console.log("ID, Page, Size, Limit :>>>>>>>>>>>>>", id, page, size, limit);
  let result = await axiosInstance.get(`/partnership-payments?user_id=${id}&page=${page}&size=${size}&limit=${limit}`);
  return result;
};

export const createPaymentIntent = async (data) => {
  let result = await axiosInstance.post(`/initiate-payment`, data);
  return result;
};

export const saveTransaction = async (data) => {
  let result = await axiosInstance.post(`/partnership-payments`, data);
  return result;
};

export const getUserPartnershipSubscriptions = async (id) => {
  console.log("Data :>>>>>>>>>>>>>>>>", id);
  let result = await axiosInstance.get(`/partnership-subscriptions/${id}`);
  console.log("Result :>>>>>>>>>>>>>>>>", result);
  return result;
};

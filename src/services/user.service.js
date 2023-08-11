import axiosInstance from "@/core/axios";

export const signIn = async (data) => {
  console.log("frontend....");
  console.log(data);
  if (!data || !data.email || !data.password) return { success: false, message: "Incorrect username or password", data: null };
  const da = await axiosInstance.post("/authenticate", data);
  return da;
};

export const updateUser = async (data) => {
  if (!data) return { success: false, message: "Unable to update data.", data: null };
  console.log("DATA,:",data);
  let result = await axiosInstance.patch(`/users`, data);
  return result;
};

export const getAuthorizedUser = async () => {
  let user = await axiosInstance.get(`/authorized-user`);
  if (user.success) {
    return user;
  }
  return null;
};

export const contactUs = async (data) => {
  let result = await axiosInstance.post(`/contact-us`, data);
  return result;
};

export const getUserCart = async (id) => {
  let result = await axiosInstance.get(`/cart?user_id=${id}`);
  return result;
};

export const getUserActiveCart = async (id) => {
  let result = await axiosInstance.get(`/cart?user_id=${id}&active=${true}`);
  return result;
};

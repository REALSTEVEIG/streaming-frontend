import axiosInstance from "@/core/axios";

export const createAccount = async (data) => {
  if (!data || !data.first_name || !data.last_name) return { success: false, message: "All fields are required", data: null };
  let result = await axiosInstance.post("/users", data);
  return result;
};

export const changePassword = async (data) => {
  if (!data || !data.old_password || !data.new_password) return { success: false, message: "All fields are required", data: null };
  return await axiosInstance.post("/change-password", data);
};

export const initializePasswordReset = async (email) => {
  if (!email) return { success: false, message: "Invalid email address.", data: null };
  let result = await axiosInstance.post(`/request-password-reset`, { email });
  return result;
};
export const verifyPasswordResetOTP = async (data) => {
  if (!data.otp) return { success: false, message: "Invalid OTP.", data: null };
  let result = await axiosInstance.post(`/confirm-password-reset`, {otp: data.otp}, { headers: { Authorization: data.access_token } });
  return result;
};
export const resetPassword = async (data) => {
  if (!data.password) return { success: false, message: "Invalid password.", data: null };
  let result = await axiosInstance.post(`/reset-password`, {password: data.password}, { headers: { Authorization: data.access_token } });
  return result;
};

import axiosInstance from "@/core/axios";

export const getSectionBanner = async (section) => {
  let result = await axiosInstance.get(`/settings-active/${section}`);
  return result;
};

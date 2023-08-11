const { default: axiosInstance } = require("@/core/axios");

export const getPosts = async ({page=0, size=9, limit=9}) => {
  let result = await axiosInstance.get(`/posts?page=${page}&size=${size}&limit=${limit}`);
  return result;
};

export const getCategoryPosts = async ({id,page=0, size=12, limit=12}) => {
  let result = await axiosInstance.get(`/posts?category_id=${id}&size=${size}&page=${page}&limit=${limit}`);
  return result;
};

export const getPostDetails = async (id) => {
  let result = await axiosInstance.get(`/posts/${id}`);
  return result;
};

export const getAllCategories = async () => {
  let result = await axiosInstance.get(`/categories`);
  return result;
};

export const getUpcomingEvents = async ({page=0, size=4, limit=4}) => {
  let result = await axiosInstance.get(`/posts?upcoming=${true}&size=${size}&page=${page}&limit=${limit}`);
  return result;
};

export const getLatestEvents = async ({page=0, size=3, limit=3}) => {
  let result = await axiosInstance.get(`/posts?latest=${true}&size=${size}&page=${page}&limit=${limit}`);
  return result;
};

export const getActiveStreamingEvent = async () => {
  let result = await axiosInstance.get(`/posts?live=${true}&active=${true}`);
  return result;
};

export const getLiveEvents = async ({page=0, size=3, limit=12}) => {
  let result = await axiosInstance.get(`/api/get-all-youtube-streams?page=${page}`);
  return result;
};

export const getAllVideos = async ({page=0, size=3, limit=12}) => {
  let result = await axiosInstance.get(`/posts?videos=${true}&size=${size}&page=${page}&limit=${limit}`);
  return result;
};

export const getAllAdvertisements = async ({page=0, size=3, limit=6}) => {
  let result = await axiosInstance.get(`/advertisement?size=${size}&page=${page}&limit=${limit}`);
  return result;
};

export const getAdvertisementByID = async (id) => {
  let result = await axiosInstance.get(`/advertisement/${id}`);
  return result;
};


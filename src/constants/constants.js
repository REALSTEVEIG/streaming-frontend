export const SHOPPING_CART = "SHOPPING_CART";
export const PAYMENT_PROCESS = "PAYMENT_PROCESS";
export const CONFIRMATION = "CONFIRMATION";
export const MAKE_PAYMENT = "MAKE_PAYMENT";
export const TRANSACTIONS = "TRANSACTIONS";
export const EDIT = "EDIT";
export const PROFILE = "PROFILE";
export const SUBSCRIPTION = "SUBSCRIPTION";

export const PAGES = Object.freeze({
  HOME_PAGE: "Home Banner",
  LIVE_BANNER: "Live Event Banner",
  VIDEOS_BANNER: "Videos Banner",
  PRESS_BANNER: "News Banner",
  ADVERTISEMENT_BANNER: "Adverisement Banner",
  PARTNERSHIP_BANNER: "Partnership Banner",
  OFFERING_BANNER: "Offering Banner",
  CONTACT_BANNER: "Contact Banner",
  PROFILE_BANNER: "Profile Banner",
});

export const MONTHS = [
  {
    _id: "01",
    name: "January",
  },
  {
    _id: "02",
    name: "February",
  },
  {
    _id: "03",
    name: "March",
  },
  {
    _id: "04",
    name: "April",
  },
  {
    _id: "05",
    name: "May",
  },
  {
    _id: "06",
    name: "June",
  },
  {
    _id: "07",
    name: "July",
  },
  {
    _id: "08",
    name: "August",
  },
  {
    _id: "09",
    name: "September",
  },
  {
    _id: "10",
    name: "October",
  },
  {
    _id: "11",
    name: "November",
  },
  {
    _id: "12",
    name: "December",
  },
];
export const DAYS = Array.from(Array(31).keys());
export const YEARS = () => {
  let years = [];
  let i = 2023;
  while (i < 2030) {
    years.push(i);
    i++;
  }
  return years;
};
export const EMAIL_LOGIN = "email";
export const FACEBOOK_LOGIN = "facebook";

export const CONFIRM_EMAIL="CONFIRM_EMAIL";
export const CONFIRM_OTP="CONFIRM_OTP";
export const LOGIN="LOGIN";
export const CREATE_PASSWORD="CREATE_PASSWORD";

export const NEXT_PAGE = "Next";
export const PREVIOUS = "Previous";
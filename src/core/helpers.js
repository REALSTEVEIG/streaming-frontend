export const toCommaSeparated = (amount) => {
  return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const getDollarSign = () => {
  return "$";
};
export const getEuroSign = () => {
  return "€";
};

export const convertToCurrency = (amount) => {
  const number = Number(amount);
  
  if (isNaN(number)) {
    return "0.00";
  }
  
  const parts = number.toFixed(2).split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1];

  return `${integerPart}.${decimalPart}`;
};


export const getNairaSign = () => {
  return "₦";
};

export const getFormattedDate = (timestamp) => {
  let date = timestamp ? new Date(timestamp) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes();
  let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds().toString() : date.getSeconds();

  let formattedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  return formattedDate;
};

export const getFormattedShortDate = (timestamp) => {
  let date = timestamp ? new Date(!isNaN(timestamp) ? Number(timestamp) : timestamp) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate();

  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

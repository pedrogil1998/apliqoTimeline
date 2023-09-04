//Styling
export const apliqoTangaroa = "#202E39";
export const apliqoAliceBlue = "#F4F9FC";
export const aplicoSummerSky = "#29ABE3";
export const apliqoDenim = "#1E76BC";
export const apliqoDarkOrange = "#FF8900";

//CONSTS
export const modes = {
  VIEW: "VIEW",
  MANAGE: "MANAGE",
};

export const navBar = {
  MAJOR_CLIENTS: "Major Clients",
  GLOBAL_PRESENCE: "Global Presence",
  PRODUCTS: "Products",
  MANAGEMENT: "Management",
};

export const management = {
  MAJOR_CLIENT: "Major Client",
  OFFICE: "Office",
  PRODUCT: "Product",
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//POSITIONAL ARRAY
export const yearlyArray = [
  { top: 9, taken: false },
  { top: 38, taken: false },
  { top: 68, taken: false },
  { top: 38, taken: false },
  { top: 9, taken: false },
  { top: 38, taken: false },
  { top: 68, taken: false },
  { top: 38, taken: false },
  { top: 10, taken: false },
  { top: 38, taken: false },
  { top: 68, taken: false },
  { top: 38, taken: false },
];

//FUNCTIONS
export const createUnselectedItemList = (items) => {
  let newItems = items.map((obj) => {
    return { ...obj, selected: false };
  });
  return newItems;
};

export const handleScrollByIndex = (index, e) => {
  e?.preventDefault();
  //ref.current.parentElement.parentElement.scrollLeft = (index - 1) * 400;
  const element = document.getElementById("card_" + index);
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
};

export const getDateFromObj = (item) => {
  return (
    (item?.cardDateObj &&
      item.cardDateObj.month &&
      new Date(item.cardDateObj.year, " ", item.cardDateObj.month)) ||
    (item?.cardDateObj &&
      item.cardDateObj.year &&
      new Date(item.cardDateObj.year))
  );
};

export const getMaxDate = (items) => {
  const itemsDate = items
    ?.map(function (item) {
      return getDateFromObj(item);
    })
    .filter(Boolean); //removes undefined or falsy values
  const newDate = new Date(Math.max.apply(null, itemsDate));
  return newDate;
};

export const getMinDate = (items) => {
  const itemsDate = items
    ?.map(function (item) {
      return getDateFromObj(item);
    })
    .filter(Boolean); //removes undefined or falsy values
  const newDate = new Date(Math.min.apply(null, itemsDate));
  return newDate;
};

export const percentage = (partialValue, totalValue) => {
  const nPerc = (100 * partialValue) / totalValue;
  const perc = nPerc + "%";
  return perc !== "100%" ? perc : "98%";
};

export const getSelectedFilter = (filter, major, office, product) => {
  if (filter.major && major) {
    return navBar.MAJOR_CLIENTS;
  }
  if (filter.office && office) {
    return navBar.GLOBAL_PRESENCE;
  }
  if (filter.product && product) {
    return navBar.PRODUCTS;
  }
  return false;
};

export const hasFilter = (filter) => {
  if (filter.major || filter.office || filter.product) return true;
};

export const getYearCount = (items) => {
  const maxDate = getMaxDate(items).getUTCFullYear();
  const minDate = getMinDate(items).getUTCFullYear();
  const res = Math.abs(maxDate - minDate);
  return res !== 0 ? res : 1;
};

export const getYearRelativeIndex = (items, year) => {
  const minDate = getMinDate(items).getUTCFullYear();
  const res = Math.abs(year - minDate);
  return res;
};

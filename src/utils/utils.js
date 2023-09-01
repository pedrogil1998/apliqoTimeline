export const createUnselectedItemList = (items) => {
  let newItems = items.map((obj) => {
    return { ...obj, selected: false };
  });
  return newItems;
};

export const handleScrollByIndex = (ref, index) => {
  //ref.current.scrollLeft = (index - 1) * 400;
};

export const getDateFromObj = (item) => {
  return (
    (item.cardDateObj &&
      item.cardDateObj.month &&
      new Date(item.cardDateObj.year, " ", item.cardDateObj.month)) ||
    (item.cardDateObj &&
      item.cardDateObj.year &&
      new Date(item.cardDateObj.year))
  );
};

export const getMaxDate = (items) => {
  const itemsDate = items
    .map(function (item) {
      return getDateFromObj(item);
    })
    .filter(Boolean); //removes undefined or falsy values
  const newDate = new Date(Math.max.apply(null, itemsDate));
  return newDate;
};

export const getMinDate = (items) => {
  const itemsDate = items
    .map(function (item) {
      return getDateFromObj(item);
    })
    .filter(Boolean); //removes undefined or falsy values
  const newDate = new Date(Math.min.apply(null, itemsDate));
  return newDate;
};

export const percentage = (partialValue, totalValue) => {
  const perc = (100 * partialValue) / totalValue + "%";
  return perc !== "100%" ? perc : "98%"
};

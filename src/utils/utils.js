export const createUnselectedItemList = (items) => {
  let newItems = items.map((obj) => {
    return { ...obj, selected: false };
  });
  return newItems;
};

export const handleScrollByIndex = (ref, index) => {
  ref.current.scrollLeft = (index - 1) * 400;
};

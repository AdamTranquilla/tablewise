interface OptionOrderType {
  optionId: String;
  price?: Number;
  name?: String;
}

interface ItemType {
  itemId: String;
  seatId: Number[];
  price?: Number;
  name?: String;
  cartItemId?: String;
  options?: OptionOrderType[];
}

const calculatePrice = (item: ItemType, preselect: String[] | undefined) => {
  let price = item.price;

  item &&
    item?.options?.forEach((option) => {
      if (preselect && preselect.indexOf(option.optionId) === -1)
        price = Number(option.price) + Number(price);
    });
  console.log("PRICE", preselect);
  return price;
};

export default calculatePrice;

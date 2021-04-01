interface OptionOrderType {
  optionId: string;
  price?: number;
  name?: string;
}

interface ItemType {
  itemId: string;
  seatId: number[];
  price?: number;
  name?: string;
  cartItemId?: string;
  options?: OptionOrderType[];
}

const calculatePrice = (item: ItemType, preselect: string[] | undefined) => {
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

import { OptionOrderType } from "../types";

interface CustomItemType {
  price?: number;
  options?: OptionOrderType[];
}

const calculatePrice = (
  item: CustomItemType,
  presetOptionId: string[] | undefined
) => {
  let price = item.price;

  item &&
    item?.options?.forEach((option) => {
      if (presetOptionId && presetOptionId.indexOf(option.optionId) === -1)
        price = Number(option.price) + Number(price);
    });
  return price;
};

export default calculatePrice;

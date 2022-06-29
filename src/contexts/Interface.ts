export interface CartItem extends ProductInterface {
  selectedAttribute: Array<{ attribute: string; value: string }>;
  quantity: number;
  uuid: string;
}
export interface State {
  cart: any;
  openCart: boolean;
  id: string;
}
export interface Cart {
  total: number;
  numberOfItems: number;
  items: Array<CartItem>;
}
export interface ContextState {
  api?: any;
  cart: any;
  changeID: Function;
  id: string;
  openCart: boolean;
  addItemToCart: Function;
  removeItemFromCart: Function;
  setCurrentCurrency: Function;
  changeAttribute: Function;
  toggleCart: Function;
  categories?: [];
  products?: [];
}
// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   description: string;
//   gallery: Array<string>;
//   attributes: Array<{
//     id: string;
//     name: string;
//     type: string;
//     items: Array<{ id: string; displayValue?: string; value?: string }>;
//   }>;
//   prices: Array<{
//     amount: number;
//     currency: { label: string; symbol: string };
//   }>;
// }
export interface ProductInterface {
  id: string;
  name: string;
  brand: string;
  description: string;
  gallery: Array<string>;
  attributes: Array<{
    name: string;
    type?: string;
    items: Array<{ value: string }>;
  }>;
  prices: Array<{
    amount: string;
    currency: string;
  }>;
}

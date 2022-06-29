import React from "react";
import Api from "../utils/Api";
import CartApi from "../utils/CartApi";
import { CartItem, ContextState, State } from "./Interface";
// import {
//   addToCart,
//   changeItemAttribute,
//   persistState,
//   removeFromCart,
//   restoreState,
//   updateCartPrices,
// } from "../utils/Helper";
type Props = {
  children?: React.ReactNode;
  data?: any;
};

const _state: ContextState = {
  id: "",
  cart: null,
  openCart: false,
  changeID: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  changeAttribute: () => {},
  setCurrentCurrency: () => {},
  toggleCart: () => {},
  categories: [],
};
const Context = React.createContext<ContextState>(_state);
Context.displayName = "App State";
export const Consumer = Context.Consumer;
export const AppContext = Context;
export class Provider extends React.Component<Props, State> {
  cart = new CartApi();
  state: State = {
    cart: this.cart,
    openCart: false,
    id: "all",
  };
  componentDidMount = () => {
    this.cart.restore().then(() => this.setState({ cart: this.cart }));
  };
  componentDidUpdate = () => {
    this.cart.restore();
    // this.setState({ cart: this.cart });
  };
  addItemToCart = (item: CartItem) => {
    this.cart.addItem(item).then(() => this.setState({ cart: this.cart }));
  };
  toggleCart = (value: boolean) => {
    this.setState({
      openCart: value,
    });
  };

  changeAttribute = (
    item: CartItem,
    attributeList: Array<{ attribute: string; value: string }>
  ) => {
    this.cart
      .changeAttribute(item, attributeList)
      .then(() => this.setState({ cart: this.cart }));
  };
  setCurrentCurrency = (symbol: string) => {
    this.cart
      .changeDefaultCurrency(symbol)
      .then(() => this.setState({ cart: this.cart }));
  };
  removeItemFromCart = (item: CartItem) => {
    this.cart.removeItem(item).then(() => this.setState({ cart: this.cart }));
  };
  render() {
    const api = new Api();
    return (
      <Context.Provider
        value={{
          api: api,
          openCart: this.state.openCart,
          id: this.state.id,
          cart: this.state.cart,
          changeID: (value: string) => {
            this.setState({ id: value });
          },
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
          setCurrentCurrency: this.setCurrentCurrency,
          toggleCart: this.toggleCart,
          changeAttribute: this.changeAttribute,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
// export const Categories = gql`
// query {
//   categories {
//     name
//   }
// }
// `;
// export default graphql(Categories)(Provider);
export default Provider;

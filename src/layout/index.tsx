import React from "react";
import Cart from "../components/cart/Cart";
import Navbar from "../components/Navbar";
import { Consumer } from "../contexts/Provider";
type Props = {
  children: React.ReactNode;
};
type State = {
  count: number; // like this
};
class Layout extends React.Component<Props, State> {
  render() {
    return (
      <div className="container relative">
        <Navbar />
        <Consumer>
          {(provider) => <Cart active={`${provider.openCart}`} />}
        </Consumer>
        <main className="pt-container">
          <div className="">{this.props.children}</div>
        </main>
      </div>
    );
  }
}

export default Layout;

import React from "react";
import styled from "styled-components";
import Item from "../components/cart/Item";
import Button from "../components/common/Button";
import { CartItem } from "../contexts/Interface";
import { AppContext } from "../contexts/Provider";
class CartPage extends React.Component {
  // <CartItem />
  render() {
    let provider: any = this.context;
    return (
      <Div>
        <h1 className="title">Cart</h1>

        <div className="flex flex-col">
          <div className="flex flex-col items-container">
            {provider.cart.items.map((item: CartItem) => (
              <Item inOverlay={false} key={item.uuid} item={item} />
            ))}
          </div>
          <div className="flex flex-col cart-summary">
            <p>
              Tax 21%:
              <i>{`${provider.cart.currency} ${parseFloat(
                String(0.21 * provider.cart.total)
              ).toFixed(2)}`}</i>
            </p>
            <p>
              Quantity:<i>{`${provider.cart.numberOfItems}`}</i>
            </p>
            <p>
              Total:{" "}
              <i>{`${provider.cart.currency} ${parseFloat(
                String(provider.cart.total)
              ).toFixed(2)}`}</i>
            </p>
            <Button className="" size="lg" variant="primary">
              order
            </Button>
          </div>
        </div>
      </Div>
    );
  }
}
CartPage.contextType = AppContext;
const Div = styled.div`
  padding-top: 5rem;
  position: relative;
  & ::-webkit-scrollbar {
    width: 5px;
    border-radius: 50px;
  }

  /* Track */
  & ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 100px;
  }

  /* Handle */
  & ::-webkit-scrollbar-thumb {
    background: #555;
    height: 40px;
    border-radius: 100px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  /* height: calc(900vh - var(--navbar-height)); */
  & .title {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;

    text-transform: uppercase;

    color: #1d1f22;
  }
  & .items-container {
    /* height: calc(calc(90vh - var(--navbar-height)) - 290px); */
    /* padding-bottom: 290px; */
  }
  & .cart-summary {
    height: 290px;
    /* position: fixed;
    bottom: 1.5rem;
    width: 90%; */
    max-width: 1250px;
    margin-right: auto;
    /* left: 0;
    right: 0;
    z-index: 4; */
    background-color: white;
    justify-content: space-evenly;
    button {
      font-family: "Raleway";
      font-style: normal;
      font-weight: 600;
      font-size: 1rem;
      line-height: 120%;
      text-transform: uppercase;
    }
    p {
      font-family: "Raleway";
      font-style: normal;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 1.75rem;
      color: #1d1f22;
    }
    i {
      font-style: normal;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1.5rem;
      color: #1d1f22;
    }
  }
`;

export default CartPage;

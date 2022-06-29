import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Item from "./Item";
import { AppContext } from "../../contexts/Provider";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { CartItem } from "../../contexts/Interface";
type Props = {
  inOverlay?: boolean;
  active?: string;
};
Modal.setAppElement("#root");
class Cart extends React.Component<Props> {
  innerRef: React.RefObject<HTMLDivElement> = React.createRef();
  handleClick = (event: any) => {
    let provider: any = this.context;
    // console.log("iInDom", this.isInDom());
    if (provider.openCart) {
      // console.log("ID", ;
      if (event.target.id === "cartToggle") {
      } else {
        if (
          !(
            this.innerRef?.current &&
            this.innerRef?.current.contains(event.target)
          )
        ) {
          if (typeof provider.toggleCart === "function") {
            provider.toggleCart(false);
            // console.log("Event");
          }
        }
      }
    }
    // console.log("Dom", typeof this.isInDom(event.target));
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("touchstart", this.handleClick);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClick);
    document.addEventListener("touchstart", this.handleClick);
  }
  render() {
    let provider: any = this.context;
    return (
      <Modal
        isOpen={provider.openCart}
        overlayClassName={"overlay"}
        className={"container"}
        // shouldCloseOnOverlayClick={true}
        // onRequestClose={() => {
        //   console.log("Close");
        //   provider.toggleCart(false);
        // }}
      >
        <Div>
          <div ref={this.innerRef} className={"bag"}>
            <h2 className="title">
              My bag,
              <span>&nbsp;{provider.cart.numberOfItems} items</span>
            </h2>
            <div className="item-container">
              {provider.cart.items.map((item: CartItem) => (
                <Item inOverlay={true} key={item.uuid} item={item} />
              ))}
            </div>
            <div className="flex flex-row justify-between summary">
              <p>Total</p>
              <p>{`${provider.cart.currency} ${parseFloat(
                String(provider.cart.total)
              ).toFixed(2)}`}</p>
            </div>
            <div className="flex flex-row justify-between">
              <Link to="/cart">
                <Button
                  variant="secondary"
                  size="md"
                  className="summary-button"
                  onClick={() => provider.toggleCart(false)}
                >
                  VIEW BAG
                </Button>
              </Link>
              <Button size="md" className="summary-button" variant="primary">
                CHECK OUT
              </Button>
            </div>
          </div>
        </Div>
      </Modal>
    );
  }
}
Cart.contextType = AppContext;
const Div = styled.div`
  width: 20.3125rem;
  max-height: 42.3125rem;
  margin-left: auto;
  /* @media only screen and (max-width: 1240px) {
    margin-right: 10%;
  } */
  & .bag {
    /* width: 20.3125rem;
    max-height: 42.3125rem; */
    width: 20.3125rem;
    height: min(42.3125rem, 80%);
    margin-left: auto;
    /* margin-bottom: auto; */
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: white;
  }
  a {
    text-decoration: none;
  }
  & .title {
    margin: 0;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 160%;
    text-transform: capitalize;
    span {
      font-weight: 500;
    }
  }
  & .summary {
    p {
      font-family: "Raleway";
      font-style: normal;
      font-weight: 700;
      font-size: 1rem;
      line-height: 160%;
    }
  }
  & .item-container {
    /* background-color: wheat; */
    display: flex;
    flex-direction: column;
    height: 30rem;
    overflow-y: scroll;
  }
  .summary-button {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 120%;
  }
  /* background-color: blue; */
  /* } */
`;

export default Cart;

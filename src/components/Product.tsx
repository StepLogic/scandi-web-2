import React from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem, ProductInterface } from "../contexts/Interface";
import { AppContext } from "../contexts/Provider";
import Attributes from "./common/Attributes";
import Button from "./common/Button";
import { v4 as uuid } from "uuid";
type Props = {
  product: ProductInterface;
};
class Product extends React.Component<Props> {
  state: {
    selectedAttribute: Array<{ attribute: string; value: string }>;
    warn: boolean;
    showAttributes: boolean;
  } = {
    selectedAttribute: [],
    warn: false,
    showAttributes: false,
  };
  setPrice = () => {
    let context: any = this.context;
    const price = this.props.product.prices.find((price) => {
      //@ts-ignore
      let symbol = price.currency.symbol;
      return symbol === context.cart.currency;
    });
    if (price) {
      //@ts-ignore
      let symbol = price.currency.symbol;

      return `${symbol} ${parseFloat(price.amount).toFixed(2)}`;
    } else {
      return ``;
    }
  };
  checkAllAttributesSelected = () => {
    // let includesElements = false;
    let includesAttribute = this.props.product.attributes.every(
      (_attribute) => {
        if (
          this.state.selectedAttribute.find(
            (_attr: { attribute: string; value: string }) =>
              _attr.attribute === _attribute.name
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
    );
    return !includesAttribute;
  };
  addItemToCart = () => {
    let context: any = this.context;
    if (this.state.selectedAttribute.length === 0) {
      // this.setState({ showAttributes: true });
      // document.querySelector(".attributes")?.classList.add("warn");
    } else {
      let item: CartItem = {
        uuid: uuid(),
        ...this.props.product,
        selectedAttribute: this.state.selectedAttribute,
        quantity: 1,
      };
      context.addItemToCart(item);
    }
  };
  updateAttributes = (
    attributeList?: Array<{ attribute: string; value: string }>
  ) => {
    if (attributeList) {
      // console.log("Attribute", attributeList);
      this.setState({ selectedAttribute: attributeList, showAttributes: true });
    }
  };
  render() {
    //@ts-ignore
    const { brand, name, id, inStock, gallery, attributes } =
      this.props.product;
    // console.log(id, attributes);
    return (
      <Wrapper className="">
        <div className="image">
          <img alt="product " loading="lazy" src={`${gallery[0]}`} />
          <div className="overlayProduct">
            <Link to={`/product/${id}`} className="fill">
              {inStock ? "" : "Out of Stock"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col product-texts">
          {inStock && (
            <>
              <div
                className="cart"
                // disabled={!inStock}
                data-disabled={`${inStock}`}
                onClick={() => {
                  //   // provider.addItemToCart(cartItem);
                  this.setState({ showAttributes: !this.state.showAttributes });
                  //   this.addItemToCart()
                }}
              >
                <BsCart2
                // onClick={() => {
                //   // provider.addItemToCart(cartItem);
                // }}
                />
                <div
                  className="attributes"
                  data-active={this.state.showAttributes}
                  data-warn={`${this.state.warn}`}
                  onMouseLeave={() => this.setState({ showAttributes: false })}
                >
                  <Attributes
                    attributes={attributes}
                    selectedAttribute={this.state.selectedAttribute}
                    onAttributeChange={this.updateAttributes}
                  />
                  <Button
                    className="orderButton"
                    size="lg"
                    data-active={`${this.checkAllAttributesSelected()}`}
                    disabled={this.checkAllAttributesSelected()}
                    variant="primary"
                    onClick={() => {
                      // provider.addItemToCart(cartItem);
                      // this.setState({ showAttributes: !this.state.showAttributes });
                      this.addItemToCart();
                    }}
                  >
                    ORDER
                  </Button>
                </div>
              </div>
            </>
          )}

          <Link to={`/product/${id}`} className={"product-name"}>
            {brand}&nbsp;
            {name}
          </Link>
          <Link to={`/product/${id}`} className={"product-price"}>
            {this.setPrice()}
          </Link>
          {/* <span></span> */}
        </div>
      </Wrapper>
    );
  }
}
Product.contextType = AppContext;
const Wrapper = styled.div`
  width: auto;
  aspect-ratio: 386/444;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  border: none;
  & .orderButton[data-active="true"] {
    color: var(--primary);
    background: white;
    box-shadow: 0px 4px 35px rgba(72, 72, 72, 0.19);
    border: none;
  }
  & .orderButton[data-active="true"]:active {
    transform: unset !important;
  }
  & .orderButton[data-active="true"]:hover {
    transform: unset !important;
  }
  /* --showAttributes: none; */
  & .attributes {
    position: absolute;
    display: none;
    background: white;
    box-shadow: 0px 4px 35px rgba(72, 72, 72, 0.19);
    z-index: 20;
    transform: translateY(calc(2rem + 50%)) translateX(-30%);
    padding: 1rem;
  }
  & .warn {
    box-shadow: 0px 1px 1px red;
  }
  & .attributes[data-active="true"] {
    display: block;
  }
  /* & .attributes:focus-within {
    --showAttributes: block;
  } */

  & .fill {
  }
  a {
    text-decoration: none;
  }
  & .cart {
    position: absolute;
    right: 1.9375rem;
    transform: translateY(-100%);
    background: #5ece7b;
    width: 3.25rem;
    border-radius: 50%;
    aspect-ratio: 1;
    border: none;
    color: white;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    transition: scale 1s;
    z-index: 9;
    svg {
    }
    & .label {
      color: black;
      text-align: left;
    }
  }
  & .cart[data-disabled="false"] {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    color: #5ece7b;
    background: white;
  }
  & .cart:active {
    background: white;
    transition: all 1s;
    transform-origin: center;
  }
  /* & .cart:focus {
    --showAttributes: block;
  } */
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  :hover {
    /* --showAttributes: block; */
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    & .cart {
      display: flex;
      animation-name: fade;
      animation-duration: 1s;
    }
  }

  .image {
    height: 74%;
    width: 100%;
    position: relative;
    background: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
    & .fill {
      width: 100%;
      height: 100%;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 160%;
      color: #8d8f9a;
      display: flex;
      align-items: center;
      background: white;
      justify-content: center;
    }
    & .overlayProduct {
      position: absolute;
      top: 0;
      z-index: 4;
      width: 100%;
      height: 100%;
      font-family: "Raleway";
      font-style: normal;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 160%;
      color: #8d8f9a;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & .product-texts {
    /* background: red; */
    margin-top: 1.5rem;
    position: relative;
    text-align: left;
  }
  & .product-name {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 160%;
    color: black;
  }
  & .product-price {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 160%;
    color: black;
  }
`;

export default Product;

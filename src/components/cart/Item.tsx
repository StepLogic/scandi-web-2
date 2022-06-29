import React from "react";
import styled, { css } from "styled-components";
import Button from "../common/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AppContext } from "../../contexts/Provider";
import { CartItem } from "../../contexts/Interface";
import Attributes from "../common/Attributes";
type Props = {
  inOverlay?: boolean;
  item: CartItem;
};
type DivProps = {
  inOverlay?: boolean;
};
class Item extends React.Component<Props> {
  state: {
    imgIndex: number;
    attributes: Array<{ attribute: string; value: string }>;
  } = {
    imgIndex: 0,
    attributes: [],
  };
  setPrice = () => {
    let context: any = this.context;
    const price = this.props.item.prices.find((price) => {
      //@ts-ignore
      let symbol = price.currency.symbol;
      return symbol === context.cart.currency;
    });
    if (price) {
      //@ts-ignore
      let symbol = price.currency.symbol;
      return `${symbol} ${price.amount}`;
    } else {
      return ``;
    }
  };

  render() {
    const { name, quantity, brand, gallery, attributes, selectedAttribute } =
      this.props.item;
    // const _shadowStateCopy=this.ite
    const cartItem: CartItem = this.props.item;
    let provider: any = this.context;
    return (
      <Div inOverlay={this.props.inOverlay}>
        <div className="details">
          <div className="flex flex-col">
            <h2 className="font-600 mb-1 h2" style={{ marginTop: "0" }}>
              {brand}
            </h2>
            <div className="h2 font-400 h2 mb-2-1">{name}</div>

            <div className="price mb-2-1">{this.setPrice()}</div>
            <div className="selector">
              <Attributes
                attributes={attributes}
                selectedAttribute={selectedAttribute}
                onAttributeChange={(
                  attributeList: Array<{ attribute: string; value: string }>
                ) => {
                  provider.changeAttribute(cartItem, attributeList);
                }}
              />
            </div>
          </div>
          <div className="quantity-change">
            <Button
              variant="secondary"
              onClick={() => provider.addItemToCart(cartItem)}
              className={"counter"}
            >
              <AiOutlinePlus />
            </Button>
            <div>{quantity}</div>
            <Button
              variant="secondary"
              className={"counter"}
              onClick={() => provider.removeItemFromCart(cartItem)}
            >
              <AiOutlineMinus />
            </Button>
          </div>
        </div>
        <div className="slider">
          <img
            alt="product "
            loading="lazy"
            className="thumbnail"
            src={`${gallery[this.state.imgIndex]}`}
          />
          {gallery.length > 1 ? (
            <div className={"controls"}>
              {this.state.imgIndex > 0 ? (
                <button
                  className={"arrow"}
                  onClick={() => {
                    if (this.state.imgIndex > 0) {
                      this.setState({
                        imgIndex: this.state.imgIndex - 1,
                      });
                    }
                  }}
                >
                  <BsChevronLeft />
                </button>
              ) : (
                <></>
              )}
              {this.state.imgIndex < gallery.length - 1 ? (
                <button
                  className={"arrow"}
                  onClick={() => {
                    if (this.state.imgIndex < gallery.length - 1) {
                      this.setState({
                        imgIndex: this.state.imgIndex + 1,
                      });
                    }
                  }}
                >
                  <BsChevronRight />
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Div>
    );
  }
}
Item.contextType = AppContext;
const Div = styled.div`
  display: grid;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;

  ${(props: DivProps) => {
    if (props.inOverlay) {
      return css`
        grid-template-columns: 1fr 1fr;
        column-gap: 0.8rem;
        & .h2 {
          font-weight: 300;
          font-size: 1rem;
          line-height: 160%;
          margin-bottom: 0.1rem !important;
        }
        & .gap-12 {
          gap: 0.5rem;
        }
        & .size-btn {
          /* width: 1.2rem;
          height: 1.2rem; */
          font-size: 0.6rem;
        }
        & .swatch {
          width: 1rem;
          height: 1rem;
        }
        & .label {
          font-family: "Raleway";
          font-style: normal;
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 1rem;
          text-transform: capitalize;
        }
        & .price {
          font-family: "Raleway";
          font-style: normal;
          font-weight: 500;
          font-size: 1rem;
          line-height: 160%;
        }
        & .counter {
          width: 1.5rem;
          aspect-ratio: 1;
          font-size: 1.2rem;
        }
        & .slider {
          & .controls {
            display: none;
          }
          & .thumbnail {
            width: 100%;
            height: 100%;
          }
        }
      `;
    } else {
      return css`
        grid-template-columns: 10fr 2fr;
        column-gap: 1.5rem;
        border: 1px solid #e5e5e5;
        & .price {
          font-family: "Raleway";
          font-style: normal;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 100%;
          /* margin-top: 1.25rem; */
          /* margin-bottom: 0%; */
        }
        & .counter {
          width: 2.8125rem;
          aspect-ratio: 1;
          font-size: 1.2rem;
        }
        & .slider {
          position: relative;
          width: 100%;
          height: 100%;
          & .controls {
            position: absolute;
            display: inline-flex;
            place-items: center;
            bottom: 1rem;
            right: 1rem;
            gap: 0.5rem;
          }
          & .arrow {
            display: flex;
            justify-content: center;

            align-items: center;
            width: 1.5rem;
            height: 1.5rem;
            background: rgba(0, 0, 0, 0.73);
            border: none;
            box-sizing: content-box;
            svg {
              color: #ffffff;
            }
          }
          & .thumbnail {
            width: 100%;
            height: 100%;
          }
        }
      `;
    }
  }}

  border-left: none;
  border-right: none;
  & .details {
    display: flex;
    flex-direction: row;
    & .quantity-change {
      display: flex;
      width: fit-content;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-left: auto;
      height: 100%;
      div {
        font-size: 1.5rem;
        line-height: 160%;
        display: flex;
        align-items: center;
        text-align: center;
        color: #1d1f22;
      }
    }
  }

  & .selectors {
    display: flex;
    flex-direction: column;
    button {
      font-size: 1rem;
      line-height: 1.125rem;
      padding: 1em;
    }
  }
`;

export default Item;

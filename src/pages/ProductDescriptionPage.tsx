import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { AppContext } from "../contexts/Provider";
import { CartItem, ProductInterface } from "../contexts/Interface";
import Attributes from "../components/common/Attributes";
import { v4 as uuid } from "uuid";
interface Props {
  uuid?: string;
}
interface State {
  product: ProductInterface;
  currentImage: string;
  isInCart: boolean;
  itemInCart?: CartItem;
  selectedAttribute?: Array<{ attribute: string; value: string }>;
  warn: boolean;
}
class ProductDescriptionPage extends React.Component<Props, State> {
  //@ts-ignore
  state = {
    // url: "",
    product: {
      id: "",
      brand: "",
      name: "",
      description: "",
      attributes: [{ name: "", items: [{ value: "" }] }],
      gallery: [""],
      prices: [{ currency: "", amount: "" }],
    },
    size: "",
    color: "",
    currentImage: "",
    isInCart: false,
    itemInCart: {},
    selectedAttribute: [],
    warn: false,
  };

  componentDidMount = () => {
    const url = window.location.pathname.split("/");
    let context: any = this.context;
    context.api
      .fetchProductById(url.at(-1))
      .then((data: any) =>
        this.setState({ product: data as ProductInterface })
      );
    const itemInCart = context.cart.items.find(
      (item: CartItem) => item.uuid === this.props.uuid
    );
    if (itemInCart) {
      this.setState({
        itemInCart: itemInCart,
        isInCart: true,
        selectedAttribute: this.findSelectedAttributes(),
      });
    }
  };
  checkAllAttributesSelected = () => {
    // let includesElements = false;
    //@ts-ignore
    const { inStock } = this.state.product;
    if (inStock === false) {
      return true;
    }
    let includesAttribute = this.state.product.attributes.every(
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
  findSelectedAttributes = () => {
    if (this.state.isInCart && this.state.itemInCart) {
      const attributes = this.state.itemInCart;
      //@ts-ignore
      return attributes.selectedAttribute;
    } else {
      return undefined;
    }
  };
  setPrice = () => {
    let context: any = this.context;
    const price = this.state.product.prices.find((price) => {
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
  addItemToCart = () => {
    let context: any = this.context;
    if (!this.state.isInCart) {
      let item: CartItem = {
        uuid: uuid(),
        ...this.state.product,
        selectedAttribute: this.state.selectedAttribute,
        quantity: 1,
      };
      context.addItemToCart(item);
    } else {
      if (this.state.itemInCart) {
        context.addItemToCart({
          ...this.state.itemInCart,
        });
      }
    }
  };
  updateAttributes = (
    attributeList?: Array<{ attribute: string; value: string }>
  ) => {
    let context: any = this.context;
    console.log("attributeList", attributeList, this.state.isInCart);
    if (this.state.isInCart && this.state.itemInCart) {
      context.changeAttribute(this.state.itemInCart, attributeList);
    } else {
      if (attributeList) {
        console.log("Attribute", attributeList);
        this.setState({ selectedAttribute: attributeList });
      }
    }
  };
  render() {
    return (
      <Div>
        <div className="layout">
          <div className="thumbnails">
            {this.state.product.gallery.map((thumbnail: any) => (
              <img
                alt="product "
                loading="lazy"
                className="thumbnail"
                src={thumbnail}
                key={thumbnail}
                onClick={() => {
                  this.setState({ currentImage: thumbnail });
                }}
              />
            ))}
          </div>
          <div className="product-details">
            <img
              alt="product "
              loading="lazy"
              className={"product-image"}
              src={
                this.state.currentImage === ""
                  ? this.state.product.gallery[0]
                  : this.state.currentImage
              }
            />
            <div className="product-details-text">
              <h2 className="font-600 mb-1">{this.state.product.brand}</h2>
              <div className="h2 font-400 mb-3">{this.state.product.name}</div>
              <div className="selector">
                <div className="warning" data-warn={`${this.state.warn}`}>
                  <Attributes
                    attributes={this.state.product.attributes}
                    selectedAttribute={this.state.selectedAttribute}
                    onAttributeChange={this.updateAttributes}
                  />
                </div>
                <div className="label">PRICE:</div>
                <div className="price mb-2-1">{this.setPrice()}</div>
                <Button
                  variant="primary"
                  className="orderButton"
                  size="lg"
                  data-active={`${this.checkAllAttributesSelected()}`}
                  disabled={this.checkAllAttributesSelected()}
                  onClick={() => {
                    this.addItemToCart();
                  }}
                >
                  ADD TO CART
                </Button>
                <div className="desc-paragraph">
                  {require("html-react-parser")(this.state.product.description)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Div>
    );
  }
}
ProductDescriptionPage.contextType = AppContext;
const Div = styled.div`
  padding-top: 5rem;
  & .layout {
    display: grid;
    grid-template-columns: 1fr 11fr;
    height: auto;
    column-gap: 0.5rem;
    width: 100%;
  }
  & .thumbnails {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(90vh - var(--navbar-height));
    row-gap: 2rem;
    padding-right: 1rem;
    & .thumbnail {
      height: 5.4756rem;
      aspect-ratio: 1;
    }
  }
  & .orderButton {
    color: white;
    font-size: 1rem;
  }
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
  & .product-details {
    width: 90%;
    margin-right: auto;
    display: grid;
    grid-template-columns: 8fr 4fr;
    column-gap: 5.625rem;
    max-height: calc(90vh - var(--navbar-height));
  }

  & .product-image {
    width: 100%;
    height: calc(90vh - var(--navbar-height));
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
  & .desc-paragraph {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 159.96%;
    color: var(--secondary);
    max-height: min-content;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  & .price {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 100%;
  }
`;
export default ProductDescriptionPage;

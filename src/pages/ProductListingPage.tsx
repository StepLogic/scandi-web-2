import React from "react";
// import { withRouter } from "react-router-dom";
// import { RouteComponentProps, useParams, withRouter } from "react-router-dom";
import styled from "styled-components";
import Product from "../components/Product";
import { ProductInterface } from "../contexts/Interface";
import { AppContext } from "../contexts/Provider";
import { withRouter, WithRouterProps } from "../hoc/withRouter";

interface Prop extends WithRouterProps {
  data?: any;
  id?: "";
}
class ProductListingPage extends React.Component<Prop> {
  state = {
    products: [],
  };
  // componentDidCatch = () => {};
  componentDidMount = () => {
    let context: any = this.context;
    context.api.fetchProductsById(this.props.id).then((data: any) => {
      // console.log("Prodts", data);
      this.setState({ products: data });
    });
    // .then((data: any) => this.setState({ products: data }));
    // console.log("Prodts", this.state.products);
  };
  componentDidUpdate = (prevProps: Prop) => {
    let context: any = this.context;
    if (prevProps.id !== this.props.id) {
      context.api
        .fetchProductsById(this.props.id)
        .then((data: any) => this.setState({ products: data }));
    }
  };
  render() {
    return (
      <Div>
        <h1 className="my-80">{this.props.id}</h1>
        <div className="product-display">
          {this.state.products.map((product: ProductInterface) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Div>
    );
  }
}
ProductListingPage.contextType = AppContext;
const Div = styled.div`
  h1 {
    text-transform: capitalize;
  }
  .product-display {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2.5rem;
    row-gap: 6.4375rem;
  }
`;
export default withRouter(ProductListingPage);

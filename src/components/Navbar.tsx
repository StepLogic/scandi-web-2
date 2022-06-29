import React from "react";
import { BsCart2 } from "react-icons/bs";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/svgs/logo.svg";
import Dropdown from "./common/Dropdown";
import { AppContext } from "../contexts/Provider";
import StyledLink from "./common/StyledLink";
import { withRouter, WithRouterProps } from "../hoc/withRouter";
interface Prop extends WithRouterProps {
  data?: any;
  id?: "";
}
class Navbar extends React.Component<Prop> {
  state = {
    categories: [],
    currencies: [],
    showCart: false,
  };

  // componentDidCatch = () => {};
  componentDidMount = () => {
    let context: any = this.context;
    context.api
      .fetchCategories()
      .then((data: any) => this.setState({ categories: data }));
    context.api
      .fetchCurrencies()
      .then((data: any) => this.setState({ currencies: data }));
  };

  render() {
    // const { currencies } = this.props.data;
    let context: any = this.context;
    return (
      <Wrapper className="container">
        <div className="flex flex-row">
          {this.state.categories.map((category: any) => (
            <StyledLink
              key={category.name}
              to={`/${category.name}`}
              data-active={`${category.name === context.id}`}
              className={() => `link`}
              onClick={() => {
                context.changeID(`${category.name}`);
              }}
            >
              {category.name}
            </StyledLink>
          ))}
          {/* <pre>{this.props}</pre> */}
        </div>
        <Logo className="mx-auto" />
        <div className="flex flex-row items-center relative">
          <Dropdown className="dropdown">
            <Dropdown.Toggle>{context.cart.currency}</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.currencies &&
                this.state.currencies.map((currency: any) => (
                  <Dropdown.Item key={currency.label}>
                    <div
                      className={
                        "dropItem flex flex-row justify-evenly mx-auto"
                      }
                      onClick={() => {
                        // console.log("Currency", currency);
                        context.setCurrentCurrency(currency.symbol);
                      }}
                    >
                      <span>{currency.symbol}</span>
                      <span>{currency.label}</span>
                    </div>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          <button
            className="icon"
            id={"cartToggle"}
            onClick={() => {
              context.toggleCart(!context.openCart);
            }}
          >
            <BsCart2 id={"cartToggle"} />
            <span id={"cartToggle"} className="badge">
              {context.cart.numberOfItems}
            </span>
          </button>
          {/* <Cart active={`${provider.state.openCart}`} /> */}
        </div>
      </Wrapper>
    );
  }
}
Navbar.contextType = AppContext;
const Wrapper = styled.nav.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 10;
  right: 0;
  left: 0;
  background-color: white;
  height: var(--navbar-height);
  & .dropItem {
    width: 90%;
  }
  & .icon {
    position: relative;
    background: none;
    padding: 0.1rem;
    border: none;
    display: flex;
    flex-direction: column;
    /* font-size: 1rem; */
    svg {
      font-size: 1rem;
    }
    & .badge {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      aspect-ratio: 1;
      width: 0.9375rem;
      font-size: 0.5rem;
      color: white;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      background: var(--secondary);
      transform: translate(50%, -50%);
    }
  }

  /* svg {
   
  } */
  .dropdown {
    margin-right: 1.1rem;
  }
  & .active {
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
  .link {
  }
`;
// export const Categories = gql`
//   query {
//   currencies {
//     label
//     symbol
//   }
// }
// `;
export default withRouter(Navbar);
// export default Navbar;

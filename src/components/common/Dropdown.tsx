import React from "react";

import styled from "styled-components";
import cn from "classnames";
import { BsChevronDown } from "react-icons/bs";
type Props = {
  children?: React.ReactNode;
  active?: boolean;
  toggle?: Function;
  // onClick?: Function;
  className?: string;
  ref?: React.RefObject<HTMLUListElement>;
  handleOutsideClick?: Function;
};
type State = {
  active: Boolean;
};
interface WrapperProps {
  ref?: React.RefObject<HTMLDivElement>;
}
class Menu extends React.Component<Props, State> {
  state = {
    active: false,
  };
  // constructor(props: Props) {
  //   super(props);

  //   // console.log(this.props);
  // }

  render() {
    return (
      <div data-active={`${this.props.active}`} className={cn("menu")}>
        {React.Children.map(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              toggle: this.props.toggle,
              active: this.props.active,
            });
          }
          return child;
        })}
      </div>
    );
  }
}

class Item extends React.Component<Props, State> {
  render() {
    return (
      <div
        className="item"
        onClick={() => {
          console.log("", this.props);
          if (typeof this.props.toggle === "function") {
            this.props.toggle(false);
            console.log("", this.props);
          }
          // this.props.onClick && this.props.onClick();
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
class Toggle extends React.Component<Props, State> {
  render() {
    return (
      <button
        className="toggle"
        onClick={() => {
          if (
            typeof this.props.toggle === "function" &&
            typeof this.props.active === "boolean"
          ) {
            if (this.props.active) {
              this.props.toggle(false);
            } else {
              this.props.toggle(true);
            }
          }
        }}
      >
        {this.props.children}
        <BsChevronDown className="svg" data-active={`${this.props.active}`} />
      </button>
    );
  }
}

class Dropdown extends React.Component<Props, State> {
  state = {
    active: false,
  };

  toggle = (value: boolean) => {
    // console.log("State");
    this.setState((state) => {
      return {
        active: value,
      };
    });
  };
  static Item = Item;
  static Toggle = Toggle;
  static Menu = Menu;

  innerRef: React.RefObject<HTMLDivElement> = React.createRef();
  handleClick = (event: any) => {
    // const value =
    //   this.innerRef?.current && this.innerRef?.current.contains(event.target);
    // console.log("event", value);
    // console.log("iInDom", this.isInDom());
    if (this.state.active) {
      if (
        !(
          this.innerRef?.current &&
          this.innerRef?.current.contains(event.target)
        )
      ) {
        if (typeof this.toggle === "function") {
          this.toggle(false);
          // console.log("Event");
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
    return (
      <Wrapper ref={this.innerRef} className={this.props.className}>
        {React.Children.map(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            // console.log("Child", child);
            return React.cloneElement(child, {
              toggle: this.toggle,
              active: this.state.active,
            });
          }
          return child;
        })}
      </Wrapper>
    );
  }
}
const Wrapper = styled.div.attrs((props) => ({
  className: props.className,
}))<WrapperProps>`
  position: relative;
  & .menu[data-active="true"] {
    display: flex;
    flex-direction: column;
    width: auto;
    background: white;
    box-shadow: 0px 0px 4px 2px #cbcbcb80;
  }
  & .toggle {
    background: none;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1rem;
    padding: 0.1rem;
    .svg {
      transition: all linear 1s;
      font-size: 0.5rem;
      margin-left: 0.2rem;
    }
    .svg[data-active="true"] {
      transform: rotateZ(180deg);
      transition: all linear 0.5s;
    }
  }
  & .menu {
    display: none;
    position: absolute;
    z-index: 10;
    transform: translateX(-50%);
    padding: 0;
    list-style: none;
  }
  & .item {
    border: none;
    background: none;
    width: 114px;
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: 1.125rem;
    line-height: 160%;
    padding: 0.25rem 0.5rem;
  }
  & .item:hover {
    transform: unset;
    background: #eeeeee;
  }
`;

export default Dropdown;

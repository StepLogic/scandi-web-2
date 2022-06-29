import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
type Props = {
  variant?: "primary" | "secondary";
};
const StyledLink = styled(NavLink)`
  box-sizing: border-box;
  transition: scale 1s;
  color: var(--primary);
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  text-transform: uppercase;
  padding: 2rem 1.2rem;
  flex-basis: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 120%;
  &[data-active="true"] {
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
  :hover {
    transform: scale(1.1);
    transform-origin: center;
  }
  ${(props: Props) => {
    if (props.variant === "primary")
      return css`
        color: var(--primary);
        :hover {
          border-bottom: 1px solid var(--primary);
        }
      `;
    if (props.variant === "secondary") {
      return css`
        color: var(--secondary);
      `;
    }
  }}
`;
StyledLink.defaultProps = {
  variant: "secondary",
};
export default StyledLink;

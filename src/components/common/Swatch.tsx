import styled, { css } from "styled-components";
type Props = {
  variant?: "primary" | "secondary" | "icon";
  color?: string;
};
const Swatch = styled.button.attrs((props) => ({
  className: props.className,
}))`
  width: 2rem;
  height: 2rem;
  border: none;
  ${(props: Props) => {
    return css`
      background: ${props.color};
    `;
  }}
  &[data-active="true"] {
    box-sizing: border-box;
    border: 1px solid white;
    box-shadow: 0px 0px 0px 1px #5ece7b;
  }
`;

export default Swatch;

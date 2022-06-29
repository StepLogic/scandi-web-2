import styled, { css } from "styled-components";
type Props = {
  variant?: "primary" | "secondary" | "icon";
  size?: "sm" | "lg" | "md";
};
const Button = styled.button.attrs((props) => ({
  className: props.className,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: Props) => {
    if (props.variant === "primary")
      return css`
        color: white;
        background: var(--primary);
        border: none;
        :hover {
          border-bottom: 1px solid var(--primary);
        }
      `;
    if (props.variant === "secondary") {
      return css`
        color: var(--secondary);
        border: 1px solid var(--secondary);
        background: none;
        :hover {
          border-bottom: 1px solid var(--secondary);
        }
        &[data-active="true"] {
          background: #1d1f22;
          border: 1px solid #1d1f22;
          color: white;
        }
      `;
    }
  }}
  ${(props: Props) => {
    if (props.size === "sm") {
      return css`
        font-size: 1rem;
        padding: 0.5em 1em;
      `;
    }
    if (props.size === "lg") {
      return css`
        width: 18.25rem;
        height: 3.25rem;
      `;
    }
    if (props.size === "md") {
      return css`
        width: 8.75rem;
        height: 2.6875rem;
      `;
    }
  }}
`;
Button.defaultProps = {
  variant: "primary",
};
export default Button;

import React, { FC } from "react";
import styled from "styled-components";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void;
  appearance?: "primary" | "secondary";
}

interface StyledProps extends Props {
  appearance: "primary" | "secondary";
}

const StyledButton = styled.button<StyledProps>`
  background-color: ${(p) => p.theme.colors.palette[p.appearance]};
  color: white;
  padding: 0.5rem 3rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  border: none;
  outline: none;
  transition: transform 0.1s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Button: FC<Props> = ({ children, onClick, appearance = "secondary" }) => {
  return (
    <StyledButton appearance={appearance} onClick={onClick} data-testid="action-button">
      {children}
    </StyledButton>
  );
};

export default Button;

import { FC } from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  appearance: "primary" | "secondary";
}

const StyledButton = styled.button<Props>`
  background-color: ${(p) => p.theme.colors.palette[p.appearance]};
  color: white;
  padding: 0.6rem 3.5rem;
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

const Button: FC<Props> = ({ children, onClick, appearance = "primary" }) => {
  return (
    <StyledButton appearance={appearance} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

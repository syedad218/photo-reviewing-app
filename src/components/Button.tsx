import { FC } from "react";

interface Props {
  onClick: () => void;
}

const Button: FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;

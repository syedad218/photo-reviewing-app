import { FC } from "react";

interface Props {
  children: React.ReactNode;
  props?: any;
}

const Button: FC<Props> = ({ children, props }) => {
  return <button>{children}</button>;
};

export default Button;

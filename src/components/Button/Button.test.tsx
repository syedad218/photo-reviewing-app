import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "jest-styled-components";
import Button from "./index";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

afterEach(cleanup);

const rtlRenderer = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

describe("Button", () => {
  it("shows correct color for primary button", () => {
    rtlRenderer(<Button appearance="primary" />);
    expect(screen.getByTestId("action-button")).toHaveStyle(
      `background-color: ${theme.colors.palette.primary}`
    );
  });

  it("shows correct color for secondary button", () => {
    rtlRenderer(<Button appearance="secondary" />);
    expect(screen.getByTestId("action-button")).toHaveStyle(
      `background-color: ${theme.colors.palette.secondary}`
    );
  });
});

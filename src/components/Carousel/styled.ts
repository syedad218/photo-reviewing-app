import styled from "styled-components";

export const Container = styled.div<{ ref: any }>`
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 10px;
  min-height: 100px;
  & > .image-loading-spinner {
    min-height: 1rem;
    margin: 0 auto;
  }
  & > .empty-image-wrapper {
    color: lightsteelblue;
    width: 80px;
    height: 100px;
  }
`;

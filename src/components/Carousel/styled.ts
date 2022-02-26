import styled from "styled-components";

export const Container = styled.div<{ ref: any }>`
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 10px;
  min-height: 5rem;
  & > .image-loading-spinner {
    min-height: 1rem;
    margin: 0 auto;
  }
`;

import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #fff;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
  max-width: 30rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 12px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.palette.primary};
  & > .card-header {
    padding: 0 2rem;
  }
  .carousel-container {
    padding: 0 2rem 1rem 2rem;
    min-height: 100px;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;
  }
`;

export const Actions = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2rem;
`;

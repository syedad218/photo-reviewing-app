import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #fff;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
  max-width: 30rem;
  height: 100%;
  margin: 0 auto;
  border-radius: 0.5rem;
  & > .card-header,
  .carousel-container {
    font-size: 12px;
    font-weight: bold;
    color: #0c55e9;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid lightgray;
  }
  .carousel-container {
    padding: 0 2rem 1rem 2rem;
  }
`;

export const Actions = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`;

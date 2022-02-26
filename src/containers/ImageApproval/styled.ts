import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #fff;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));
  max-width: 26rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 12px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.palette.primary};
  text-transform: uppercase;
  & > .card-header {
    padding: 0 2rem;
  }
  .carousel-container {
    position: relative;
    padding: 0 2rem 1rem 2rem;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;
    scroll-behavior: smooth;
    & > .left-navigation {
      position: absolute;
      left: 10px;
      cursor: pointer;
      top: 50%;
    }
    & > .right-navigation {
      position: absolute;
      right: 5px;
      cursor: pointer;
      top: 50%;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  column-gap: 2rem;
  overflow: hidden;
`;

export const EmptyImageText = styled.p`
  color: darkgrey;
  font-size: 10px;
  font-weight: 500;
  padding: 1.2rem 1rem;
  text-align: center;
`;

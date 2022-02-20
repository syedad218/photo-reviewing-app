import { FC } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

interface Props {}

const RandomImage: FC<Props> = () => {
  return (
    <ImageContainer>
      <img src={`https://picsum.photos/id/1/400/400`} alt="random" />
    </ImageContainer>
  );
};

export default RandomImage;

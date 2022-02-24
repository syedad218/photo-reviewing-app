import { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { makeSelectCurrentImage } from "./selectors";

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
`;

interface Props {}

const RandomImage: FC<Props> = () => {
  const image = useSelector(makeSelectCurrentImage);
  return (
    <ImageContainer>
      {image ? (
        <img src={image.urls.regular} alt="random" width={350} height={350} />
      ) : (
        <div>+</div>
      )}
    </ImageContainer>
  );
};

export default RandomImage;

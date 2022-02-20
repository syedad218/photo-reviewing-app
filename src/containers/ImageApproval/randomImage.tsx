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
        <img src={image.url.regular} alt="random" width={400} height={400} />
      ) : (
        <div>+</div>
      )}
    </ImageContainer>
  );
};

export default RandomImage;

import { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchRandomImage } from "../../lib/actions";
import { Image } from "../../lib/types";
import ScaleLoader from "react-spinners/ScaleLoader";

const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  overflow: hidden;
  color: lightsteelblue;
  & > .empty-image-wrapper {
    min-height: 380px;
    width: 100%;
  }
`;

export interface Props {
  image: Image;
  isLoadingRandomImages: boolean;
}

const RandomImage: FC<Props> = ({ image, isLoadingRandomImages }) => {
  const dispatch = useDispatch();

  const fetchRandomImageStart = () => {
    if (!image) dispatch(fetchRandomImage.start());
  };

  const renderCard = () => {
    if (image) return <img src={image.urls.regular} alt="random" width={375} height={380} />;
    else if (isLoadingRandomImages)
      return <ScaleLoader height={35} width={4} color={"lightsteelblue"} />;

    return <span className="material-icons md-54">add_a_photo</span>;
  };

  return (
    <Container>
      <div className="empty-image-wrapper" onClick={fetchRandomImageStart}>
        {renderCard()}
      </div>
    </Container>
  );
};

export default RandomImage;

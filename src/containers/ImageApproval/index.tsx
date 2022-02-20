import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardContainer, Actions } from "./styled";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import { fetchUserLikedImages, fetchRandomImage } from "../../lib/actions";
import RandomImage from "./randomImage";

interface Props {}

const ImageApproval: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserLikedImages.start());
    dispatch(fetchRandomImage.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContainer>
      <p className="card-header">IMAGE APPROVAL APPLICATION</p>
      <div className="carousel-container">
        <p>APPROVED IMAGES (7)</p>
        <Carousel />
      </div>
      <RandomImage />
      <div className="card-footer">
        <Actions>
          <Button>Dislike</Button>
          <Button>Like</Button>
        </Actions>
      </div>
    </CardContainer>
  );
};

export default ImageApproval;

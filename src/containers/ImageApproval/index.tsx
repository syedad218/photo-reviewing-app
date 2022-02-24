import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardContainer, Actions } from "./styled";
import Carousel from "../../components/Carousel";
import Button from "../../components/Button";
import {
  fetchUserLikedImages,
  fetchRandomImage,
  likeImage,
  unlikeImage,
} from "../../lib/actions";
import RandomImage from "./randomImage";

interface Props {}

const ImageApproval: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserLikedImages.start());
    dispatch(fetchRandomImage.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = () => {
    dispatch(likeImage.start());
  };

  const handleDislike = () => {
    dispatch(unlikeImage.start());
  };

  return (
    <CardContainer>
      <p className="card-header">IMAGE APPROVAL APPLICATION</p>
      <div className="carousel-container">
        <Carousel />
      </div>
      <RandomImage />
      <div className="card-footer">
        <Actions>
          <Button onClick={handleDislike}>Dislike</Button>
          <Button onClick={handleLike}>Like</Button>
        </Actions>
      </div>
    </CardContainer>
  );
};

export default ImageApproval;

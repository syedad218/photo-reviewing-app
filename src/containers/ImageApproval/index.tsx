import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { makeSelectIsLoadingRandomImages } from "./selectors";

interface Props {}

const ImageApproval: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const isLoadingRandomImages = useSelector(makeSelectIsLoadingRandomImages);
  useEffect(() => {
    dispatch(fetchUserLikedImages.start());
    dispatch(fetchRandomImage.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = () => {
    if (!isLoadingRandomImages) dispatch(likeImage.start());
  };

  const handleDislike = () => {
    if (!isLoadingRandomImages) dispatch(unlikeImage.start());
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

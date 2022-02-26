import { FC } from "react";
import { Actions, EmptyImageText } from "./styled";
import Button from "../../components/Button";
import { Image } from "../../lib/types";
import { likeImage, unlikeImage } from "../../lib/actions";
import { makeSelectIsLoadingRandomImages } from "./selectors";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  image: Image;
}

const ActionsWrapper: FC<Props> = ({ image }) => {
  const dispatch = useDispatch();
  const isLoadingRandomImages = useSelector(makeSelectIsLoadingRandomImages);

  const handleLike = () => {
    if (!isLoadingRandomImages) dispatch(likeImage.start());
  };

  const handleDislike = () => {
    if (!isLoadingRandomImages) dispatch(unlikeImage.start());
  };

  if (!image) {
    return (
      <EmptyImageText>
        <span>
          Click on the &nbsp;
          <span className="material-icons md-12">add_a_photo</span>
          &nbsp; icon in order to get image recommendations
        </span>
      </EmptyImageText>
    );
  }

  return (
    <Actions>
      <Button appearance="secondary" onClick={handleDislike}>
        <span className="material-icons">thumb_down</span>
      </Button>
      <Button appearance="primary" onClick={handleLike}>
        <span className="material-icons">thumb_up</span>
      </Button>
    </Actions>
  );
};

export default ActionsWrapper;

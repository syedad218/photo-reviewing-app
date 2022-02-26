import { FC } from "react";
import { Actions, EmptyImageText } from "./styled";
import Button from "../../components/Button";
import { Props } from "./randomImage";
import { likeImage, unlikeImage } from "../../lib/actions";
import { useDispatch } from "react-redux";

const ActionsWrapper: FC<Props> = ({ image, isLoadingRandomImages }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!isLoadingRandomImages) dispatch(likeImage.start());
  };

  const handleDislike = () => {
    if (!isLoadingRandomImages) dispatch(unlikeImage.start());
  };

  if (!image && !isLoadingRandomImages) {
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

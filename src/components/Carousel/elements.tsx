import { Dispatch, FC, forwardRef } from "react";
import { handleRightNavigation, handleLeftNavigation } from "./utils";
import { Image } from "../../lib/types";
import { fetchRandomImage } from "../../lib/actions";

interface Props {
  leftNav?: boolean;
  rightNav?: boolean;
  scrollContainerRef: HTMLDivElement | null;
}

export const LeftNavArrow: FC<Props> = ({ leftNav, scrollContainerRef }) => {
  if (!leftNav) return null;
  return (
    <span
      className="material-icons left-navigation"
      onClick={() => handleLeftNavigation(scrollContainerRef)}
    >
      arrow_back_ios
    </span>
  );
};

export const RightNavArrow: FC<Props> = ({ rightNav, scrollContainerRef }) => {
  if (!rightNav) return null;
  return (
    <span
      className="material-icons right-navigation"
      onClick={() => handleRightNavigation(scrollContainerRef)}
    >
      arrow_forward_ios
    </span>
  );
};

export const ImageContainer = forwardRef<
  HTMLDivElement | null,
  {
    image: Image;
    isLast: boolean;
  }
>(({ image, isLast }, ref) => {
  return (
    <div key={image.id} ref={isLast ? ref : null}>
      <img src={`${image.urls.small}`} width={85} height={100} alt={`liked-${image.id}`} />
    </div>
  );
});

export const EmptyImageCard: FC<{ loading: boolean; dispatch: Dispatch<any>; image: Image }> = ({
  loading,
  dispatch,
  image,
}) => {
  if (loading) return null;

  const fetchRandomImageStart = () => {
    if (!image) dispatch(fetchRandomImage.start());
  };

  return (
    <div className="empty-image-wrapper" onClick={fetchRandomImageStart}>
      <span className="material-icons">add_a_photo</span>
    </div>
  );
};

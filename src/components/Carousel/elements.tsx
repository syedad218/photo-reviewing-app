import { FC, forwardRef } from "react";
import { handleRightNavigation, handleLeftNavigation } from "./utils";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Image } from "../../lib/types";

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

export const Loader: FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="image-loading-spinner">
      <PropagateLoader color={"cornflowerblue"} loading={true} size={10} />
    </div>
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
      <img src={`${image.urls.small}`} width={85} height={100} alt="liked" />
    </div>
  );
});

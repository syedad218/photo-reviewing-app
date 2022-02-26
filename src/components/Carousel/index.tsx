import { FC, useRef, useCallback, useState, useEffect } from "react";
import { Container } from "./styled";
import {
  makeSelectLikedImages,
  makeSelectIsUserLikedImageLoading,
  makeSelectHasMoreLikedImages,
} from "../../containers/ImageApproval/selectors";
import { useSelector, useDispatch } from "react-redux";
import throttle from "lodash/throttle";
import { Image } from "../../lib/types";
import { checkRightScroll, checkLeftScroll, checkIfLastElementVisible } from "./utils";
import { LeftNavArrow, RightNavArrow, ImageContainer, EmptyImageCard } from "./elements";

interface Props {
  image: Image;
}

const Carousel: FC<Props> = ({ image }) => {
  const images: Array<Image> = useSelector(makeSelectLikedImages);
  const loading: boolean = useSelector(makeSelectIsUserLikedImageLoading);
  const hasMore: boolean = useSelector(makeSelectHasMoreLikedImages);
  const dispatch = useDispatch();

  const [leftNav, setLeftNav] = useState(false);
  const [rightNav, setRightNav] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const lastElementRef = useCallback(
    (node) => {
      checkIfLastElementVisible(node, loading, hasMore, dispatch, observer);
    },
    [loading, hasMore, dispatch]
  );

  useEffect(() => {
    setLeftNav(checkLeftScroll(scrollContainerRef.current));
    setRightNav(checkRightScroll(scrollContainerRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleScroll = throttle(() => {
    const isScrollLeft = checkLeftScroll(scrollContainerRef.current);
    const isScrollRight = checkRightScroll(scrollContainerRef.current);
    if (leftNav !== isScrollLeft) setLeftNav(isScrollLeft);
    if (rightNav !== isScrollRight) setRightNav(isScrollRight);
  }, 1000);

  const renderContent = () => {
    if (!images || images.length === 0)
      return <EmptyImageCard loading={loading} dispatch={dispatch} image={image} />;

    return images.map((image, index) => (
      <ImageContainer
        isLast={index === images.length - 1}
        image={image}
        ref={lastElementRef}
        key={image.id}
      />
    ));
  };

  return (
    <>
      <p>approved images ({images?.length})</p>
      <LeftNavArrow leftNav={leftNav} scrollContainerRef={scrollContainerRef.current} />
      <RightNavArrow rightNav={rightNav} scrollContainerRef={scrollContainerRef.current} />
      <Container className="image-container" ref={scrollContainerRef} onScroll={handleScroll}>
        {renderContent()}
      </Container>
    </>
  );
};

export default Carousel;

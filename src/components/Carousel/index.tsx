import { FC, useRef, useCallback, useState, useEffect } from "react";
import { Container } from "./styled";
import {
  makeSelectLikedImages,
  makeSelectIsUserLikedImageLoading,
  makeSelectHasMoreLikedImages,
} from "../../containers/ImageApproval/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserLikedImages } from "../../lib/actions";
import throttle from "lodash/throttle";
import { Image } from "../../lib/types";
import { checkRightScroll, checkLeftScroll } from "./utils";
import {
  LeftNavArrow,
  RightNavArrow,
  Loader,
  ImageContainer,
} from "./elements";

interface Props {}

const Carousel: FC<Props> = () => {
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
      if (loading) return;
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchUserLikedImages.start());
        }
      });
      if (node) observer.current.observe(node);
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

  return (
    <>
      <p>approved images ({images?.length})</p>
      <LeftNavArrow
        leftNav={leftNav}
        scrollContainerRef={scrollContainerRef.current}
      />
      <RightNavArrow
        rightNav={rightNav}
        scrollContainerRef={scrollContainerRef.current}
      />
      <Container
        className="image-container"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <Loader loading={loading} />
        {images?.length > 0 &&
          images.map((image, index) => (
            <ImageContainer
              isLast={index === images.length - 1}
              image={image}
              ref={lastElementRef}
            />
          ))}
      </Container>
    </>
  );
};

export default Carousel;

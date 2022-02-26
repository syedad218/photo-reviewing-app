import { FC, useRef, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import {
  makeSelectLikedImages,
  makeSelectIsUserLikedImageLoading,
  makeSelectHasMoreLikedImages,
} from "../containers/ImageApproval/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserLikedImages } from "../lib/actions";
import PropagateLoader from "react-spinners/PropagateLoader";
import throttle from "lodash/throttle";

interface Props {}

const Container = styled.div<{ ref: any }>`
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 10px;
  min-height: 5rem;
  & > .image-spinner {
    min-height: 1rem;
    margin: 0 auto;
  }
`;

const Carousel: FC<Props> = () => {
  const images = useSelector(makeSelectLikedImages);
  const loading = useSelector(makeSelectIsUserLikedImageLoading);
  const hasMore = useSelector(makeSelectHasMoreLikedImages);
  const dispatch = useDispatch();

  const [leftNav, setLeftNav] = useState(false);
  const [rightNav, setRightNav] = useState(false);

  const observer = useRef();
  const scrollContainerRef = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      // @ts-ignore
      if (observer.current) observer.current.disconnect();
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Intersecting");
          dispatch(fetchUserLikedImages.start());
        }
      });
      // @ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  const showRightNavigation = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } =
        scrollContainerRef.current;
      return scrollWidth > clientWidth + scrollLeft;
    }
    return false;
  }, []);

  const showLeftNavigation = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } =
        scrollContainerRef.current;
      return scrollLeft > 0;
    }
    return false;
  }, []);

  useEffect(() => {
    setLeftNav(showLeftNavigation());
    setRightNav(showRightNavigation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleScroll = throttle(() => {
    const isScrollLeft = showLeftNavigation();
    const isScrollRight = showRightNavigation();
    if (leftNav !== isScrollLeft) setLeftNav(isScrollLeft);
    if (rightNav !== isScrollRight) setRightNav(isScrollRight);
  }, 1000);

  return (
    <>
      <p>approved images ({images?.length})</p>
      {rightNav && (
        <span
          className="material-icons right-navigation"
          onClick={() => {
            // @ts-ignore
            scrollContainerRef.current.scrollBy({
              top: 0,
              // @ts-ignore
              left: scrollContainerRef.current.clientWidth - 20,
              behavior: "smooth",
            });
          }}
        >
          arrow_forward_ios
        </span>
      )}
      {leftNav && (
        <span
          className="material-icons left-navigation"
          onClick={() => {
            // @ts-ignore
            scrollContainerRef.current.scrollBy({
              top: 0,
              // @ts-ignore
              left: -(scrollContainerRef.current.clientWidth + 20),
              behavior: "smooth",
            });
          }}
        >
          arrow_back_ios
        </span>
      )}
      <Container
        className="image-container"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {loading && (
          <div className="image-spinner">
            <PropagateLoader
              color={"cornflowerblue"}
              loading={true}
              size={10}
            />
          </div>
        )}
        {Array.isArray(images) &&
          images.length > 0 &&
          images.map((image, index) => (
            <div
              style={{ width: "80px", height: "100px" }}
              key={image.id}
              {...(index === images.length - 1 && { ref: lastElementRef })}
            >
              <img
                src={`${image.urls.small}`}
                width={80}
                height={100}
                alt="liked"
              />
            </div>
          ))}
      </Container>
    </>
  );
};

export default Carousel;

import { useRef, useCallback } from "react";
import styled from "styled-components";
import {
  makeSelectLikedImages,
  makeSelectIsUserLikedImageLoading,
  makeSelectHasMoreLikedImages,
} from "../containers/ImageApproval/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserLikedImages } from "../lib/actions";

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 20px;
`;

const Carousel = ({}) => {
  const images = useSelector(makeSelectLikedImages);
  const loading = useSelector(makeSelectIsUserLikedImageLoading);
  const hasMore = useSelector(makeSelectHasMoreLikedImages);
  const dispatch = useDispatch();

  const observer = useRef();

  console.log("hasMore", hasMore);

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

  return (
    <>
      <p>APPROVED IMAGES</p>
      <Container>
        {loading && <h3>Loading...</h3>}
        {Array.isArray(images) && images.length > 0 ? (
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
          ))
        ) : (
          <div>Like +</div>
        )}
      </Container>
    </>
  );
};

export default Carousel;

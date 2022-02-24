import { useRef, useCallback } from "react";
import styled from "styled-components";
import {
  makeSelectLikedImages,
  makeSelectIsUserLikedImageLoading,
} from "../containers/ImageApproval/selectors";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 20px;
`;

const Carousel = ({}) => {
  const images = useSelector(makeSelectLikedImages);
  const loading = useSelector(makeSelectIsUserLikedImageLoading);

  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      // @ts-ignore
      if (observer.current) observer.current.disconnect();
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Intersecting");
        }
      });
      // @ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading]
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

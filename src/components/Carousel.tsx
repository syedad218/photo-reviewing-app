import styled from "styled-components";
import { makeSelectLikedImages } from "../containers/ImageApproval/selectors";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 20px;
`;

const Carousel = ({}) => {
  const images = useSelector(makeSelectLikedImages);

  return (
    <Container>
      {Array.isArray(images) && images.length > 0 ? (
        images.map((image, index) => (
          <div style={{ width: "80px", height: "100px" }}>
            <img
              key={image.id}
              src={`${image.url.small}`}
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
  );
};

export default Carousel;

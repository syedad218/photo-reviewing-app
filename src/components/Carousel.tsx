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
    <>
      <p>APPROVED IMAGES</p>
      <Container>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image, index) => (
            <div style={{ width: "80px", height: "100px" }} key={image.id}>
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

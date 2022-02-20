import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  column-gap: 20px;
`;

const Carousel = ({}) => {
  const images = [1, 2, , 3, 4, 5, 6, 7, 8];
  return (
    <Container>
      {images.map((image, index) => (
        <img
          key={image}
          src={`https://picsum.photos/id/${image}/200/200`}
          width={200}
          height={100}
          alt="liked"
        />
      ))}
    </Container>
  );
};

export default Carousel;

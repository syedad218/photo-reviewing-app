import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardContainer } from "./styled";
import Carousel from "../../components/Carousel";
import { fetchUserLikedImages } from "../../lib/actions";
import RandomImage from "./randomImage";
import { makeSelectCurrentImage } from "./selectors";
import ActionsWrapper from "./imageActions";

interface Props {}

const ImageApproval: FC<Props> = () => {
  const image = useSelector(makeSelectCurrentImage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserLikedImages.start());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContainer>
      <p className="card-header">image approval application</p>
      <div className="carousel-container">
        <Carousel image={image} />
      </div>
      <RandomImage image={image} />
      <div className="card-footer">
        <ActionsWrapper image={image} />
      </div>
    </CardContainer>
  );
};

export default ImageApproval;

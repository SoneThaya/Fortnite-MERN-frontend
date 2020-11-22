import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { listTopItems } from "../actions/itemActions";

const ItemCarousel = () => {
  const dispatch = useDispatch();

  const itemTopRated = useSelector((state) => state.itemTopRated);
  const { loading, error, items } = itemTopRated;

  useEffect(() => {
    dispatch(listTopItems());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-info">
      {items.map((item) => (
        <Carousel.Item key={item._id}>
          <Link to={`/item/${item.manifestId}`}>
            <Image src={item.imageUrl} alt={item.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {item.name} ({item.vBucks} vBucks)
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ItemCarousel;

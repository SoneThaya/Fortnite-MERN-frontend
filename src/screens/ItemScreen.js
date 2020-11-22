import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listItemDetails } from "../actions/itemActions";

const ItemScreen = ({ match }) => {
  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
console.log(item)
  useEffect(() => {
    dispatch(listItemDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={item.imageUrl}
              alt={item.name}
              className="my-3 p-3 rounded bg-info"
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{item.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>{item.vBucks} vBucks</ListGroup.Item>
              <ListGroup.Item>Category: {item.storeCategory}</ListGroup.Item>
              <ListGroup.Item>Rarity: {item.rarity}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={item.rating}
                  text={`${item.numReviews} reviews`}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ItemScreen;

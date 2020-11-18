import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Rating from "../components/Rating";
import items from "../items";

const ItemScreen = ({ match }) => {
  const item = items.find((i) => i.manifestId === Number(match.params.id));
  console.log(item);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
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
              <Rating value={item.rating} text={`${item.numReviews} reviews`} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ItemScreen;

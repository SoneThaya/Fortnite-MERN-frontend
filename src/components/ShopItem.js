import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const ShopItem = ({ item }) => {
  return (
    <Card className="my-3 p-3 rounded bg-info">
      <Link to={`/item/${item._id}`}>
        <Card.Img src={item.imageUrl} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/item/${item._id}`}>
          <Card.Title as="div">
            <strong>{item.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={item.rating} text={`${item.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">{item.vBucks} vBucks</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShopItem;

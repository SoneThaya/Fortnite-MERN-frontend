import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const ShopItem = ({ item }) => {
  return (
    <Card className="my-3 p-3 rounded bg-info">
      <a href={`/item/${item.manifestId}`}>
        <Card.Img src={item.imageUrl} variant="top" />
      </a>

      <Card.Body>
        <a href={`/item/${item.manifestId}`}>
          <Card.Title as="div">
            <strong>{item.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <Rating value={item.rating} text={`${item.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">{item.vBucks} vBucks</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ShopItem;

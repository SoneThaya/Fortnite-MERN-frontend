import React from "react";
import { Row, Col } from "react-bootstrap";
import ShopItem from "../components/ShopItem";
import items from "../items";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Shop Items</h1>
      <Row>
        {items.map((item) => (
          <Col key={item.manifestId} sm={12} md={6} lg={4}>
            <ShopItem item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

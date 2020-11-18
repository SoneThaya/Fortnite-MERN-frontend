import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ShopItem from "../components/ShopItem";

const HomeScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("/api/items");

      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <>
      <h1>Shop Items</h1>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ShopItem from "../components/ShopItem";

const ShopScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FORTNITE_BACKEND}`, {
        headers: {
          "TRN-Api-Key": process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Fortnite Item Shop</h1>

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

export default ShopScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ShopItem from "../components/ShopItem";
import { listItems } from "../actions/itemActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);

  return (
    <>
      <h1>Fortnite Items</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item.manifestId} sm={12} md={6} lg={4}>
              <ShopItem item={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

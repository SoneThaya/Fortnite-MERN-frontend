import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ShopItem from "../components/ShopItem";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItems } from "../actions/itemActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  useEffect(() => {
    dispatch(listItems(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>All Fortnite Cosmetics</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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

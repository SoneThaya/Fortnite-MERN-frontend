import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listItemDetails, createItemReview } from "../actions/itemActions";
import { ITEM_CREATE_REVIEW_RESET } from "../constants/itemConstants";

const ItemScreen = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const itemReviewCreate = useSelector((state) => state.itemReviewCreate);
  const {
    success: successItemReview,
    error: errorItemReview,
  } = itemReviewCreate;

  useEffect(() => {
    if (successItemReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: ITEM_CREATE_REVIEW_RESET });
    }
    dispatch(listItemDetails(match.params.id));
  }, [dispatch, match, successItemReview]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createItemReview(match.params.id, { rating, comment }));
  };

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
        <>
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
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {item.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {item.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorItemReview && (
                    <Message variant="danger">{errorItemReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - weak</option>
                          <option value="2">2 - meh</option>
                          <option value="3">3 - okay</option>
                          <option value="4">4 - awesome</option>
                          <option value="5">5 - oh yeah</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="2"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ItemScreen;

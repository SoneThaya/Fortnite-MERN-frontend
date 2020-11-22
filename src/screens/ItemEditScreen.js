import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listItemDetails, updateItem } from "../actions/itemActions";
import { ITEM_UPDATE_RESET } from "../constants/itemConstants";

const ItemEditScreen = ({ match, history }) => {
  const itemId = match.params.id;

  console.log(itemId);
  const [name, setName] = useState("");
  const [manifestId, setManifestId] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [rarity, setRarity] = useState("");
  const [storeCategory, setStoreCategory] = useState("");
  const [vBucks, setVBucks] = useState(0);

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  console.log(item);

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ITEM_UPDATE_RESET });
      history.push("/admin/itemlist");
    } else {
      if (item.manifestId) {
        dispatch(listItemDetails(item.manifestId));
      } else {
        setName(item.name);
        setManifestId(item.manifestId);
        setImageUrl(item.imageUrl);
        setRarity(item.rarity);
        setStoreCategory(item.storeCategory);
        setVBucks(item.vBucks);
      }
    }
  }, [dispatch, history, itemId, item, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateItem({
        _id: itemId,
        name,
        manifestId,
        imageUrl,
        rarity,
        storeCategory,
        vBucks,
      })
    );
  };

  return (
    <>
      <Link to="/admin/itemlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Item</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="manifestId">
              <Form.Label>Manifest ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter manifest ID"
                value={manifestId}
                onChange={(e) => setManifestId(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="imageUrl">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image Url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="rarity">
              <Form.Label>Rarity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter rarity"
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="storeCategory">
              <Form.Label>Store Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store category"
                value={storeCategory}
                onChange={(e) => setStoreCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="vBucks">
              <Form.Label>vBucks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter vBucks"
                value={vBucks}
                onChange={(e) => setVBucks(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ItemEditScreen;

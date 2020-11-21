import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItems, deleteItem, createItem } from "../actions/itemActions";
import { ITEM_CREATE_RESET } from "../constants/itemConstants";

const ItemListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { loading, error, items } = itemList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = itemDelete;

  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    item: createdItem,
  } = itemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ITEM_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/item/${createdItem._id}/edit`);
    } else {
      dispatch(listItems());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdItem]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteItem(id));
    }
  };

  const createItemHandler = () => {
    dispatch(createItem());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Items</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createItemHandler}>
            <i className="fas fa-plus"></i> Create Item
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>MANIFESTID</th>
              <th>NAME</th>
              <th>RARITY</th>
              <th>STORE CATEGORY</th>
              <th>VBUCKS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.manifestId}>
                <td>{item.manifestId}</td>
                <td>{item.name}</td>
                <td>{item.rarity}</td>
                <td>{item.storeCategory}</td>
                <td>{item.vBucks} vBucks</td>

                <td>
                  <LinkContainer to={`/admin/item/${item.manifestId}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item.manifestId)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ItemListScreen;

import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listItems, deleteItem } from "../actions/itemActions";

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listItems());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteItem(id));
    }
  };

  const createItemHandler = (item) => {
    // create item
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

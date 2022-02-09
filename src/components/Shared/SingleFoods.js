import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleFoods = ({ item, handleDelete }) => {
  return (
    <>
      <tr>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>
          <Link to={`/food/${item._id}`}>
            <Button variant="info">Edit</Button>
          </Link>
          <Button
            onClick={() => handleDelete(item._id)}
            variant="danger"
            className="ms-2"
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default SingleFoods;

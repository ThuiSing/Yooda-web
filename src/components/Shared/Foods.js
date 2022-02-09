import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SingleFoods from "./SingleFoods";

const Foods = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    axios
      .get(
        `https://damp-atoll-85391.herokuapp.com/foods?page=${selectedPage}&&showPages=${limit}`
      )
      .then((res) => {
        setFoodItems(res.data.result);
        const count = res.data.count;
        const showPage = Math.ceil(count / limit);
        setPage(showPage);
        // console.log(res.data);
      });
  }, [selectedPage]);

  const handleDelete = (id) => {
    const confirm = window.confirm("are you sure Delete?");
    confirm &&
      axios
        .delete(`https://damp-atoll-85391.herokuapp.com/foods/delete/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            alert("successfully deleted");
            const existed = foodItems.filter((res) => res._id !== id);
            setFoodItems(existed);
          }
        });
  };

  return (
    <Container>
      <div className="d-flex  justify-content-between my-3">
        <h3>Food Items</h3>
        <Button
          onClick={() => setModalShow(true)}
          variant="info "
          className="px-3 text-white"
        >
          Add New Item
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <SingleFoods
                key={item._id}
                item={item}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          {[...Array(page).keys()].map((num) => (
            <button
              key={num}
              className={` px-4 py-2 border 
          ${selectedPage === num ? "text-white bg-dark" : "bg-white"}
          `}
              onClick={() => setSelectedPage(num)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Modal */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
};

export default Foods;

function MyVerticallyCenteredModal(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`https://damp-atoll-85391.herokuapp.com/foods`, data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("added Successfully");
          reset();
        }
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Enter Food Name</label>
            <input
              id="name"
              type="text"
              style={{ width: "100%" }}
              className="p-2 mb-2"
              {...register("name", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="price">Enter Food Price</label>
            <input
              id="price"
              type="number"
              style={{ width: "100%" }}
              className="p-2 mb-4"
              {...register("price", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <input type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
}

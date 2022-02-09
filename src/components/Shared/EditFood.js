import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TopNav from "./TopNav";

const EditFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/food/${id}`)
      .then((res) => setFood(res.data));
  }, [id]);
  const onSubmit = (data) => {
    data.id = food._id;
    // console.log(data);
    axios.put(`http://localhost:5000/food`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        alert("successfully Changed Data ");
      }
    });
  };
  return (
    <div>
      <TopNav />
      <Container>
        <div
          style={{ height: "90vh" }}
          className=" d-flex justify-content-center align-items-center"
        >
          <div className="bg-secondary p-5">
            <div>
              <h3>Edit your Content</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Enter Food Name</label>
              <input
                id="name"
                style={{ width: "100%" }}
                className="p-2 mb-3"
                defaultValue={food.name}
                {...register("name", { required: true })}
              />
              <label htmlFor="price">Enter Food Name</label>
              <input
                id="price"
                style={{ width: "100%" }}
                type="number"
                className="p-2 mb-3"
                defaultValue={food.price}
                {...register("price", { required: true })}
              />

              <input type="submit" />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditFood;

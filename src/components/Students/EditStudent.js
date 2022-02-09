import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TopNav from "../Shared/TopNav";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    axios
      .get(`https://damp-atoll-85391.herokuapp.com/students/${id}`)
      .then((res) => setStudent(res.data));
  }, [id]);
  const onSubmit = (data) => {
    data.id = student._id;
    // console.log(data);
    axios
      .put(`https://damp-atoll-85391.herokuapp.com/student`, data)
      .then((res) => {
        //   console.log(res);
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
                defaultValue={student.name}
                {...register("name", { required: true })}
              />
              <label htmlFor="class">Enter Class</label>
              <input
                id="class"
                style={{ width: "100%" }}
                className="p-2 mb-3"
                defaultValue={student.class}
                {...register("class", { required: true })}
              />
              <label htmlFor="roll">Enter Roll</label>
              <input
                id="roll"
                style={{ width: "100%" }}
                type="number"
                className="p-2 mb-3"
                defaultValue={student.roll}
                {...register("roll", { required: true })}
              />
              <label htmlFor="age">Enter Age</label>
              <input
                id="age"
                style={{ width: "100%" }}
                type="number"
                className="p-2 mb-3"
                defaultValue={student.age}
                {...register("age", { required: true })}
              />
              <label htmlFor="hall">Enter Hall</label>
              <input
                id="hall"
                style={{ width: "100%" }}
                type="number"
                className="p-2 mb-3"
                defaultValue={student.hall}
                {...register("hall", { required: true })}
              />

              <input type="submit" />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditStudent;

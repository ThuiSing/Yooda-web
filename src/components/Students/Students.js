import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import axios from "axios";
import TopNav from "../Shared/TopNav";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Students = () => {
  const [checkedId, setCheckedId] = useState([]);
  const [inActiveCheck, setInactiveCheck] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/students?page=${selectedPage}&&showPages=${limit}`
      )
      .then((res) => {
        setStudents(res.data.result);
        const count = res.data.count;
        const showPage = Math.ceil(count / limit);
        setPage(showPage);

        // console.log(res.data);
      });
  }, [selectedPage, checkedId]);

  // let mewId = [];
  const checkInput = (e, id) => {
    let mewId = [...checkedId];
    // console.log(e.target.checked);
    if (e.target.checked) {
      mewId.push(id);
    } else {
      mewId = checkedId.filter((res) => res !== id);
    }
    setCheckedId(mewId);
  };
  const inactiveCheck = (e, id) => {
    let mewId = [...inActiveCheck];
    // console.log(e.target.checked);
    if (e.target.checked) {
      mewId.push(id);
    } else {
      mewId = inActiveCheck.filter((res) => res !== id);
    }
    setInactiveCheck(mewId);
  };
  const handleActive = () => {
    const confirm = window.confirm(
      "are you sure to update this selected items ?"
    );
    confirm &&
      axios.put(`http://localhost:5000/students`, checkedId).then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("successfully changed");
        }
      });
  };
  const handleInactive = () => {
    const confirm = window.confirm(
      "are you sure to update this selected items ?"
    );
    // console.log(inActiveCheck);
    confirm &&
      axios
        .put(`http://localhost:5000/students/inactive`, inActiveCheck)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            alert("successfully changed");
          }
        });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("are you sure Delete?");
    confirm &&
      axios.delete(`http://localhost:5000/students/${id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          alert("successfully deleted");
          const existed = students.filter((res) => res._id !== id);
          setStudents(existed);
        }
      });
  };
  return (
    <div>
      <TopNav />
      <Container>
        <div className="d-flex  justify-content-between my-3">
          <h3>Students</h3>
          <Button
            onClick={() => setModalShow(true)}
            variant="info "
            className="px-3 text-white"
          >
            Add New Student
          </Button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Roll</th>
                <th>Class</th>
                <th>Age</th>
                <th>Hall</th>
                <th>Status</th>
                <th>
                  <Button onClick={handleActive}>active</Button>
                </th>
                <th>
                  <Button onClick={handleInactive}>InActive</Button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.class}</td>
                  <td>{student.age}</td>
                  <td>{student.hall}</td>
                  <td className="text-success">{student.status}</td>
                  <td>
                    <input
                      onChange={(e) => checkInput(e, student._id)}
                      className="form-check-input mt-0"
                      type="checkbox"
                      value=""
                      aria-label="Checkbox for following text input"
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) => inactiveCheck(e, student._id)}
                      className="form-check-input mt-0"
                      type="checkbox"
                      value=""
                      aria-label="Checkbox for following text input"
                    />
                  </td>
                  <td>
                    <Link to={`/student/${student._id}`}>
                      <Button variant="info">Edit</Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(student._id)}
                      variant="danger"
                      className="ms-1"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
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
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
};

export default Students;

function MyVerticallyCenteredModal(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.status = "inActive";
    axios.post(`http://localhost:5000/students`, data).then((res) => {
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
            <label htmlFor="name">Enter Name</label>
            <input
              id="name"
              type="text"
              style={{ width: "100%" }}
              className="p-2 mb-2"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="roll">Enter Roll</label>
            <input
              id="roll"
              type="number"
              style={{ width: "100%" }}
              className="p-2 mb-4"
              {...register("roll", { required: true })}
            />
            {errors.roll && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="age">Enter Age</label>
            <input
              id="age"
              type="number"
              style={{ width: "100%" }}
              className="p-2 mb-4"
              {...register("age", { required: true })}
            />
            {errors.age && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="class">Enter Class</label>
            <input
              id="class"
              style={{ width: "100%" }}
              className="p-2 mb-4"
              {...register("class", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="hall">Enter Hall no</label>
            <input
              id="hall"
              style={{ width: "100%" }}
              className="p-2 mb-4"
              {...register("hall", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <input type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
}

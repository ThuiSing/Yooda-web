import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SelectFoods from "./SelectFoods";

const DistributionForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [message, setMessage] = useState("");
  const limit = 6;
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

  const handleSelectFood = (food) => {
    let newFoods = [...selectedFood];
    const filter = selectedFood.filter((data) => data._id === food._id);
    if (filter.length > 0) {
      return;
    } else {
      newFoods.push(food);
    }
    setSelectedFood(newFoods);
  };

  const onSubmit = (data) => {
    data.studentName = props.studentName;
    data.status = "served";
    data.foodItemList = selectedFood;

    // console.log(selectedFood);
    // console.log(data);
    axios
      .post(`https://damp-atoll-85391.herokuapp.com/distribution`, data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("successfully served");
          setMessage("");
        } else if (res.data.message) {
          setMessage(res.data.message);
        }
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Distributions Forms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="studentID">Student Id</label>
              <input
                id="studentID"
                style={{ width: "100%" }}
                className="p-2 mb-3"
                placeholder="Student Id"
                value={props.studentId}
                {...register("studentId", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>

              <input
                id="date"
                style={{ width: "100%" }}
                className="p-2 mb-3"
                type="date"
                placeholder="Enter Date"
                {...register("date", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="shift">Select Shift</label>
              <select
                id="shift"
                style={{ width: "100%" }}
                className="p-2 mb-3"
                placeholder="Enter Shift"
                defaultValue="morning"
                {...register("shift", { required: true })}
              >
                <option selected value="morning">
                  Morning
                </option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div className="mb-3">
              <h5>Select food</h5>
              <Row lg={3}>
                {foodItems.map((food) => (
                  <SelectFoods
                    key={food._id}
                    handleSelectFood={handleSelectFood}
                    food={food}
                  />
                ))}
              </Row>
              <div className="text-end">
                {[...Array(page).keys()].map((num) => (
                  <span
                    style={{ cursor: "pointer" }}
                    key={num}
                    className={`  px-2 border pointer 
                ${selectedPage === num ? "text-black bg-secondary" : "bg-white"}
                `}
                    onClick={() => setSelectedPage(num)}
                  >
                    {num + 1}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="bg-danger text-white ">{message}</p>
            </div>
            <button type="submit"> Submit </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DistributionForm;

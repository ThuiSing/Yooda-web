import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TopNav from "../Shared/TopNav";

const Served = () => {
  //
  const [servedList, setServedList] = useState([]);

  useEffect(() => {
    axios
      .get(` https://damp-atoll-85391.herokuapp.com/distribution`)
      .then((res) => setServedList(res.data));
  }, []);

  console.log(servedList);
  return (
    <div>
      <TopNav />
      <Container>
        <h3>Served List</h3>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Date Served</th>
              <th>Shift</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {servedList.map((ser) => (
              <tr key={ser._id}>
                <td>{ser.studentId}</td>
                <td>{ser.studentName}</td>
                <td>{ser.date}</td>
                <td>{ser.shift}</td>
                <td className="text-success">
                  {ser.status} &#40; {ser.foodItemList.length} items &#41;
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Served;

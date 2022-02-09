import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import TopNav from "../Shared/TopNav";
import SingleServeStudent from "./SingleServeStudent";

const Serve = () => {
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState(students);
  const [inValue, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const limit = 5;
  const [show, setShow] = useState(false);
  const [mess, setMess] = useState("false");

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/students?page=${selectedPage}&&showPages=${limit}`
      )
      .then((res) => {
        setStudents(res.data.result);
        setNewStudents(res.data.result);
        const count = res.data.count;
        const showPage = Math.ceil(count / limit);
        setPage(showPage);
        setShow(true);
        setMess("");

        // console.log(res.data);
      });
  }, [selectedPage]);
  // console.log(props);
  const handleChnage = (e) => {
    setValue(e.target.value);
  };
  const handleSub = () => {
    if (inValue) {
      axios.get(`http://localhost:5000/student/roll/${inValue}`).then((res) => {
        if (res.data < 1) {
          setMess("No students Found");
          setNewStudents([]);
        } else {
          setMess("");
          setNewStudents(res.data);
        }
        setShow(false);
      });
    } else {
      setNewStudents(students);
      setShow(true);
      setMess("");
    }
  };

  return (
    <div>
      <TopNav />
      <Container>
        <h2>Search student</h2>
        <div>
          <input
            onChange={handleChnage}
            type="number"
            className="p-1"
            placeholder="search by roll number"
          />
          <Button onClick={handleSub} variant="info" className="ms-2 p-1">
            search
          </Button>
        </div>
        <div>
          <h3>Students :</h3>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {newStudents.map((student) => (
                  <SingleServeStudent key={student._id} student={student} />
                ))}
              </tbody>
            </Table>
            <p className="text-danger">{mess}</p>
          </div>
        </div>
        {show && (
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
        )}
      </Container>
    </div>
  );
};

export default Serve;

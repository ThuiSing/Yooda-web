import React from "react";
import { Button } from "react-bootstrap";
import DistributionForm from "./DistributionForm";

const SingleServeStudent = ({ student }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <tr key={student._id}>
        <td>{student.name}</td>
        <td>{student.roll}</td>
        <td>{student.class}</td>
        <td style={{ width: "10rem" }}>
          <Button
            onClick={() => {
              setModalShow(true);
            }}
            variant="secondary"
            className="ms-2 p-1"
          >
            serve now
          </Button>
        </td>
      </tr>
      <DistributionForm
        show={modalShow}
        studentId={student._id}
        studentName={student.name}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SingleServeStudent;

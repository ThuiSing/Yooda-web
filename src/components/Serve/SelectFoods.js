import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";

const SelectFoods = ({ food, handleSelectFood }) => {
  const [disable, setDisabel] = useState(false);
  const handleSelectFoods = (food) => {
    setDisabel(true);
    handleSelectFood(food);
  };
  return (
    <Col>
      <Button
        variant="secondary"
        disabled={disable}
        onClick={() => handleSelectFoods(food)}
        className="m-2"
      >
        {food.name}
      </Button>
    </Col>
  );
};

export default SelectFoods;

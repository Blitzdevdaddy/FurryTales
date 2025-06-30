import { Link } from "react-router-dom";
import React from "react";
import categories from "./CategoriesList";
import { ButtonGroup, Button } from "react-bootstrap";
import './Categories.css';

function Categories(props) {
  const { selectedCategory, handleCategory } = props;

  return (
    <div className="cat-container d-flex justify-content-between bg-light p-3">
      

      <ButtonGroup>
        <Button
          variant="light"
          onClick={() => handleCategory(null)}
          className={`category ${!selectedCategory ? "active" : ""}`}
        >
          All Categories
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategory("cats")}
          className={`category ${selectedCategory === "cat" ? "active" : ""}`}
        >
          Cats
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategory("dogs")}
          className={`category ${selectedCategory === "dog" ? "active" : ""}`}
        >
          Dogs
        </Button>
        <Button
          variant="light"
          onClick={() => handleCategory("birds")}
          className={`category ${selectedCategory === "birds" ? "active" : ""}`}
        >
          Birds
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        {!!localStorage.getItem("token") && (
          <Button
          variant="warning"
          style={{
            backgroundColor: "#34495E",
            borderColor: "#34495E",
            transition: "background-color 0.3s",
          }}
          className="hover-lighten"
        >
            <Link to="/add-pet" className="text-white" style={{textDecoration:'none'}}>
              ADD PET
            </Link>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

export default Categories;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Categories from "./Categories";
import axios from "axios";
import { Card , Col, Row} from "react-bootstrap";

function Adopt() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);  

  useEffect(() => {
    applyFilters();
  }, [search, selectedCategory, pets]);  

  const fetchData = () => {
    const url = 'http://localhost:4000/get-pets';
    axios.get(url)
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.pets) {
          setPets(res.data.pets);
        }
      })
      .catch((err) => {
        console.log("API Error:", err);
        alert('Server error');
      });
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategory = (value) => {
    setSelectedCategory(value);
  };

  const applyFilters = () => {
    let filteredPets = pets || [];

    if (search || selectedCategory) {
      const searchTerm = search.toLowerCase();
      filteredPets = pets.filter((item) =>
        item.category.toLowerCase().includes(searchTerm)
      );

      if (selectedCategory) {
        filteredPets = filteredPets.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    setFilteredPets(filteredPets);
  };

  const handlePet = (id) => {
    navigate('/pet/' + id);
  };

  return (
    <div>
      <Header search={search} handlesearch={handleSearch} handleClick={applyFilters} />
      <Categories handleCategory={handleCategory} selectedCategory={selectedCategory} />

      <h2>MY PETS: </h2>
      <Row>
        {filteredPets.length > 0 ?
          (filteredPets.map((item, index) => (
            <Col md={4} key={index}>
              <Card onClick={() => handlePet(item._id)} style={{height:'600px'}}>
                <Card.Img width="300px" height="200px" src={`http://localhost:4000/${item.pimage}`} alt="" />
                <Card.Body>
                  <Card.Title>{item.pname} | {item.category}</Card.Title>
                  <Card.Text className="text-danger">{item.price}</Card.Text>
                  <Card.Text className="text-success">{item.pdesc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))) :
          (<Col md={12}><p>No matching pets found.</p></Col>)
        }
      </Row>
    </div>
  );
}

export default Adopt;

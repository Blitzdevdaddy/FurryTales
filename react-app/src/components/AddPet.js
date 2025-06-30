import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPet() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [pimage, setPimage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('contactNumber', contactNumber); // Append contact number to form data
        formData.append('pimage', pimage);

        const url = 'http://localhost:4000/add-pet';

        axios.post(url, formData)
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/adopt');
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Error adding pet. Please try again.');
            });
    }

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2>ADD PET</h2>
                <label>Pet Name</label>
                <input className="form-control" type='text' value={pname} onChange={(e) => setPname(e.target.value)} />
                <label>Pet Description</label>
                <input className="form-control" type='text' value={pdesc} onChange={(e) => setPdesc(e.target.value)} />
                <label>Pet Price</label>
                <input className="form-control" type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                <label>Pet Category</label>
                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Select--</option>
                    <option>Cat</option>
                    <option>Dog</option>
                    <option>Birds</option>
                </select>
                <label>Contact Number</label>
                <input className="form-control" type='text' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

                <label>Pet Image</label>
                <input className="form-control" type="file" onChange={(e) => setPimage(e.target.files[0])} />

                <button onClick={handleApi} className="btn btn-danger mt-3">SUBMIT</button>
            </div>
        </div>
    );
}

export default AddPet;

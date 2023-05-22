import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clothes = () => {
    const [clothes, setClothes] = useState([]);
    const [selectedCloth, setSelectedCloth] = useState({});

    useEffect(() => {
        getClothes();
    }, []);

    const getClothes = () => {
        axios.get('http://localhost:5000/clothes')
            .then(response => setClothes(response.data))
            .catch(error => console.error('Error fetching clothes:', error));
    };

    const getClothById = (id) => {
        axios.get(`http://localhost:5000/clothes/${id}`)
            .then(response => setSelectedCloth(response.data))
            .catch(error => console.error('Error fetching clothing item:', error));
    };

    const updateCloth = (id, cloth) => {
        axios.put(`http://localhost:5000/clothes/${id}`, cloth)
            .then(() => getClothes())
            .catch(error => console.error('Error updating clothing item:', error));
    };

    return (
        <div>
            <h2>All Clothes</h2>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {clothes.map(cloth => (
                    <div key={cloth["id"]}>
                        <span>{cloth["name"]} - {cloth["type"]}</span>
                        <button onClick={() => getClothById(cloth["id"])}>Edit</button>
                    </div>
                ))}
            </div>

            {selectedCloth["id"] &&
                <div>
                    <h2>Edit Clothing Item</h2>
                    <input type="number" value={selectedCloth["grade"]} onChange={(e) => setSelectedCloth({ ...selectedCloth, grade: e.target.value })} />
                    <button onClick={() => updateCloth(selectedCloth["id"], selectedCloth)}>Update</button>
                    <button onClick={() => setSelectedCloth({})}>Cancel Editing</button>
                </div>
            }
        </div>
    );
};

export default Clothes;

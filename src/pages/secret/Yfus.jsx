import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Yfus = () => {
    const [yfus, setYfus] = useState([]);
    const [selectedYfu, setSelectedYfu] = useState({});

    useEffect(() => {
        getYfus();
    }, []);

    const getYfus = () => {
        axios.get(`${process.env.REACT_APP_YFU_SERVER_URL}/yfus`)
            .then(response => setYfus(response.data))
            .catch(error => console.error('Error fetching yfus:', error));
    };

    const getYfuById = (id) => {
        axios.get(`${process.env.REACT_APP_YFU_SERVER_URL}/yfus/${id}`)
            .then(response => setSelectedYfu(response.data))
            .catch(error => console.error('Error fetching yfu:', error));
    };

    const updateYfu = (id, yfu) => {
        axios.put(`${process.env.REACT_APP_YFU_SERVER_URL}/yfus/${id}`, yfu)
            .then(() => getYfus())
            .catch(error => console.error('Error updating yfu:', error));
    };

    const deleteYfu = (id) => {
        axios.delete(`${process.env.REACT_APP_YFU_SERVER_URL}/yfus/${id}`)
            .then(() => getYfus())
            .catch(error => console.error('Error deleting yfu:', error));
    };

    return (
        <div>
            <h2>All Yfus</h2>
            {yfus.map(yfu => (
                <div key={yfu["id"]}>
                    <span>{yfu["prenom"]} {yfu["nom"]} - {yfu["phrase"]}</span>
                    <button onClick={() => getYfuById(yfu["id"])}>Edit</button>
                    <button onClick={() => deleteYfu(yfu["id"])}>Delete</button>
                </div>
            ))}

            {selectedYfu["id"] &&
                <div>
                    <h2>Edit Yfu</h2>
                    <input type="text" value={selectedYfu["prenom"]} onChange={(e) => setSelectedYfu({ ...selectedYfu, prenom: e.target.value })} />
                    <input type="text" value={selectedYfu["nom"]} onChange={(e) => setSelectedYfu({ ...selectedYfu, prenom: e.target.value })} />
                    <input type="text" value={selectedYfu["phrase"]} onChange={(e) => setSelectedYfu({ ...selectedYfu, phrase: e.target.value })} />
                    <input type="number" value={selectedYfu["height"]} onChange={(e) => setSelectedYfu({ ...selectedYfu, height: e.target.value })} />
                    <button onClick={() => updateYfu(selectedYfu["id"], selectedYfu)}>Update</button>
                    <button onClick={() => setSelectedYfu({})}>Cancel Editing</button>
                </div>
            }
        </div>
    );
};

export default Yfus;

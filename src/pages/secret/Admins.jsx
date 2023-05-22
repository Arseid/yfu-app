import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdminId, setNewAdminId] = useState('');

    useEffect(() => {
        getAdmins();
    }, []);

    const getAdmins = () => {
        axios.get('http://localhost:5000/admins')
            .then(response => setAdmins(response["data"]["admins"]))
            .catch(error => console.error('Error fetching admins:', error));
    };

    const addAdmin = (userId) => {
        axios.post(`http://localhost:5000/admins/${userId}`)
            .then(() => {
                getAdmins();
                setNewAdminId('');
            })
            .catch(error => console.error('Error adding admin:', error));
    };

    const removeAdmin = (userId) => {
        axios.delete(`http://localhost:5000/admins/${userId}`)
            .then(() => getAdmins())
            .catch(error => console.error('Error removing admin:', error));
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        addAdmin(newAdminId);
    };

    return (
        <div>
            <h2>Admins</h2>
            <ul>
                {admins.map(adminId =>
                    <li key={adminId}>
                        {adminId}
                        <button onClick={() => removeAdmin(adminId)} style={{marginLeft: "15px"}}>Remove Admin</button>
                    </li>
                )}
            </ul>
            <form onSubmit={handleAddAdmin}>
                <input type="text" placeholder="New Admin User ID" value={newAdminId} onChange={(e) => setNewAdminId(e.target.value)} required />
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default Admins;

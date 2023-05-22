import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [newClothInput, setNewClothInput] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:5000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(() => getUsers())
            .catch(error => console.error('Error deleting user:', error));
    };

    const updateUser = (id) => {
        axios.put(`http://localhost:5000/users/${id}`, {username: selectedUser["username"], coins: selectedUser["coins"]})
            .then(() => getUsers())
            .catch(error => console.error('Error deleting user:', error));
    }

    const addClothToUsers = (userId, clothId) => {
        axios.post(`http://localhost:5000/users/${userId}/clothes/${clothId}`)
            .then(() => getUsers())
            .catch(error => console.error('Error deleting user:', error));
    }

    const deleteClothToUsers = (userId, clothId) => {
        axios.delete(`http://localhost:5000/users/${userId}/clothes/${clothId}`)
            .then(() => {
                setSelectedUser(prevUser => ({...prevUser, clothes: prevUser.clothes.filter(cloth => cloth !== clothId)}));
                getUsers();
            })
            .catch(error => console.error('Error deleting cloth to user:', error));
    }

    const handleEdit = (user) => {
        setEdit(true);
        setSelectedUser(user);
    };

    return (
        <div>
            <h2>All users</h2>
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        {user["username"]}
                        <button onClick={() => handleEdit(user)} style={{marginLeft: "15px"}}>Edit</button>
                        <button onClick={() => deleteUser(user.id)} style={{marginLeft: "15px"}}>Delete</button>
                    </li>
                )}
            </ul>
            {edit &&
                <div>
                    <h2>Edit selected user's info</h2>
                    <form onSubmit={() => updateUser(selectedUser["id"])}>
                        <label>Username</label>
                        <input type="text" placeholder="Username" value={selectedUser["username"]} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} required />
                        <label>Coins</label>
                        <input type="number" placeholder="Name" value={selectedUser["coins"]} onChange={(e) => setSelectedUser({ ...selectedUser, coins: e.target.value })} required />
                        <button type="submit">Update User</button>
                    </form>

                    <h2>Edit select user's acquired clothes</h2>
                    <label>Clothes</label>
                    <input type="text" placeholder="New Cloth" value={newClothInput} onChange={(e) => setNewClothInput(e.target.value)} />
                    {newClothInput &&
                        <button onClick={()=>addClothToUsers(selectedUser["id"], newClothInput)}>Add Cloth Item</button>
                    }
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {selectedUser.clothes.map((item, index) => (
                            <div key={index}>
                                {item}
                                <button onClick={() => deleteClothToUsers(selectedUser["id"], item)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setEdit(false)}>Cancel Editing</button>
                </div>
            }
        </div>
    );
};

export default Users;

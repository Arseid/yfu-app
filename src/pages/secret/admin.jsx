import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import {MenuItem, Select} from "@mui/material";
import Users from "./Users";

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [selectedData, setSelectedData] = useState("users");
    const user = useContext(UserContext);

    useEffect(() => {
        axios.get("http://localhost:5000/admins")
            .then((response) => {
                setAdminList(response["data"]["admins"]);
                if (adminList.includes(user["uid"])) setIsAdmin(true);
            })
            .catch((error) => console.error(error));
    }, [adminList, user]);

    if (!isAdmin) {
        return <p>You must be an admin to view this page.</p>;
    }

    const handleChange = (event) => {
        setSelectedData(event.target.value);
    };

    return (
        <div>
            <h1>Welcome, admin!</h1>
            <span>Data to interact with:</span>
            <Select defaultValue="users" onChange={handleChange} style={{minWidth: 100, marginLeft: "15px"}}>
                <MenuItem value="users">Users</MenuItem>
                <MenuItem value="admins">Admins</MenuItem>
                <MenuItem value="clothes">Clothes</MenuItem>
                <MenuItem value="yfus">Yfus</MenuItem>
            </Select>
            {selectedData === "users" &&
                <Users/>
            }
            {selectedData === "admins" &&
                <div>
                    Admins data
                </div>
            }
            {selectedData === "clothes" &&
                <div>
                    Clothes data
                </div>
            }
            {selectedData === "yfus" &&
                <div>
                    Yfus data
                </div>
            }
        </div>
    );
};

export default AdminPage;

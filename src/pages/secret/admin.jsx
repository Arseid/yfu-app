import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminList, setAdminList] = useState([]);
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

    return (
        <div>
            <h1>Welcome, admin!</h1>
        </div>
    );
};

export default AdminPage;

import React from 'react';

const UserDataContext = React.createContext({
    userData: null,
    setUserData: () => {},
});

export default UserDataContext;

import React, { useState, useEffect } from "react";
import {
    BrowserRouter, Link,
    Route,
    Routes,
} from "react-router-dom";
import Home from "./pages/home/home";
import Gacha from "./pages/gacha/gacha";
import Minigames from "./pages/minigames/minigames";
import { Box, Stack } from "@mui/material";
import yfu_logo from "./assets/brand/svg/yfu-icon.svg";
import YFUNavButton from "./components/buttons/YFUNavButton";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import UserContext from './context/UserContext';

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
            <Stack
                className="App"
                direction={"column"}
                sx={{
                    height: '100vh',
                    width: '100vw',
                    backgroundImage: 'linear-gradient(to bottom, #FEF, #FCE)',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                }}
            >
                    <Box sx={{
                    height: "100%", p: '1rem', pb: '7rem',
                    boxSizing: 'border-box'
                }}>
                            {user ? (
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/minigames' element={<Minigames />} />
                                    <Route path='/gacha' element={<Gacha />} />
                                    <Route path='/signup' element={<Signup />} />
                                </Routes>
                            ) : (
                                <Routes>
                                    <Route path='/' element={<Login />} />
                                    <Route path='/signup' element={<Signup />} />
                                </Routes>
                            )}
                        </Box>
                <Box
                    className="nav"
                    sx={{
                        p: "1rem",
                        background: 'radial-gradient(58.28% 942.92% at 50% -526.89%, #FFFFFF 57.7%, transparent 100%)',
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Link to="/" style={{ position: 'absolute', bottom: '0', height: '150px', left: 'auto', right: 'auto' }}>
                            <img src={yfu_logo} height={"100%"} alt="Y" />
                        </Link>
                        <Stack direction={'row'} spacing={'2rem'} justifyContent={'space-around'}>
                            <Link to='/'><YFUNavButton tooltip='Dressing' pathname={"/"} /></Link>
                            <Link to='/gacha'><YFUNavButton tooltip='Gacha' pathname={"/gacha"} /></Link>

                            <div style={{ width: '150px' }}>

                            </div>
                            <Link to='/minigames'><YFUNavButton tooltip='Mini Games' pathname={"/minigames"} /></Link>
                            <YFUNavButton tooltip='Options' />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;

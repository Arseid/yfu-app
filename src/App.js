import React, { useState, useEffect } from "react";
import {
    BrowserRouter, Link,
    Route,
    Routes,
} from "react-router-dom";
import Home from "./pages/home/home";
import Gacha from "./pages/gacha/gacha";
import Minigames from "./pages/minigames/minigames";
import { AppBar, Box, Stack } from "@mui/material";
import yfu_logo from "./assets/brand/svg/yfu-icon.svg";
import YFUNavButton from "./components/YFUNavButton";
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
                <Box className="App" sx={{ backgroundImage: 'linear-gradient(to bottom, #FEF, #FCE)' }}>
                    <Stack direction={"column"} className="Home" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                        <Box sx={{ height: "100%", p: '1rem' }}>
                            {user ? (
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/minigames' element={<Minigames />} />
                                    <Route path='/gacha' element={<Gacha />} />
                                </Routes>
                            ) : (
                                <Routes>
                                    <Route path='/' element={<Login />} />
                                    <Route path='/signup' element={<Signup />} />
                                </Routes>
                            )}
                        </Box>
                        <AppBar sx={{
                            boxShadow: 'none',
                            p: "1rem",
                            position: "relative",
                            background: 'radial-gradient(58.28% 942.92% at 50% -526.89%, #FFFFFF 57.7%, transparent 100%)'
                        }}>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <Link to="/" style={{ position: 'absolute', bottom: '0', height: '150px' }}>
                                    <img src={yfu_logo} height={"100%"} alt="logo" />
                                </Link>

                                <Stack direction={'row'} spacing={'2rem'} justifyContent={'space-around'}>
                                    <Link to='/'><YFUNavButton tooltip='Dressing' pathname={"/"} /></Link>
                                    <Link to='/gacha'><YFUNavButton tooltip='Gacha' pathname={"/gacha"} /></Link>
                                    <div style={{ width: '150px' }} />
                                    <Link to='/minigames'><YFUNavButton tooltip='Mini Games' pathname={"/minigames"} /></Link>
                                    <YFUNavButton tooltip='Option' />
                                </Stack>
                            </Stack>
                        </AppBar>
                    </Stack>
                </Box>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;

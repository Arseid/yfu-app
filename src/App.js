import React, { useState, useEffect } from "react";
import {
    BrowserRouter, Link,
    Route,
    Routes,
} from "react-router-dom";
import Home from "./pages/home/home";
import Gacha from "./pages/gacha/gacha";
import Minigames from "./pages/minigames/minigames";
import { Box, IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import yfu_logo from "./assets/brand/svg/yfu-icon.svg";
import YFUNavButton from "./components/buttons/YFUNavButton";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import UserContext from './context/UserContext';
import music from "./assets/Kawaii-BadSnacks.mp3";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import Profile from './pages/profile/profile';
import About from "./pages/about/about";

function App() {
    const [burgerMenuAnchorEl, setBurgerMenuAnchorEl] = useState(null);
    const openBurgerMenu = Boolean(burgerMenuAnchorEl);
    const handleBurgerButtonClick = (event) => {
        setBurgerMenuAnchorEl(event.currentTarget);
    };
    const handleBurgerMenuClose = () => {
        setBurgerMenuAnchorEl(null);
    };

    const [user, setUser] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleTogglePlay = () => {
        const audioElement = audioRef.current;
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

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
                    <Box sx={{ position: 'absolute', bottom: "1rem", left: "1rem", zIndex: 2 }}>
                        <audio ref={audioRef} src={music} loop />
                        <Tooltip title="Music">
                            <IconButton onClick={handleTogglePlay} sx={{
                                color: '#FFF',
                                bgcolor: '#F7F',
                                '&:hover': {
                                    bgcolor: '#F7F',
                                    boxShadow: '0 0 0 0.5rem #FFF'
                                }
                            }}>
                                {isPlaying ? <VolumeUp /> : <VolumeOff />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{
                        height: "100%", p: '1rem', pb: '7rem',
                        boxSizing: 'border-box'
                    }}>
                        {user ? (
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/minigames' element={<Minigames />} />
                                <Route path='/gacha' element={<Gacha />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/signup' element={<Signup />} />
                            </Routes>
                        ) : (
                            <Routes>
                                <Route path='/' element={<Login />} />
                                <Route path='/signup' element={<Signup />} />
                            </Routes>
                        )}
                    </Box>
                    <>
                        {user && (<Box
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
                                    <YFUNavButton tooltip='Options' onClick={handleBurgerButtonClick} />
                                </Stack>
                            </Stack>
                            <Menu
                                id="basic-menu"
                                anchorEl={burgerMenuAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openBurgerMenu}
                                onClose={handleBurgerMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                            <Link to='/profile'><MenuItem onClick={handleBurgerMenuClose}>Profile</MenuItem></Link>
                            <Link to='/about'><MenuItem onClick={handleBurgerMenuClose}>About</MenuItem></Link>
                            <MenuItem onClick={handleBurgerMenuClose}>Logout</MenuItem>
                        </Menu>
                        </Box>)}
                </>
            </Stack>
        </BrowserRouter>
        </UserContext.Provider >
    );
}

export default App;

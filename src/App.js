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
import UserDataContext from "./context/UserDataContext";
import music from "./assets/Kawaii-BadSnacks.mp3";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import axios from "axios";
import ClothesContext from "./context/ClothesContext";
import YfusContext from "./context/YfusContext";
import Profile from './pages/profile/profile';
import About from "./pages/about/about";

function App() {
    const [burgerMenuAnchorEl, setBurgerMenuAnchorEl] = useState(null);
    const openBurgerMenu = Boolean(burgerMenuAnchorEl);
    const handleBurgerButtonClick = (event) => {
        setBurgerMenuAnchorEl(event.currentTarget);
    };
    const handleBurgerMenuClose = (action) => {
        setBurgerMenuAnchorEl(null);

        if (action === 'profile') {
            console.log('Profile clicked');
        }
        else if (action === 'about') {
            console.log('About clicked');
        }
        else if (action === 'logout') {
            auth.signOut()
                .then(() => {
                    console.log('User signed out successfully');
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        }
    };

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [allClothes, setAllClothes] = useState([]);
    const [yfus, setYfus] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();
    const [outfits, setOutfits] = useState(
        userData && userData["outfits"]
            ? userData["outfits"]
            : {
                Lesley: {
                    hats: {},
                    glasses: {},
                    overcoats: {},
                    tops: {},
                    bottoms: {},
                    hosiery: {},
                    shoes: {},
                    dresses: {},
                },
                Tiva: {
                    hats: {},
                    glasses: {},
                    overcoats: {},
                    tops: {},
                    bottoms: {},
                    hosiery: {},
                    shoes: {},
                    dresses: {},
                },
            }
    );

    const outfitsUpdateHandler = (newOutfits) => {
        setOutfits(newOutfits);
        axios
            .put(`http://localhost:5000/users/${user["uid"]}`, { outfits: newOutfits })
            .catch((error) => {
                console.error("Failed to update user current outfits:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                axios.get(`http://localhost:5000/users/${currentUser["uid"]}`)
                    .then((res) => {
                        setUserData(res["data"]);

                        const fetchedOutfits = res["data"]["outfits"];
                        if (fetchedOutfits) {
                            setOutfits(fetchedOutfits);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });

                axios.get("http://localhost:5000/clothes")
                    .then((response) => {
                        setAllClothes(response["data"]);
                    })
                    .catch((error) => console.error(error));

                axios.get("http://localhost:5000/yfus")
                    .then((response) => {
                        setYfus(response["data"]);
                    })
                    .catch((error) => console.error(error));
            }
            else {
                setUserData(null);
            }
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
            <UserDataContext.Provider value={{ userData, setUserData }}>
                <YfusContext.Provider value={yfus}>
                    <ClothesContext.Provider value={allClothes}>
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
                                        {user && userData ? (
                                            <Routes>
                                                <Route path='/' element={<Home outfits={outfits} onOutfitsUpdate={outfitsUpdateHandler}/>} />
                                                <Route path='/minigames' element={<Minigames />} />
                                                <Route path='/profile' element={<Profile />} />
                                                <Route path='/about' element={<About />} />
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
                                <>
                                    {user && userData && allClothes &&  (<Box
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
                                            open={openBurgerMenu}
                                            onClose={handleBurgerMenuClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleBurgerMenuClose('profile')}>Profile</MenuItem>
                                            <MenuItem onClick={() => handleBurgerMenuClose('about')}>About</MenuItem>
                                            <MenuItem onClick={() => handleBurgerMenuClose('logout')}>Logout</MenuItem>
                                        </Menu>
                                    </Box>)}
                                </>
                            </Stack>
                        </BrowserRouter>
                    </ClothesContext.Provider>
                </YfusContext.Provider>
            </UserDataContext.Provider>
        </UserContext.Provider>
    );
}

export default App;

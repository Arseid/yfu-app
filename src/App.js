import React from "react";
import {
    BrowserRouter, Link,
    Route,
    Routes
} from "react-router-dom";
import Home from "./pages/home/home";
import Gacha from "./pages/gacha/gacha";
import Minigames from "./pages/minigames/minigames";
import { AppBar, Box, Stack } from "@mui/material";
import yfu_logo from "./assets/brand/svg/yfu-icon.svg";
import YFUNavButton from "./components/YFUNavButton";

function App() {

    return (
        <BrowserRouter>
            <Box className="App" sx={{ backgroundImage: 'linear-gradient(to bottom, #FEF, #FCE)' }}>
                <Stack direction={"column"} className="Home" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                    <Box sx={{ height: "100%" }}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/minigames' element={<Minigames />} />
                            <Route path='/gacha' element={<Gacha />} />
                        </Routes>
                    </Box>
                    <AppBar sx={{
                        boxShadow: 'none',
                        p: "1rem",
                        height: "80px",
                        position: "relative",
                        background: 'radial-gradient(58.28% 942.92% at 50% -526.89%, #FFFFFF 57.7%, transparent 100%)'
                    }}>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Link to="/" style={{ position: 'absolute', bottom: '0' }}>
                                <img src={yfu_logo} height={"100px"} />
                            </Link>

                            <div>
                                <Link to='/'><YFUNavButton variant="contained">Home</YFUNavButton></Link>
                                <Link to='/gacha'>Gacha</Link>
                                <Link to='/minigames'>Minigames</Link>
                            </div>
                        </Stack>
                    </AppBar>
                </Stack>
            </Box>
        </BrowserRouter>
    );
}

export default App;

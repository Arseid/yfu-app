import React from "react";
import {
    BrowserRouter, Link,
    Route,
    Routes
} from "react-router-dom";
import Home from "./pages/home/home";
import Gacha from "./pages/gacha/gacha";
import Minigames from "./pages/minigames/minigames";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/minigames' element={<Minigames/>}/>
                    <Route path='/gacha' element={<Gacha/>}/>
                </Routes>
                <div style={{bottom: 0, position: "absolute", left:0, right: 0}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Link to='/'>Home</Link>
                        <Link to='/gacha'>Gacha</Link>
                        <Link to='/minigames'>Minigames</Link>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

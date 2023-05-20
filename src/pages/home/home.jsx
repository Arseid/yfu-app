import {Box, Button, Grid, NativeSelect, Paper, Stack} from "@mui/material";
import React, {useEffect} from "react";
import CharacterHeadButton from "../../components/sprites/characters/CharacterHeadButton";
import DressingView from "../../components/sprites/DressingView";
import {useState} from "react";
import axios from "axios";
import ClothingSprite from "../../components/sprites/clothes/ClothingSprite";

const clothesTypes = [
    "hats",
    "glasses",
    "tops",
    "overcoats",
    "bottoms",
    "hosiery",
    "shoes",
    "dresses",
];

const clothesTypesSingular = [
    "hat",
    "glasses",
    "top",
    "overcoat",
    "bottom",
    "hosiery",
    "shoe",
    "dress",
];

const faces = ["front", "right", "back", "left"];

function getNextFace(face) {
    const faceIndex = faces.indexOf(face);
    if (faceIndex === 3) return faces[0];
    else return faces[faceIndex + 1];
}

function getPreviousFace(face) {
    const faceIndex = faces.indexOf(face);
    if (faceIndex === 0) return faces[3];
    else return faces[faceIndex - 1];
}

const Home = () => {
    const [clothes, setClothes] = useState(null);
    const [currentCharacter, setCurrentCharacter] = useState("Lesley");
    const [face, setFace] = useState("front");
    const [inventoryClothesType, setInventoryClothesType] = useState(clothesTypes[0]);
    const [outfit, setOutfit] = useState(
        {
            hat:{},
            glasses:{},
            overcoat:{},
            top:{},
            bottom:{},
            hosiery:{},
            shoe:{},
            dress:{}
        }
    );

    useEffect(() => {
        axios
            .get("http://localhost:5000/clothes")
            .then((response) => {
                const data = response.data;
                setClothes(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const clothItemHandler = (clothingItem) => {
        setOutfit((prevOutfit) => {
            // Check if the clicked cloth is already equipped
            const isEquipped = prevOutfit[inventoryClothesType]?.name === clothingItem.name;

            // Remove the cloth if it is already equipped, otherwise add it to the outfit
            return {
                ...prevOutfit,
                [inventoryClothesType]: isEquipped ? null : clothingItem,
            };
        });
    };

    return (
        <Stack alignItems={"center"} sx={{height: "100%", overflow: "hidden"}}>
            <Paper
                className="characters-list"
                sx={{
                    height: "80px",
                    borderRadius: "1rem",
                    maxWidth: "600px",
                    width: "100%",
                    mb: "2rem",
                }}
            >
                <Stack
                    direction={"row"}
                    sx={{height: "100%"}}
                    justifyContent={"center"}
                >
                    <CharacterHeadButton
                        name={"lesley"}
                        onClick={() => setCurrentCharacter("Lesley")}
                    />
                    <CharacterHeadButton
                        name={"tiva"}
                        onClick={() => setCurrentCharacter("Tiva")}
                    />
                </Stack>
            </Paper>

            <Grid
                container
                sx={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            >
                <Grid
                    item
                    xs={4}
                    sx={{
                        height: "100%",
                        zIndex: 1,
                        overflow: "auto",
                    }}
                >
                    <Stack
                        className="menu"
                        spacing={"1rem"}
                        sx={{
                            height: "100%",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: "3rem",
                                fontWeight: "bold",
                                lineHeight: "3rem",
                            }}
                        >
                            ►&nbsp;Lesley
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    fontSize: "2rem",
                                }}
                            >
                                Outfit
                            </Box>
                            <Paper
                                className="character-info"
                                sx={{
                                    p: "0.75rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    boxShadow: "none",
                                    bgcolor: "#FFF8",
                                }}
                            >
                                <Stack
                                    direction={"row"}
                                    spacing="1rem"
                                    sx={{height: "100%", overflow: "auto"}}
                                >
                                    {Array.from(clothesTypesSingular).map((type) => (
                                        <Box key={type}>
                                            {type}
                                            <Paper sx={{width: "100px", height: "100px"}}></Paper>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Box>
                        <Box className="character-info">
                            <Box
                                sx={{
                                    fontSize: "2rem",
                                }}
                            >
                                Info
                            </Box>
                            <Paper
                                sx={{
                                    zIndex: 1,
                                    p: "0.75rem",
                                    maxHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "auto",
                                    boxShadow: "none",
                                    bgcolor: "#FFF8",
                                }}
                            >
                                <Box>
                                    <Box>
                                        <b>Height :</b> 164cm
                                    </Box>
                                    <Box>
                                        <b>Likes :</b> Chocolate, Travel
                                    </Box>
                                    <Box>
                                        <b>Skills :</b> Dances, Sings
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: "0.5rem",
                                        mt: "0.5rem",
                                        bgcolor: "#FFF",
                                        borderRadius: "0.5rem",
                                        overflowY: "auto",
                                        overflowX: "hidden",
                                        height: "100%",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </Box>
                            </Paper>
                        </Box>
                    </Stack>
                </Grid>

                <Grid
                    item
                    xs={4}
                    sx={{
                        height: "100%",
                        background: "radial-gradient(circle, #FFF 0%, #FFF 25%,#0000 50%)",
                        backgroundClip: "content-box",
                    }}
                >
                    <Stack
                        className="character"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            height: "100%",
                            px: "1rem",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <DressingView characterName={currentCharacter} face={face} outfit={outfit}/>
                        </Box>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => setFace(getPreviousFace(face))}
                                sx={{
                                    bgcolor: "#F7F",
                                    bottom: "5rem",
                                    left: "0",
                                }}
                            >
                                ◄
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setFace(getNextFace(face))}
                                sx={{
                                    bgcolor: "#F7F",
                                    bottom: "5rem",
                                    right: "0",
                                }}
                            >
                                ►
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid
                    item
                    xs={4}
                    sx={{
                        height: "100%",
                        zIndex: 1,
                    }}
                >
                    <Stack
                        className="inventory"
                        sx={{
                            height: "100%",
                            width: "100%",
                            boxSizing: "border-box",
                            border: "0.25rem solid #FFF",
                            bgcolor: "#FFF8",
                            borderRadius: "1rem",
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: "2rem",
                                textAlign: "center",
                                bgcolor: "#FFF",
                                px: "1rem",
                                mb: "1rem",
                            }}
                        >
                            <NativeSelect
                                value={inventoryClothesType}
                                onChange={(event) => setInventoryClothesType(event.target.value)}
                                sx={{
                                    p: 0,
                                    border: "none",
                                    fontSize: "2rem",
                                    fontFamily: "'Baloo 2', cursive;",
                                }}
                            >
                                {Array.from(clothesTypes).map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </NativeSelect>
                        </Box>
                        <Box sx={{ px: "1rem", height:'100%', overflowY:'auto'}}>
                            {clothes ?
                                <Grid container spacing={"1rem"}>
                                    {Array.from(clothes).map((clothingItem, index) => (
                                        clothingItem.type === inventoryClothesType && (
                                            <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
                                                <Paper
                                                    sx={{
                                                        display: "flex",
                                                        direction: "column",
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        '&:hover': {
                                                            bgcolor: '#FCE',
                                                            cursor: 'pointer'
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        clothItemHandler(clothingItem);
                                                    }}
                                                >
                                                    <Box sx={{height: '100px'}}>
                                                        <ClothingSprite
                                                            cloth={clothingItem}
                                                        />
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        )
                                    ))}
                                </Grid> :
                                <>Loading...</>
                            }
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Home;

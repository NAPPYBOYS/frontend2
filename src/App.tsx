import React from 'react';
import './App.css';
import {AppBar, Toolbar} from "@mui/material";
import {Container, Typography} from "@mui/joy";
import {Router} from "./Router";

function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography component="div" sx={{flexGrow: 1}}>
                        <a href="/">NAP</a>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Router/>
            </Container>
        </div>
    );
}

// TODO: Add Styling


export default App;

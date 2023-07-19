import {Box, Stack, Typography} from "@mui/joy";
import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ProcessModelProps {
    title: string,
    url: string
}

interface LearnedProcessModelProps {
    id: string,
}

interface BaselineDisplayProps {
    id: string,
    algorithm: string
}

export const ProcessModelDisplay: React.FunctionComponent<ProcessModelProps> = (props: ProcessModelProps) => {
    return (
        <Stack direction="row" spacing={1}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <h5>{props.title}</h5>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', width:"50vw"}}>
                <Zoom>
                    <img src={props.url} alt={props.title} style={{
                        maxWidth: "50%",
                    }}/>
                </Zoom>
            </Box>
        </Stack>
    );
}

export const BaselineProcessModelDisplay: React.FunctionComponent<BaselineDisplayProps> = (props) => {
    let url = "http://localhost:8000/baseline/" + props.id + "/vis";
    return (
        <ProcessModelDisplay url={url} title={props.algorithm + ""}/>
    );
}

export const LearnedProcessModelDisplay: React.FunctionComponent<LearnedProcessModelProps> = (props) => {
    let url = "http://localhost:8000/model/" + props.id + "/process/vis";
    return (
        <ProcessModelDisplay url={url} title="Learned Process Model"/>
    );
}
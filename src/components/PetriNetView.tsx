import {Stack, Typography} from "@mui/joy";
import React from "react";

interface ProcessModelProps {
     title:string,
     url: string
}
interface LearnedProcessModelProps {
    id: string,
}
interface BaselineDisplayProps {
    id: string,
    algorithm: string
}

export const ProcessModelDisplay:React.FunctionComponent<ProcessModelProps> = (props: ProcessModelProps) => {
    return (
        <Stack direction="row" spacing={1}>
            <Typography>props.title</Typography>
            <img src={props.url} alt={props.title}/>
        </Stack>
    );
}

export const BaselineProcessModelDisplay:React.FunctionComponent<BaselineDisplayProps> = (props) =>{
    let url = "http://localhost:8000/baseline/" + props.id+"/vis";
    return (
        <ProcessModelDisplay url={url} title={props.algorithm+""}/>
    );
}

export const LearnedProcessModelDisplay:React.FunctionComponent<LearnedProcessModelProps> = (props) =>{
    let url = "http://localhost:8000/baseline/" + props.id+"/vis";
    return (
        <ProcessModelDisplay url={url} title="Ours"/>
    );
}
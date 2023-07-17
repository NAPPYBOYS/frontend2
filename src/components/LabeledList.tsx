import React from "react";
import {mapSnakeToHumanReadable} from "../utils/text";
import {Box, List, ListItem, Stack, Typography} from "@mui/joy";

type LabeledListProps = {
    data: any;
    onClick?: { [key: string]: () => void };
}


export const LabeledList: React.FunctionComponent<LabeledListProps> = (props) => {
    const [header, setHeader] = React.useState<string[]>([]);
    const [humanReadaleHeader, setHumanReadaleHeader] = React.useState<{ [key: string]: string }>({});
    React.useEffect(() => {
        setHeader(Object.keys(props.data));
        setHumanReadaleHeader(mapSnakeToHumanReadable(Object.keys(props.data)));

    }, [props.data, header, humanReadaleHeader]);

    return (
        <Box>
            <List>
                {header.map((label) => (
                    <ListItem key={label}>
                        <Stack direction="row" spacing={1}>
                            <Typography justifyContent="right" fontWeight="bold" >{humanReadaleHeader[label]}:</Typography>
                            <Typography
                                justifyContent="left"
                                onClick={props.onClick ? props.onClick.hasOwnProperty(label) ? props.onClick[label] : undefined : undefined}>
                                {props.data[label]}
                            </Typography>
                        </Stack>
                    </ListItem>

                ))}
            </List>
        </Box>
    );
}
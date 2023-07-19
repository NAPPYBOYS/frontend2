import React from "react";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {convertSnakeToHumanReadable} from "../utils/text";


export type TableProps = {
    data: any[];
    ignore?: string[];
}
type DataTableProps = {
    data: any[];
    header: string[];
    headings: string[];
}
export const HumanReadableDataTable: React.FunctionComponent<TableProps> = (props) => {
    const [header, setHeader] = React.useState<string[]>([]);
    const [humanReadaleHeader, setHumanReadaleHeader] = React.useState<string[]>([]);
    const [content, setContent] = React.useState<any[]>([]);
    React.useEffect(() => {
        if (props.data.length > 0) {
            let rawHeader = Object.keys(props.data[0]);
            if (props.ignore) {
                rawHeader = rawHeader.filter(value => !props.ignore?.includes(value));
            }
            setHeader(rawHeader);
            setHumanReadaleHeader(convertSnakeToHumanReadable(rawHeader));
            setContent(props.data);
        }
    }, [props.data.length,props.ignore?.length]);
    console.log(props.data)
    return (<DataTable data={content} header={header} headings={humanReadaleHeader} />);
}

export const RawDataTable: React.FunctionComponent<TableProps> = (props) => {
    const [header, setHeader] = React.useState<string[]>([]);
    const [content, setContent] = React.useState<any[]>([]);
    React.useEffect(() => {
        if (props.data.length > 0) {
            let rawHeader = Object.keys(props.data[0]);
            if (props.ignore) {
                rawHeader = rawHeader.filter(value => !props.ignore?.includes(value));
            }
            setHeader(rawHeader);
            setContent(props.data);
        }
    });
    return (<DataTable data={content} header={header} headings={header}/>);
}

const DataTable: React.FunctionComponent<DataTableProps> = (props) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.headings.map(heading => {
                            return <TableCell key={heading}>{heading}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, index) => {
                        return <TableRow key={index}>
                            {props.header.map((key, index) => {
                                return <TableCell key={row[key]}>{row[key]+""}</TableCell>
                            })}
                        </TableRow>;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
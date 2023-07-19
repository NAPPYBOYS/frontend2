import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/joy";


export const HomePage = () => {
    let navigate = useNavigate();
    return (
        <Box >
        <Stack justifyContent="right">
            <Typography  level="h1" style={{marginBottom:20}}>Hi !</Typography>
            <Typography level="h3" onClick={() => navigate("/train")} justifyContent="left">Train</Typography>
            <Typography level="h3" onClick={(e) => navigate("/datasets")}
                        justifyContent="left">Datasets</Typography>
            <Typography level="h3" onClick={() => navigate("/models")}
                        justifyContent="left">Models</Typography>
        </Stack>
        </Box>
    );
}
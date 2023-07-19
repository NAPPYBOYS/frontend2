import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/joy";


import {SvgIcon} from "@mui/joy";

export const HomePage = () => {
    let navigate = useNavigate();
    return (
        <Box sx={{
            width: "50%",
            textAlign: "left",
            marginLeft: "20vw",
            marginTop: "20vh"
        }}>
            <Stack>
                <Typography level="h1" style={{marginBottom: 20}}>Hi !</Typography>
                <Typography level="h3" onClick={() => navigate("/train")} justifyContent="left">
                    Train</Typography>
                <Typography level="h3" onClick={(e) => navigate("/datasets")}
                            justifyContent="left">Datasets</Typography>
                <Typography level="h3" onClick={() => navigate("/models")}
                            justifyContent="left">Models</Typography>
            </Stack>
        </Box>
    );
}
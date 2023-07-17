import {useNavigate} from "react-router-dom";
import {Stack, Typography} from "@mui/joy";


export const HomePage = () => {
    let navigate = useNavigate();
    return (
        <Stack>
            <Typography  style={{marginBottom:20}}>Hi !</Typography>
            <Typography onClick={() => navigate("/train")} justifyContent="left">Train</Typography>
            <Typography onClick={(e) => navigate("/datasets")}
                        justifyContent="left">Datasets</Typography>
            <Typography onClick={() => navigate("/models")}
                        justifyContent="left">Models</Typography>
        </Stack>
    );
}
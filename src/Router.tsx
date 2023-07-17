import {HomePage} from "./pages/Home";
import {DatasetListPage} from "./pages/DatasetList";
import {DatasetDetailPage} from "./pages/DatasetDetail";
import {ModelDetailPage} from "./pages/ModelDetail";
import {ModelListPage} from "./pages/ModelList";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ModelCreatePage} from "./pages/ModelCreate";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/datasets" element={<DatasetListPage/>}/>
                <Route path="/datasets/:id" element={<DatasetDetailPage/>}/>
                <Route path="/train" element={<ModelCreatePage/>}/>
                <Route path="/models" element={<ModelListPage/>}/>
                <Route path="/models/:id" element={<ModelDetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
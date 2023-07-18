import {useAPIClient} from "../api/bridge";
import {BaselineProcessModelListView, BaselineProcessModelDetailedView} from "../api";

export const getBaselines = async (datasetId: string, callback: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
    await apiClient.getBaselineProcessesDatasetDatasetIdBaselinesGet(datasetId).then(
        (response) => {
            callback(response.data);
        }
    );
}

export const getBaselineDetail = async ( baselineId: string, callback: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
    await apiClient.getBaselineProcessModelBaselineProcessIdGet(baselineId).then(
        (response) => {
            callback(response.data);
        }
    );
}
import {useAPIClient} from "../api/bridge";

export const getBaselines =  (datasetId: string, callback: any) => {
    console.log("getBaselines"+datasetId);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
     apiClient.getBaselineProcessesDatasetDatasetIdBaselinesGet(datasetId).then(
        (response) => {
            callback(response.data);
        }
    );
}

export const getBaselineDetail = async ( baselineId: string, callback: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
    apiClient.getBaselineProcessModelBaselineProcessIdGet(baselineId).then(
        (response) => {
            callback(response.data);
        }
    );
}
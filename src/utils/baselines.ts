import {useAPIClient} from "../api/bridge";

export const getBaselines =  async (datasetId: string) => {
    console.log("getBaselines"+datasetId);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
    return apiClient.getBaselineProcessesDatasetDatasetIdBaselinesGet(datasetId)
}



export const getBaselineDetail =async  ( baselineId: string, callback: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const apiClient = useAPIClient();
    return apiClient.getBaselineProcessModelBaselineProcessIdGet(baselineId);
}
import {DefaultApi} from "./api";

const defaultApi = new DefaultApi();
export const useAPIClient = (): DefaultApi => {
    return defaultApi;
}
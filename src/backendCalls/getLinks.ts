import axios, { AxiosError, AxiosResponse } from "axios";
import { Links } from "../interfaces/linkInterface";

export interface LinkResponse {
    success: boolean;
    data?: Links[];
    error?: string;
}

export async function getLinks(resume: string, tags: string[]): Promise<LinkResponse> {
    try {
        const response: AxiosResponse<Links[]> = await axios.post('https://geminichallenge.onrender.com/getJobs', {
            resume,
            tags
        });

        if (response.status === 200) {
            const links: Links[] = response.data.map(item => ({
                Title: item.Title,
                Link: item.Link,
                Image: item.Image,
                Description: item.Description
            }));
            return { success: true, data: links };
        } else {
            console.log(`Unexpected response status: ${response.status}`);
            return { success: false, error: `Unexpected response status: ${response.status}` };
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            console.log(axiosError);
            if (axiosError.response && axiosError.response.status === 401) {
                console.log("Unauthorized");
                return { success: false, error: "Unauthorized" };
            } else {
                console.log("An error occurred during the request");
                return { success: false, error: "An error occurred during the request" };
            }
        }
        return { success: false, error: "Unknown error" };
    }
}

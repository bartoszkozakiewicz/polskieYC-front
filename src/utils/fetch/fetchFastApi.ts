import axios from "axios";

export const queryFastApiEndpoint = async (
    endpoint: string,
    payload?: any,
    headers = {},
  ) => {
    try {
      const response = await axios.post("http://0.0.0.0:8000/" + endpoint, payload, {
        headers,
      });
      console.log("Response: ", response)
      return response.data;
    } catch (error: any) {
      console.error("Error querying FastAPI endpoint:", error.message);
      return { error: error.message };
    }
  };
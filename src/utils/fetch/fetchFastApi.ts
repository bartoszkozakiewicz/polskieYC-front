import axios, { AxiosRequestConfig } from "axios";

// export const queryFastApiEndpoint = async (
//     endpoint: string,
//     payload?: any,
//     headers = {},
//   ) => {
//     try {
//       const response = await axios.post("http://0.0.0.0:8000/" + endpoint, payload, {
//         headers,
//       });
//       console.log("Response: ", response)
//       return response.data;
//     } catch (error: any) {
//       console.error("Error querying FastAPI endpoint:", error.message);
//       return { error: error.message };
//     }
//   };


export const queryFastApiEndpoint = async (
  endpoint: string,
  payload: any = {},
  headers = {},
  method: 'GET' | 'POST' = 'POST',
) => {
  try {
    let config: AxiosRequestConfig = {
      headers,
    };

    if (method === 'POST') {
      config = { ...config, data: payload };
    } else if (method === 'GET') {
      config = { ...config, data: undefined };
    }

    const response = await axios.request({
      url: "http://0.0.0.0:8000/" + endpoint,
      method,
      ...config,
    });

    console.log("Response: ", response);
    return response.data;
  } catch (error: any) {
    console.error("Error querying FastAPI endpoint:", error.message);
    return { error: error.message };
  }
};
  
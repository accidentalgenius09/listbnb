export const RestAPI = async (url, options = {}) => {
  try {
    // Check if authentication token is provided in options
    const { authToken } = options;

    // Set default headers
    const headers = {
      "x-api-key": "9a09f27b-2d15-4a68-862a-aefab9f50bc4",
      "Content-Type": "application/json",
    };

    // Add authentication token to headers if provided
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    // Combine default headers with custom headers from options
    options.headers = {
      ...headers,
      ...options.headers,
    };
    const response = await fetch(process.env.rest_api_endpoint + url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

/** @format */
import axios from "axios";

function errorHandler(err: unknown) {
  if (axios.isAxiosError(err)) {
    // Handle no response (e.g., network error)
    if (!err.response) {
      throw new Error("Network error: Please check your connection.");
    }

    // Handle API error message from server
    const message = err.response.data?.message || "Something went wrong.";
    const statusCode = err.response.status;

    throw {
      name: "APIError",
      message,
      statusCode,
    };
  }

  throw new Error("An unknown error occurred.");
}

export default errorHandler;

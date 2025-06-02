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
    throw new Error(message);
  }

  throw new Error("An unknown error occurred.");
}

export default errorHandler;

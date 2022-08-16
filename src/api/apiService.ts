import axios, { AxiosError } from "axios";

const BASE_URL = "https://api.github.com";
const AUTH_CONFIG = {
  username: process.env.REACT_APP_GITHUB_USERNAME || "",
  password: process.env.REACT_APP_GITHUB_APP_SECRET || "",
};
const STATUS_CODE_API_RATE_EXCEEDED = 403;

class APIRateLimitExceededError extends Error {
  constructor() {
    super(
      "Too many consecutive API calls have been done. Please,try again in a few minutes."
    );
    this.name = "APIRateLimitExceededError";
  }
}

class APICustomError extends Error {
  constructor() {
    super("An error happened while trying to comunicate with Github!");
    this.name = "APICustomError";
  }
}

const get = async <T>(url: string) => {
  try {
    const result = await axios({
      method: "get",
      auth: { ...AUTH_CONFIG },
      url: `${BASE_URL}/${url}`,
    });
    return result.data as T;
  } catch (exception) {
    if (exception instanceof AxiosError) {
      if (exception.response?.status === STATUS_CODE_API_RATE_EXCEEDED) {
        throw new APIRateLimitExceededError();
      }
    }
    throw new APICustomError();
  }
};

export {
  BASE_URL,
  AUTH_CONFIG,
  STATUS_CODE_API_RATE_EXCEEDED,
  get,
  APIRateLimitExceededError,
  APICustomError,
};

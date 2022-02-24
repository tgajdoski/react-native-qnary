import {
  API_URL as url,
  ENVIRONMENT as env,
  PRIVACY_POLICY_URL,
  OAuthIO_PUBLIC_URL
} from "react-native-dotenv";

const API_URL = url || "http://localhost:4000/";
const ENVIRONMENT = env || "dev";

export default {
  API_URL,
  ENVIRONMENT,
  PRIVACY_POLICY_URL,
  OAuthIO_PUBLIC_URL
};

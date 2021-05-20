import axios, { AxiosError } from 'axios';
import { NavigationActions } from '~/navigation';
import { Storage } from '~/services';
import { Env, showAlert } from '~/utils';
import {
  addAuthHeaders,
  successResponse,
  verifyExpiredToken,
} from './interceptors';

const baseURL: string = Env.API_BASE_PATH;
const clientId: string = Env.CLIENT_ID;

const request = axios.create({
  baseURL,
  headers: { client_id: clientId },
  timeout: 20000, // 20 seconds timeout
});

/**
 * Middleware, to change whatever we need in the request
 * ex: Put a bearer token in the request, if necessary
 */

request.interceptors.response.use(successResponse, (error: AxiosError) =>
  verifyExpiredToken({
    error,
    showFeedback: showAlert,
    Navigation: NavigationActions,
  }),
);

request.interceptors.request.use((config) => addAuthHeaders(config, Storage));

export default request;

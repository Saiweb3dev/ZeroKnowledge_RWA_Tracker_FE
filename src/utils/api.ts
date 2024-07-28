// utils/api.ts
import axios, { AxiosError } from 'axios';
const BASE_URL = 'http://localhost:8080/api';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
  return response.json();
}

// Utility function to post data
// Assuming BASE_URL is already defined somewhere in your utils/api.ts file

 interface PostDataResponse<T> {
  // Existing properties
  message?: string;
  // Add contractAddress and contractABI properties
  contractAddress?: string;
  contractABI?: string[];
}

export async function postData<T>(endpoint: string, data: T): Promise<PostDataResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await axios.post<PostDataResponse<T>>(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<PostDataResponse<T>>;
      console.error(`Error posting data to ${endpoint}:`, axiosError.response?.data || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'An error occurred while posting data');
    } else {
      console.error(`Unexpected error posting data to ${endpoint}:`, error);
      throw error;
    }
  }
}
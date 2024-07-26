// utils/api.ts
import axios from 'axios';
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
export async function postData<T>(endpoint: string, data: T): Promise<void> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await axios.post(url, data);
    if (response.status !== 200) {
      throw new Error(`Failed to post data to ${endpoint}`);
    }
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
}
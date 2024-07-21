"use client"
import React, { useEffect, useState,ReactNode  } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SessionData } from '@/types/api';
const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if(!sessionId){
        setError('No sessiuon ID provided');
        return;
      }

      try{
        const response = await axios.get<SessionData>(`http://localhost:8080/api/getData/${sessionId}`);
        setData(response.data);
      }catch(err){
        if(axios.isAxiosError(err) && err.response){
          setError(err.response.data?.error || 'An error occurred');
        }else{
          setError('An unexpected error occurred');
        }
      }
    }
    fetchData()
  }, [sessionId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 text-white bg-indigo-500 rounded-lg shadow-xl">
    <h1 className="text-2xl font-bold mb-4">Verification Result</h1>
    {error ? (
      <div className="text-red-500">{error}</div>
    ) : (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border-b pb-2">
            <h2 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p className="text-gray-100">{typeof value === 'object' ? JSON.stringify(value) : (value ?? '') as ReactNode}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default ResultPage;
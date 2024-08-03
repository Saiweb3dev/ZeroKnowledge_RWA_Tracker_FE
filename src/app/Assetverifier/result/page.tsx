"use client";
import { SessionData } from "@/types/api";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) {
        setError("No session ID provided");
        return;
      }

      try {
        const responseRaw = await axios.get<SessionData>(
          `http://localhost:8080/api/getData/${sessionId}`
        );
        const response = responseRaw.data;
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data?.error || "An error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    fetchData();
  }, [sessionId]);

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border-2 shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-black">
            <h1 className="text-2xl font-bold text-white">NFT Details</h1>
          </div>
          <div className="border-t border-gray-200">
            {error ? (
              <div className="px-4 py-5 sm:p-6">
                <div className="text-red-600 text-center">{error}</div>
              </div>
            ) : (
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{data?.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Car Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data?.carName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Variant
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data?.variant?.replace(/"/g, "")}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Minted Price
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {data?.mintedPrice} ETH
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 break-all">
                      {data?.address}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Signature
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 break-all">
                      {data?.signature}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

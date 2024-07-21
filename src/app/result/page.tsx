"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js'
const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const encryptedData = searchParams.get('data');
    if (encryptedData) {
      const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), 'secret key 123');
      const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
      setData(decryptedData);
    }
  }, [searchParams]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Result</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ResultPage;
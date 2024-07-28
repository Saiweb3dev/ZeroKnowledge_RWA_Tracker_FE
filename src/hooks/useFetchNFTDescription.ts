// hooks/useFetchNFTDescription.ts
import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';
import { NFTD } from '@/types/nft';

function useFetchNFTDescription(id: string): { nftDescription: NFTD | null; loading: boolean; error: string | null } {
  const [nftDescription, setNftDescription] = useState<NFTD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssetDescription() {
      try {
        const data = await fetchData<NFTD>(`/nft/getAssetDescription/${id}`);
        setNftDescription(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load asset description.');
      } finally {
        setLoading(false);
      }
    }

    loadAssetDescription();
  }, [id]);

  return { nftDescription, loading, error };
}

export default useFetchNFTDescription;

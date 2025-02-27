import { useState, useEffect } from 'react';
// import { optimismSepolia } from 'thirdweb/chains';
import { type Address } from 'viem';
import { getWalletClient } from '@wagmi/core';
import { BrowserProvider, JsonRpcSigner } from 'ethers'; // CHANGED: Updated import from ethers
import { useWalletClient } from 'wagmi';
import { axiosInstance } from '@/app/utils/axiosInstance';
// REMOVED: Removed import { JsonRpcSigner } from '@ethersproject/providers'


export type EASConfig = {
  EASDeployment: Address
  SchemaRegistry: Address
};

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function walletClientToSigner(walletClient: ReturnType<typeof getWalletClient>) {
  const { account, chain, transport } = walletClient;
  
  // CHANGED: Updated provider creation for ethers v6
  const provider = new BrowserProvider(transport as any, {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  });
  
  // CHANGED: Updated signer handling for ethers v6
  return provider.getSigner(account.address);
}

export function useSigner() {
  const { data: walletClient } = useWalletClient();

  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);
  useEffect(() => {
    async function getSigner() {
      if (!walletClient) return;

      try {
        // CHANGED: Need to await signer in ethers v6
        const tmpSigner = await walletClientToSigner(walletClient);
        setSigner(tmpSigner);
      } catch (error) {
        console.error('Error getting signer:', error);
      }
    }

    void getSigner();
  }, [walletClient]);
  return signer;
}


interface Config extends EASConfig {
  explorer: string
  gqlUrl: string
}

const getActiveChainId = (chain?: string) => {
  switch (chain) {
    case 'optimism':
      return 10;
    case 'optimism-sepolia':
      return 11155420;
    default:
      return 11155420;
  }
};

export const activeChainId = getActiveChainId(
  process.env.NEXT_PUBLIC_THIRDWEB_ACTIVE_CHAIN
);

export const EASNetworks: Record<number, Config> = {
  // Optimism
  10: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism.easscan.org',
    gqlUrl: 'https://optimism.easscan.org/graphql',
  },
  // Optimism Sepolia
  11155420: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism-sepolia.easscan.org',
    gqlUrl: 'https://optimism-sepolia.easscan.org/graphql',
  },
};

export const SCHEMA_UID = process.env.NEXT_PUBLIC_EAS_SCHEMA_UID || '0x8c12749f56c911dbc13a6a6685b6964c3ea03023f246137e9c53ba97974e4b75';

export const pinFileToIPFS = async (list: object) => {
  try {
    const res = await axiosInstance.post<string>('/flow/pinJSONToIPFS', {
      json: list,
    });
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

type Ranking = {
  RF5Id: string
  share: number
}

export const convertRankingToAttestationFormat = async (
  ranking: Ranking[],
  collectionName: string,
  // collectionDescription: string,
) => {
  const obj = {
    // listDescription: `${collectionDescription}`,
    impactEvaluationLink: 'https://pairwise.vote',
    impactCategory: ['PAIRWISE'],
    impactEvaluationDescription: `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
    listContent: ranking.map(item => ({
      RF6_Application_UID: item.RF5Id,
      allocation: item.share,
    })),
  };

  const listName = collectionName;
  const listMetadataPtrType = 1;

  const url = await pinFileToIPFS(obj);

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr: `https://giveth.mypinata.cloud/ipfs/${url}`,
  };
};

export const getPrevAttestationIds = async (
  address: string,
  schemaId: string,
  gqlUrl: string,
  collectionName: string,
): Promise<string[]> => {
  const query = `
  query PrevAttestationsQuery($where: AttestationWhereInput) {
    groupByAttestation(
      where: $where,
      by: [id, decodedDataJson]
    ) {
      id
      decodedDataJson
    }
  }
`;

  const res = await axiosInstance.post(gqlUrl, {
    query: query,
    operationName: 'PrevAttestationsQuery',
    variables: {
      where: {
        revocable: { equals: true },
        revoked: { equals: false },
        schemaId: {
          equals: schemaId,
        },
        attester: { equals: address },
      },
      by: null,
    },
  });

  const temp = res.data.data.groupByAttestation.map((item: any) => ({
    ...item,
    data: JSON.parse(item.decodedDataJson),
  }));

  return temp
    .filter((item: any) => item.data[0].value.value === collectionName)
    .map((item: any) => item.id);
};
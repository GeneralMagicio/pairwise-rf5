import { axiosInstance } from '@/app/utils/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { IProject } from '../types'

export interface IPairwisePairsResponse {
  pairs: IProject[][]
  totalPairs: number
  votedPairs: number
  name: string
  threshold: number
}

export const getPairwisePairs = async (
  cid: number,
): Promise<IPairwisePairsResponse> => {
  return (await axiosInstance.get(`flow/pairs?cid=${cid}`)).data
}

export const useGetPairwisePairs = (cid: number) => {
  return useQuery({
    queryKey: ['pairwise-pairs', cid],
    queryFn: () => getPairwisePairs(cid),
  })
}

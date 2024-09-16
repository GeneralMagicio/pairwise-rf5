import { axiosInstance } from '@/app/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'

type Data = {
  data: {
    pid: number // project ID
  }
}

export const markCoi = async ({
  data,
}: Data) => {
  console.log(data)
  const res = await axiosInstance.post('/flow/mark-coi', data)
  return res.data
}

export const useMarkCoi = () => {
  return useMutation({
    mutationFn: markCoi,
  })
}

import { axiosInstance } from '@/app/utils/axiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type Data = {
  data: {
    pid: number // project ID
  }
}

export const markCoi = ({
  data,
}: Data) => {
  return axiosInstance.post('/flow/mark-coi', data)
}

export const useMarkCoi = ({
  categoryId,
}: {
  categoryId: number
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markCoi,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', categoryId],
      })
    },
  })
}

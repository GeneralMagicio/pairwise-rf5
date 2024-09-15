import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/app/utils/axiosInstance'

type ProjectVoteData = {
  data: {
    project1Id: number
    project2Id: number
    pickedId: number | null
  }
}

export const updateProjectVote = ({ data }: ProjectVoteData) => {
  return axiosInstance.post('flow/projects/vote', data)
}

export const updateProjectUndo = (cid: Number) => {
  return axiosInstance.post('flow/pairs/back', { collectionId: cid })
}

export const useUpdateProjectVote = ({
  categoryId,
}: {
  categoryId: number
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProjectVote,
    onSuccess: ({ data }) => {
      console.log('OnSuccess', data)
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', categoryId],
      })
    },
  })
}

export const useUpdateProjectUndo = ({
  categoryId,
}: {
  categoryId: number
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProjectUndo,
    onSuccess: ({ data }) => {
      console.log('OnSuccess', data)
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', categoryId],
      })
    },
  })
}

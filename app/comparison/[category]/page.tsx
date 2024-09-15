'use client'

import { JWTPayload } from '@/app/utils/wallet/types'
import { ProjectCard } from '../card/ProjectCard'
import ConflictButton from '../card/CoIButton'
import Header from '../card/Header'
import { Rating } from '../card/Rating'
import UndoButton from '../card/UndoButton'
import VoteButton from '../card/VoteButton'
import { useParams } from 'next/navigation'
import Modals from '@/app/utils/wallet/Modals'
import { useAuth } from '@/app/utils/wallet/AuthProvider'
import { useEffect, useState } from 'react'
import { useGetPairwisePairs } from '../utils/data-fetching/pair'
import { convertCategoryNameToId } from '../utils/helpers'
import { useUpdateProjectUndo, useUpdateProjectVote } from '../utils/data-fetching/vote'
import { truncate } from '@/app/utils/methods'
import { useMarkCoi } from '../utils/data-fetching/coi'

const convertCategoryToLabel = (category: JWTPayload['category']) => {
  switch (category) {
    case 'ETHEREUM_CORE_CONTRIBUTIONS':
      return 'Ethereum Core Contributors'
    case 'OP_STACK_RESEARCH_AND_DEVELOPMENT':
      return 'OP Stack R&D'
    case 'OP_STACK_TOOLING':
      return 'OP Stack Tooling'
    default:
      return 'OP Stack'
  }
}

export default function Home() {
  const params = useParams()
  const { category } = params
  const [rating1, setRating1] = useState<number | null>(null)
  const [rating2, setRating2] = useState<number | null>(null)

  const { checkLoginFlow } = useAuth()

  useEffect(() => {
    checkLoginFlow()
  }, [checkLoginFlow])

  const cid = convertCategoryNameToId(category as JWTPayload['category'])

  const { data, isLoading } = useGetPairwisePairs(cid)

  const { mutateAsync: vote } = useUpdateProjectVote({ categoryId: cid })
  const { mutateAsync: undo } = useUpdateProjectUndo({ categoryId: cid })
  const { mutateAsync: markProjectCoI } = useMarkCoi({ categoryId: cid })
  // const { mutateAsync: markProject2CoI } = useMarkCoi({ projectId: pair2 ? pair2.id : 0 })
  // const { setShowBhModal } = useAuth()
  useEffect(() => {
    setRating1(data?.pairs[0][0].rating || null)
    setRating2(data?.pairs[0][1].rating || null)
  }, [data])

  // useEffect(() => {
  //   setShowBhModal(false)
  // }, [setShowBhModal])

  if (!data || isLoading) return

  const pair1 = data.pairs[0][0]
  const pair2 = data.pairs[0][1]

  const handleVote = (chosenId: number) => async () => {
    await vote({ data: { project1Id: pair1.id, project2Id: pair2.id,
      project1Stars: rating1, project2Stars: rating2, pickedId: chosenId } })
  }

  const handleUndo = async () => {
    await undo()
  }

  return (
    <div>
      <Modals />
      <Header
        progress={data.progress * 100}
        category={convertCategoryToLabel(category! as JWTPayload['category'])}
        question="Which project had the greatest impact on the OP Stack?"
      />
      <div className="relative flex w-full items-center justify-between gap-8 px-8 py-2">
        <div className="relative w-[49%]">
          {/*  @ts-ignore */}
          <ProjectCard project={{ ...pair1.metadata, ...pair1 }} />
          <div className="absolute bottom-28 right-[40%]">
            <Rating value={rating1 || 3} onChange={(val: number) => { setRating1(val) }} />
          </div>
          <div className="absolute bottom-28 left-2/3">
            <ConflictButton onClick={() => markProjectCoI({ data: { pid: pair1.id } })} />
          </div>
          <div className="absolute bottom-4 left-[37%] w-96">
            <VoteButton onClick={handleVote(pair1.id)} title={truncate(pair1.name, 35)} imageUrl={pair1.image || ''} />
          </div>
        </div>
        <div className="absolute bottom-12 left-[calc(50%-40px)] z-[1]">
          <UndoButton onClick={handleUndo} />
        </div>
        <div className="relative w-[49%]">
          {/*  @ts-ignore */}
          <ProjectCard project={{ ...pair2.metadata, ...pair2 }} />
          <div className="absolute bottom-28 right-[40%]">
            <Rating value={rating2 || 3} onChange={(val: number) => { setRating2(val) }} />
          </div>
          <div className="absolute bottom-28 left-2/3">
            <ConflictButton onClick={() => markProjectCoI({ data: { pid: pair2.id } })} />
          </div>
          <div className="absolute bottom-4 left-[37%] w-96">
            <VoteButton onClick={handleVote(pair2.id)} title={truncate(pair2.name, 35)} imageUrl={pair2.image || ''} />
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { JWTPayload } from '@/app/utils/wallet/types'
import { AutoScrollAction, ProjectCard } from '../card/ProjectCard'
import ConflictButton from '../card/CoIButton'
import Header from '../card/Header'
import { Rating } from '../card/Rating'
import UndoButton from '../card/UndoButton'
import VoteButton from '../card/VoteButton'
import { useParams, useRouter } from 'next/navigation'
import Modals from '@/app/utils/wallet/Modals'
import { useAuth } from '@/app/utils/wallet/AuthProvider'
import { useEffect, useState } from 'react'
import { getPairwisePairsForProject, useGetPairwisePairs } from '../utils/data-fetching/pair'
import { convertCategoryNameToId } from '../utils/helpers'
import { useUpdateProjectUndo, useUpdateProjectVote } from '../utils/data-fetching/vote'
import { getBiggerNumber, truncate, usePrevious } from '@/app/utils/methods'
import { useMarkCoi } from '../utils/data-fetching/coi'
import { IProject } from '../utils/types'
import { useQueryClient } from '@tanstack/react-query'
import Modal from '@/app/utils/Modal'
import FinishBallot from '../ballot/modals/FinishBallotModal'
import BallotSuccessModal from '../ballot/modals/BallotSuccessModal'
import BallotLoading from '../ballot/modals/BallotLoading'
import { getBallot } from '../ballot/useGetBallot'
import { useAccount } from 'wagmi'
import { uploadBallot } from '@/app/utils/wallet/agora-login'
import BallotError from '../ballot/modals/BallotError'
import { mockProject1, mockProject2 } from '../card/mockData'

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
  const queryClient = useQueryClient()
  const router = useRouter()

  const [rating1, setRating1] = useState<number | null>(null)
  const [rating2, setRating2] = useState<number | null>(null)
  const [project1, setProject1] = useState<IProject>()
  const [project2, setProject2] = useState<IProject>()
  const [coiLoading1, setCoiLoading1] = useState(false)
  const [coiLoading2, setCoiLoading2] = useState(false)
  const [bypassPrevProgress, setBypassPrevProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  const [lastAction, setLastAction] = useState<AutoScrollAction>()

  const [sectionExpanded1, setSectionExpanded1] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
  })

  const [sectionExpanded2, setSectionExpanded2] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
  })

  const dispatchAction = (initiator: AutoScrollAction['initiator']) =>
    (section: AutoScrollAction['section'], action: AutoScrollAction['action']) => {
      setLastAction({ section, initiator, action })
    }

  const [showFinishBallot, setShowFinishBallot] = useState(false)
  const [showSuccessBallot, setShowSuccessBallot] = useState(false)
  const [ballotLoading, setBallotLoading] = useState(false)
  const [ballotError, setBallotError] = useState(false)

  const [temp, setTemp] = useState(0)
  const cid = convertCategoryNameToId(category as JWTPayload['category'])

  const [coi1, setCoi1] = useState(false)
  const [coi2, setCoi2] = useState(false)

  const { address } = useAccount()

  const confirmCoI1 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id1 } })
    setCoi1(false)
    setCoiLoading1(true)
    try {
      const pair = await getPairwisePairsForProject(cid, id2)
      setProject1(pair.pairs[0].find(project => project.id !== id2)!)
    }
    catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      })
    }
    setCoiLoading1(false)
  }

  const cancelCoI1 = () => {
    setCoi1(false)
  }

  const showCoI1 = () => {
    setCoi1(true)
  }

  const confirmCoI2 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id2 } })
    setCoi2(false)
    setCoiLoading2(true)
    try {
      const pair = await getPairwisePairsForProject(cid, id1)
      setProject2(pair.pairs[0].find(project => project.id !== id1)!)
      setCoi2(false)
    }
    catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      })
    }
    setCoiLoading2(false)
  }

  const cancelCoI2 = () => {
    setCoi2(false)
  }

  const showCoI2 = () => {
    setCoi2(true)
  }

  const { checkLoginFlow } = useAuth()

  useEffect(() => {
    checkLoginFlow()
  }, [checkLoginFlow])

  const { data, isLoading } = useGetPairwisePairs(cid)
  const prevProgress = usePrevious(progress)

  useEffect(() => {
    if (bypassPrevProgress && data) {
      setProgress(data.progress)
      setBypassPrevProgress(false)
    }
    else {
      setProgress(getBiggerNumber(prevProgress, data?.progress))
    }
  }, [data])

  // const {} = useGetPairwisePairsForProject(cid)

  const { mutateAsync: vote } = useUpdateProjectVote({ categoryId: cid })
  const { mutateAsync: undo } = useUpdateProjectUndo({ categoryId: cid, onSuccess: () => {
    // if this temp state is omitted
    // then when you CoI one project and
    // then you call "undo", the app breaks
    // we probably need to combine "/pairs" and "/pairs-for-project"
    setTemp(temp + 1)
    setBypassPrevProgress(true)
  } })
  const { mutateAsync: markProjectCoI } = useMarkCoi()
  // const { mutateAsync: markProject2CoI } = useMarkCoi({ projectId: project2 ? project2.id : 0 })
  // const { setShowBhModal } = useAuth()
  useEffect(() => {
    if (!data || data.pairs.length === 0) return
    setRating1(data?.pairs[0][0].rating || null)
    setRating2(data?.pairs[0][1].rating || null)
  }, [data])

  useEffect(() => {
    if (!data) return
    if (data.pairs.length === 0) {
      setShowFinishBallot(true)
      if (!project1 || !project2) {
        setProject1(mockProject1)
        setProject2(mockProject2)
      }
      return
    }
    setProject1(data.pairs[0][0])
    setProject2(data.pairs[0][1])
  }, [data, temp])

  const handleUnlockBallot = async () => {
    if (!address) return
    setShowFinishBallot(false)
    setBallotLoading(true)
    setBallotError(false)
    try {
      const ballot = await getBallot(cid)
      await uploadBallot(ballot, address)
      setShowSuccessBallot(true)
    }
    catch (e) {
      setBallotError(true)
    }
    finally {
      setBallotLoading(false)
    }
  }

  console.log(project1)
  console.log(project2)
  console.log(data)
  console.log(isLoading)
  if (!project1 || !project2 || !data || isLoading) return

  // const project1 = data.pairs[0][0]
  // const project2 = data.pairs[0][1]

  const handleVote = (chosenId: number) => async () => {
    await vote({ data: { project1Id: project1.id, project2Id: project2.id,
      project1Stars: rating1, project2Stars: rating2, pickedId: chosenId } })
  }

  const handleUndo = async () => {
    setCoi1(false)
    setCoi2(false)
    await undo()
  }

  return (
    <div>
      <Modals />
      <Modal isOpen={showFinishBallot || showSuccessBallot || ballotLoading || ballotError} onClose={() => {}}>
        {showFinishBallot && <FinishBallot category={convertCategoryToLabel(category as JWTPayload['category'])} projectCount={35} onUnlock={handleUnlockBallot} />}
        {showSuccessBallot && <BallotSuccessModal onClick={() => { router.push(`https://develop-op-voting.up.railway.app/ballot`) }} />}
        {ballotLoading && <BallotLoading />}
        {ballotError && <BallotError onClick={handleUnlockBallot} />}

      </Modal>
      <Header
        progress={progress * 100}
        category={convertCategoryToLabel(category! as JWTPayload['category'])}
        question="Which project had the greatest impact on the OP Stack?"
      />
      <div className="relative flex w-full items-center justify-between gap-8 px-8 py-2">
        <div className="relative w-[49%]">
          <ProjectCard
            sectionExpanded={sectionExpanded1}
            setSectionExpanded={setSectionExpanded1}
            name="card1"
            action={lastAction}
            dispatchAction={dispatchAction('card1')}
            key={project1.RPGF5Id}
            key2={project2.RPGF5Id}
            coiLoading={coiLoading1}
            coi={coi1}
            project={{ ...project1.metadata, ...project1 } as any}
            onCoICancel={cancelCoI1}
            onCoIConfirm={() => confirmCoI1(project1.id, project2.id)}
          />
          {!coi1 && !coiLoading1
          && (
            <>
              <div className="absolute bottom-28 right-[40%]">
                <Rating value={rating1 || 3} onChange={(val: number) => { setRating1(val) }} />
              </div>
              <div className="absolute bottom-28 left-2/3">
                <ConflictButton onClick={showCoI1} />
              </div>
              <div className="absolute bottom-4 left-[37%] w-96">
                <VoteButton onClick={handleVote(project1.id)} title={truncate(project1.name, 35)} imageUrl={project1.image || ''} />
              </div>
            </>
          )}
        </div>
        <div className="absolute bottom-12 left-[calc(50%-40px)] z-[1]">
          <UndoButton onClick={handleUndo} />
        </div>
        <div className="relative w-[49%]">
          <ProjectCard
            sectionExpanded={sectionExpanded2}
            setSectionExpanded={setSectionExpanded2}
            name="card2"
            action={lastAction}
            dispatchAction={dispatchAction('card2')}
            key={project2.RPGF5Id}
            key2={project1.RPGF5Id}
            coiLoading={coiLoading2}
            coi={coi2}
            onCoICancel={cancelCoI2}
            onCoIConfirm={() => confirmCoI2(project1.id, project2.id)}
            project={{ ...project2.metadata, ...project2 } as any}
          />
          {!coi2 && !coiLoading2 && (
            <>
              <div className="absolute bottom-28 right-[40%]">
                <Rating value={rating2 || 3} onChange={(val: number) => { setRating2(val) }} />
              </div>
              <div className="absolute bottom-28 left-2/3">
                <ConflictButton onClick={showCoI2} />
              </div>
              <div className="absolute bottom-4 left-[37%] w-96">
                <VoteButton onClick={handleVote(project2.id)} title={truncate(project2.name, 35)} imageUrl={project2.image || ''} />
              </div>
            </>

          )}
        </div>
      </div>
    </div>
  )
}

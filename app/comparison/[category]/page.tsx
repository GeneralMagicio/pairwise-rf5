'use client';

import React, { useEffect, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { JWTPayload } from '@/app/utils/wallet/types';
import { AutoScrollAction, ProjectCard } from '../card/ProjectCard';
import ConflictButton from '../card/CoIButton';
import Header from '../card/Header';
import { Rating } from '../card/Rating';
import UndoButton from '../card/UndoButton';
import VoteButton from '../card/VoteButton';
import Modals from '@/app/utils/wallet/Modals';
import {
  getPairwisePairsForProject,
  useGetPairwisePairs,
} from '../utils/data-fetching/pair';
import { convertCategoryNameToId , convertCategoryToLabel } from '../utils/helpers';
import {
  useUpdateProjectUndo,
  useUpdateProjectVote,
} from '../utils/data-fetching/vote';
import { getBiggerNumber, usePrevious } from '@/app/utils/methods';
import { useMarkCoi } from '../utils/data-fetching/coi';
import Modal from '@/app/utils/Modal';
import { IProject } from '../utils/types';
import FinishBallot from '../ballot/modals/FinishBallotModal';
import BallotSuccessModal from '../ballot/modals/BallotSuccessModal';
import BallotLoading from '../ballot/modals/BallotLoading';
import { getBallot } from '../ballot/useGetBallot';
import { uploadBallot } from '@/app/utils/wallet/agora-login';
import BallotError from '../ballot/modals/BallotError';
import { mockProject1, mockProject2 } from '../card/mockData';
import IntroView from './IntroView';
import Spinner from '../../components/Spinner';
import LowRateModal from '../card/modals/LowRateModal';
import PostRatingModal from '../card/modals/PostRatingModal';
import GoodRatingModal from '../card/modals/GoodRatingModal';
import RevertLoadingModal from '../card/modals/RevertLoadingModal';
import StorageLabel from '@/app/lib/localStorage';
import { ProjectCardAI } from '../card/ProjectCardAI';
import { mockDataAI, mockDataAI2 } from '../card/mockDataAI';

const getSuccessBalootLSKey = (address: string) => {
  return `has-unlocked-ballot-${address}`;
};

export default function Home() {
  const { category } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { checkLoginFlow } = useAuth();
  const { address, chainId } = useAccount();

  const [rating1, setRating1] = useState<number>(3);
  const [rating2, setRating2] = useState<number>(3);
  const [project1, setProject1] = useState<IProject>();
  const [project2, setProject2] = useState<IProject>();
  const [coiLoading1, setCoiLoading1] = useState(false);
  const [coiLoading2, setCoiLoading2] = useState(false);
  const [bypassPrevProgress, setBypassPrevProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastAction, setLastAction] = useState<AutoScrollAction>();

  const [showFinishBallot, setShowFinishBallot] = useState(false);
  const [showSuccessBallot, setShowSuccessBallot] = useState(false);
  const [ballotLoading, setBallotLoading] = useState(false);
  const [ballotError, setBallotError] = useState(false);
  const [revertingBack, setRevertingBack] = useState(false);
  const [showLowRateModal, setShowLowRateModal] = useState(false);
  const [showPostRatingModal, setShowPostRatingModal] = useState(false);
  const [showGoodRatingModal, setShowGoodRatingModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const [sectionExpanded1, setSectionExpanded1] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
    testimonials: true,
  });
  const [sectionExpanded2, setSectionExpanded2] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
    testimonials: true,
  });

  const [temp, setTemp] = useState(0);
  const [coi1, setCoi1] = useState(false);
  const [coi2, setCoi2] = useState(false);
  const [aiMode1, setAiMode1] = useState(false);
  const [aiMode2, setAiMode2] = useState(false);
  const [isInitialVisit, setIsInitialVisit] = useState(true);

  const cid = convertCategoryNameToId(category as JWTPayload['category']);
  const { data, isLoading } = useGetPairwisePairs(cid);
  const prevProgress = usePrevious(progress);

  const { mutateAsync: markProjectCoI } = useMarkCoi();
  const { mutateAsync: vote } = useUpdateProjectVote({ categoryId: cid });
  const { mutateAsync: undo } = useUpdateProjectUndo({
    categoryId: cid,
    onSuccess: () => {
      // if this temp state is omitted
      // then when you CoI one project and
      // then you call "undo", the app breaks
      // we probably need to combine "/pairs" and "/pairs-for-project"
      setTemp(temp + 1);
      setBypassPrevProgress(true);
    },
  });

  useEffect(() => {
    checkLoginFlow();
  }, [checkLoginFlow]);

  useEffect(() => {
    if (bypassPrevProgress && data) {
      setProgress(data.progress);
      setBypassPrevProgress(false);
    } else {
      setProgress(getBiggerNumber(prevProgress, data?.progress));
    }
  }, [data]);

  useEffect(() => {
    if (!data || !data.pairs?.length) return;
    console.log(data);
    setRating1(data.pairs[0][0].rating || 3);
    setRating2(data.pairs[0][1].rating || 3);
  }, [data]);

  useEffect(() => {
    if (!data || !address) return;
    if (data.pairs.length === 0) {
      const value = localStorage.getItem(getSuccessBalootLSKey(address));
      if (!value || !JSON.parse(value)) setShowFinishBallot(true);
      else setShowSuccessBallot(true);
      if (!project1 || !project2) {
        setProject1(mockProject1);
        setProject2(mockProject2);
      }
      return;
    }
    setProject1(data.pairs[0][0]);
    setProject2(data.pairs[0][1]);
  }, [data, temp]);

  useEffect(() => {
    const initialRating1 = data?.pairs[0][0].rating || 3;
    const initialRating2 = data?.pairs[0][1].rating || 3;

    // observe if user rated both projects
    if (rating1 !== initialRating1 && rating2 !== initialRating2) {
      setShowPostRatingModal(!getGetStarted().postRating);
    }

    // observe if first rated project is rated good >= 4
    if (
      (rating1 >= 4 &&
        rating2 === initialRating2 &&
        rating1 !== initialRating1) ||
      (rating2 >= 4 && rating1 === initialRating1 && rating2 !== initialRating2)
    ) {
      setShowGoodRatingModal(!getGetStarted().goodRating);
    }
  }, [rating1, rating2]);

  useEffect(() => {
    const getVisitKey = () => `has_visited_${chainId}_${address}`;

    const checkFirstTimeVisit = () => {
      if (address && chainId) {
        const visitKey = getVisitKey();
        const hasVisited = localStorage.getItem(visitKey) === 'true';
        setIsInitialVisit(!hasVisited);
      }
    };

    const markAsVisited = () => {
      if (address && chainId) {
        localStorage.setItem(getVisitKey(), 'true');
      }
      updateGetStarted({ goodRating: true, postRating: true });
      setShowGoodRatingModal(false);
      setShowPostRatingModal(false);
      setIsInitialVisit(false);
    };

    if (data?.votedPairs) {
      markAsVisited();
    } else {
      checkFirstTimeVisit();
      //show the post rating modal if the user has already rated the projects
      if (getGetStarted().postRating) {
        setShowPostRatingModal(false);
      }
      //show the good rating modal if the user has already rated the projects
      if (getGetStarted().goodRating) {
        setShowGoodRatingModal(false);
      }
    }
  }, [address, chainId, data?.votedPairs]);

  const toggleAiMode = () => {
    setAiMode1(!aiMode1);
    setAiMode2(!aiMode2);
  };

  const dispatchAction =
    (initiator: AutoScrollAction['initiator']) =>
    (
      section: AutoScrollAction['section'],
      action: AutoScrollAction['action']
    ) => {
      setLastAction({ section, initiator, action });
    };

  const confirmCoI1 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id1 } });
    setCoi1(false);
    setCoiLoading1(true);
    try {
      const pair = await getPairwisePairsForProject(cid, id2);
      setProject1(pair.pairs[0].find((project) => project.id !== id2)!);
    } catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      });
    }
    setCoiLoading1(false);
  };

  const cancelCoI1 = () => {
    setCoi1(false);
  };

  const showCoI1 = () => {
    setCoi1(true);
  };

  const confirmCoI2 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id2 } });
    setCoi2(false);
    setCoiLoading2(true);
    try {
      const pair = await getPairwisePairsForProject(cid, id1);
      setProject2(pair.pairs[0].find((project) => project.id !== id1)!);
      setCoi2(false);
    } catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      });
    }
    setCoiLoading2(false);
  };

  const cancelCoI2 = () => {
    setCoi2(false);
  };

  const showCoI2 = () => {
    setCoi2(true);
  };

  const setUserAsVisited = () => {
    if (address && chainId) {
      const hasVisitedKey = `has_visited_${chainId}_${address}`;
      localStorage.setItem(hasVisitedKey, 'true');
    }
    setIsInitialVisit(false);
  };

  const handleUnlockBallot = async () => {
    if (!address) return;
    setShowFinishBallot(false);
    setBallotLoading(true);
    setBallotError(false);
    try {
      const ballot = await getBallot(cid);
      await uploadBallot(ballot, address);
      localStorage.setItem(getSuccessBalootLSKey(address), 'true');
      setShowSuccessBallot(true);
    } catch (e) {
      setBallotError(true);
    } finally {
      setBallotLoading(false);
    }
  };

  const checkLowRatedProjectSelected = (chosenId: number): boolean => {
    const isLowRatedProjectSelected = (
      selectedId: number,
      ratingA: number | null | undefined,
      ratingB: number | null | undefined
    ) =>
      chosenId === selectedId && (!ratingA || (ratingB && ratingA < ratingB));

    if (
      isLowRatedProjectSelected(project1!.id, rating1, rating2) ||
      isLowRatedProjectSelected(project2!.id, rating2, rating1)
    ) {
      setSelectedProjectId(chosenId);
      setShowLowRateModal(true);
      return true;
    }

    return false;
  };

  const handleVote = async (chosenId: number) => {
    await vote({
      data: {
        project1Id: project1!.id,
        project2Id: project2!.id,
        project1Stars: rating1,
        project2Stars: rating2,
        pickedId: chosenId,
      },
    });
  };

  const handleUndo = async () => {
    setRevertingBack(true);
    setCoi1(false);
    setCoi2(false);
    await undo();
    setRevertingBack(false);
  };

  function updateGetStarted({
    goodRating,
    lowRate,
    postRating,
  }: {
    goodRating?: boolean;
    lowRate?: boolean;
    postRating?: boolean;
  }) {
    if (!address || !chainId) return;

    const currentUserKey = `${chainId}_${address}`;
    const storedData = JSON.parse(
      localStorage.getItem(StorageLabel.GET_STARTED_DATA) || '{}'
    );

    const userData = storedData[currentUserKey] || {};

    const updatedUserData = {
      ...userData,
      goodRating: goodRating || userData.goodRating,
      lowRate: lowRate || userData.lowRate,
      postRating: postRating || userData.postRating,
    };

    // Update the main data object
    storedData[currentUserKey] = updatedUserData;

    localStorage.setItem(
      StorageLabel.GET_STARTED_DATA,
      JSON.stringify(storedData)
    );
  }

  function getGetStarted() {
    if (!address || !chainId) return {};

    const storedData = JSON.parse(
      localStorage.getItem(StorageLabel.GET_STARTED_DATA) || '{}'
    );

    return storedData[`${chainId}_${address}`] || {};
  }

  if (isLoading) return <Spinner />;

  if (!address || !chainId) return redirect('/landing');

  if (!project1 || !project2 || !data) return <div>No data</div>;

  return (
    <div>
      <Modals />
      <Modal
        isOpen={
          showFinishBallot ||
          showSuccessBallot ||
          ballotLoading ||
          ballotError ||
          showLowRateModal ||
          revertingBack ||
          showPostRatingModal ||
          showGoodRatingModal
        }
        onClose={() => {}}
      >
        {showFinishBallot && (
          <FinishBallot
            category={convertCategoryToLabel(
              category as JWTPayload['category']
            )}
            projectCount={35}
            onUnlock={handleUnlockBallot}
          />
        )}
        {showSuccessBallot && (
          <BallotSuccessModal
            onClick={() => {
              router.push('https://develop-op-voting.up.railway.app/ballot');
            }}
          />
        )}
        {ballotLoading && <BallotLoading />}
        {ballotError && <BallotError onClick={handleUnlockBallot} />}
        {revertingBack && <RevertLoadingModal />}
        {showLowRateModal && (
          <LowRateModal
            proceedWithSelection={async () => {
              await handleVote(selectedProjectId!);
              setShowLowRateModal(false);
            }}
            cancelSelection={() => setShowLowRateModal(false)}
          />
        )}
        {showPostRatingModal && (
          <PostRatingModal
            confirm={() => {
              updateGetStarted({ postRating: true });
              setShowPostRatingModal(false);
            }}
          />
        )}
        {showGoodRatingModal && (
          <GoodRatingModal
            confirm={() => {
              updateGetStarted({ goodRating: true });
              setShowGoodRatingModal(false);
            }}
          />
        )}
      </Modal>
      <Header
        progress={progress * 100}
        category={convertCategoryToLabel(category! as JWTPayload['category'])}
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={isInitialVisit}
      />
      {isInitialVisit ? (
        <IntroView setUserAsVisited={setUserAsVisited} />
      ) : (
        <div className="relative flex w-full items-center justify-between gap-8 px-8 py-2">
          <div className="relative w-[49%]">
            {aiMode1 ? 
            <ProjectCardAI
              key={project1.RPGF5Id}
              aiMode={aiMode1}
              setAi={toggleAiMode}
              key1={project1.RPGF5Id}
              key2={project2.RPGF5Id}
              coiLoading={coiLoading1}
              summaryData={mockDataAI}
              coi={coi1}
              project={{ ...project1.metadata, ...project1 } as any}
              onCoICancel={cancelCoI1}
              onCoIConfirm={() => confirmCoI1(project1.id, project2.id)}
            />
            : <ProjectCard
              key={project1.RPGF5Id}
              aiMode={aiMode1}
              setAi={toggleAiMode}
              sectionExpanded={sectionExpanded1}
              setSectionExpanded={setSectionExpanded1}
              name="card1"
              action={lastAction}
              dispatchAction={dispatchAction('card1')}
              key1={project1.RPGF5Id}
              key2={project2.RPGF5Id}
              coiLoading={coiLoading1}
              coi={coi1}
              project={{ ...project1.metadata, ...project1 } as any}
              onCoICancel={cancelCoI1}
              onCoIConfirm={() => confirmCoI1(project1.id, project2.id)}
            />}
          </div>
          <div className="relative w-[49%]">
            {aiMode2 ? 
              <ProjectCardAI 
              key={project2.RPGF5Id}
              aiMode={aiMode2}
              setAi={toggleAiMode}
              key1={project2.RPGF5Id}
              key2={project1.RPGF5Id}
              coiLoading={coiLoading2}
              coi={coi2}
              summaryData={mockDataAI2}
              onCoICancel={cancelCoI2}
              onCoIConfirm={() => confirmCoI2(project1.id, project2.id)}
              project={{ ...project2.metadata, ...project2 } as any}
              />
            
            :<ProjectCard
              key={project2.RPGF5Id}
              aiMode={aiMode2}
              setAi={toggleAiMode}
              sectionExpanded={sectionExpanded2}
              setSectionExpanded={setSectionExpanded2}
              name="card2"
              action={lastAction}
              dispatchAction={dispatchAction('card2')}
              key1={project2.RPGF5Id}
              key2={project1.RPGF5Id}
              coiLoading={coiLoading2}
              coi={coi2}
              onCoICancel={cancelCoI2}
              onCoIConfirm={() => confirmCoI2(project1.id, project2.id)}
              project={{ ...project2.metadata, ...project2 } as any}
            />}
          </div>
        </div>
      )}

      <footer className="sticky bottom-0 flex w-full items-center justify-around gap-4 bg-white py-8 shadow-inner">
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row xl:gap-8">
          <Rating
            value={rating1}
            onChange={setRating1}
            disabled={isInitialVisit || coiLoading1}
          />
          <VoteButton
            onClick={() =>
              !checkLowRatedProjectSelected(project1.id) &&
              handleVote(project1.id)
            }
            disabled={isInitialVisit || coiLoading1}
          />
          <ConflictButton
            onClick={showCoI1}
            disabled={isInitialVisit || coiLoading1}
          />
        </div>
        <div className="absolute z-[1]">
          <UndoButton disabled={isInitialVisit} onClick={handleUndo} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row xl:gap-8">
          <Rating
            value={rating2}
            onChange={setRating2}
            disabled={isInitialVisit || coiLoading2}
          />
          <VoteButton
            onClick={() =>
              !checkLowRatedProjectSelected(project2.id) &&
              handleVote(project2.id)
            }
            disabled={isInitialVisit || coiLoading2}
          />
          <ConflictButton
            onClick={showCoI2}
            disabled={isInitialVisit || coiLoading2}
          />
        </div>
      </footer>
    </div>
  );
}

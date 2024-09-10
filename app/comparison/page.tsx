'use client'

import { ProjectCard } from './card'
import ConflictButton from './card/CoIButton'
import Header from './card/Header'
import { acrossProtocol, zeroKnowledgeProtocol } from './card/mockData'
import { Rating } from './card/Rating'
import UndoButton from './card/UndoButton'
import VoteButton from './card/VoteButton'

export default function Home() {
  return (
    <div className="">
      <Header
        progress={75}
        category="Cross Chain"
        question="Which project had the greatest impact on the OP Stack?"
      />
      <div className="relative flex w-full items-center justify-between gap-12 px-8 py-2">
        <div className="relative w-full">
          <ProjectCard project={zeroKnowledgeProtocol} />
          <div className="absolute bottom-28 right-[40%]">
            <Rating value={4} onChange={() => {}} />
          </div>
          <div className="absolute bottom-28 left-2/3">
            <ConflictButton />
          </div>
          <div className="absolute bottom-4 left-[37%]">
            <VoteButton title={zeroKnowledgeProtocol.name} imageUrl={zeroKnowledgeProtocol.profileImage} />
          </div>
        </div>
        <div className="absolute bottom-12 left-[calc(50%-40px)] z-[1]">
          <UndoButton onClick={() => {}} />
        </div>
        <div className="relative w-full">
          <ProjectCard project={acrossProtocol} />
          <div className="absolute bottom-28 right-[40%]">
            <Rating value={4} onChange={() => {}} />
          </div>
          <div className="absolute bottom-28 left-2/3">
            <ConflictButton />
          </div>
          <div className="absolute bottom-4 left-[37%]">
            <VoteButton title={acrossProtocol.name} imageUrl={acrossProtocol.profileImage} />
          </div>
        </div>
      </div>
    </div>
  )
}

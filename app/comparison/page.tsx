'use client'

import { ProjectCard } from './card'
import Header from './card/Header'
import { acrossProtocol, zeroKnowledgeProtocol } from './card/mockData'

export default function Home() {
  return (
    <div className="">
      <Header
        progress={75}
        category="Cross Chain"
        question="Which project had the greatest impact on the OP Stack?"
      />
      <div className="flex w-full items-center justify-between gap-16 px-8 py-2">
        <ProjectCard project={zeroKnowledgeProtocol} />
        <ProjectCard project={acrossProtocol} />
      </div>
    </div>
  )
}

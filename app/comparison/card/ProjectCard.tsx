import React, { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from './ExternalLink'
import GithubBox from './GithubBox'
import SimpleInfoBox from './SimpleInfoBox'
import QABox from './QABox'
import GrantBox from './GrantBox'
import Switch from 'react-switch'
import Team from './Team'
import { ProjectMetadata } from '../utils/types'
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp'
import ConflictOfInterestModal from './modals/CoIModal'
import { useCollapse } from 'react-collapsed'
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<CollapsibleProps> = ({ title, children }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true })

  return (
    <div className="mb-4 rounded-lg border-t pt-4">
      <div className="flex justify-between gap-4 p-4">
        <button
          className="text-xl font-medium"
        >
          {title}
        </button>
        <button {...getToggleProps()} className="flex cursor-pointer items-center gap-1 text-sm text-primary">
          {isExpanded ? <ArrowUpIcon color="black" width={20} height={20} /> : <ArrowDownIcon width={20} height={20} />}
        </button>
      </div>
      <section {...getCollapseProps()} className="p-2">{children}</section>
    </div>
  )
}

interface Props {
  project: ProjectMetadata
  coi: boolean
  onCoICancel: () => void
  onCoIConfirm: () => void
}

export const ProjectCard: React.FC<Props> = ({
  project,
  coi,
  onCoICancel,
  onCoIConfirm,
}) => {
  const [aiMode, setAiMode] = useState(false)

  const handleChange = () => {
    setAiMode(!aiMode)
  }

  return (
    <div className="relative">

      {coi && (
        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <ConflictOfInterestModal onCancel={onCoICancel} onDeclareConflict={onCoIConfirm} />
        </div>
      )}
      <div
        style={{ maskImage: 'linear-gradient(to bottom, white 85%, transparent 120%)' }}
        className={`container relative mx-auto mb-16
      mt-4 h-[80vh] w-full overflow-y-auto rounded-xl 
      border-4 border-yellow-200 bg-yellow-50 p-2 pb-32 shadow-md ${coi ? `brightness-50` : ``}`}
      >
        <div className="relative h-40">
          <Image
            src={project.projectCoverImageUrl}
            unoptimized
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <Image
            src={project.profileAvatarUrl}
            unoptimized
            alt={project.name}
            width={80}
            height={80}
            className="absolute -bottom-8 left-4 z-[4] rounded-md"
          />
        </div>
        <div className="mb-2 mt-12 flex items-center">
          <h1 className="text-3xl font-semibold">{project.name}</h1>
        </div>
        { project.organization && (
          <div className="mb-6 flex items-center gap-1 text-slate-600">
            <p>
              By
            </p>
            <Image
              src={project.organization.organizationAvatarUrl}
              alt={project.organization.name}
              width={24}
              height={24}
              className="mx-1 rounded-full"
              unoptimized
            />
            <p>
              {project.organization.name}
            </p>
          </div>
        )}
        <div className="my-2 flex items-center gap-3">
          <Switch
            onColor="#FF0420"
            offColor="#E0E2EB"
            height={25}
            width={50}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleChange}
            checked={aiMode}
          />
          <p className="font-medium"> Toggle AI Mode </p>
        </div>
        <p className="mb-4 text-slate-600">{project.description}</p>
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
          <>
            {project.socialLinks.website.map(item => (
              <ExternalLink key={item} address={item} type="website" />
            ))}
          </>
          <>
            {project.socialLinks.farcaster.map(item => (
              <ExternalLink key={item} address={item} type="warpcast" />
            ))}
          </>
          {project.socialLinks.twitter && <ExternalLink address={project.socialLinks.twitter} type="x" />}
          {project.socialLinks.mirror && <ExternalLink address={project.socialLinks.mirror} type="mirror" />}
        </div>

        <div className="mb-6 w-full">
          <Team team={(project.team || []).map(item => ({ profileImg: item.pfp_url,
            urlLink: `https://warpcast.com/${item.username}` }))}
          />
        </div>

        <Section title="Repos, links, and contracts">
          <div className="space-y-4">
            {project.github.map(repo => (
              <GithubBox key={repo.url} repo={repo} />
            ))}
            {project.links.map(contract => (
              <SimpleInfoBox
                key={contract.description}
                description={contract.description}
                title={contract.url}
                type="link"
              />
            ))}
            {project.contracts.map(contract => (
              <SimpleInfoBox
                key={contract.address}
                description={contract.description || ''}
                title={contract.address}
                type="contract"
              />
            ))}
          </div>
        </Section>

        {/* <Section title="Testimonials">
        <div className="space-y-4">
          {project.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded border bg-gray-50 p-4">
              <p className="italic">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </Section> */}

        <Section title="Impact statement">
          <div className="space-y-4">
            <div className="space-y-2">
              <p>
                <strong className="text-gray-800">Category:</strong>
                {' '}
                {project.impactStatement.category}
              </p>
              <p>
                <strong className="text-gray-800">Subcategory:</strong>
                {' '}
                {project.impactStatement.subcategory}
              </p>
              <p className="text-primary">
                Applicants were asked to report on impact made between Oct 1, 2023
                - July 31, 2024. Promises of future deliverables or impact are not
                allowed.
              </p>
            </div>
            <div className="space-y-2">
              {project.impactStatement.statement.map(({ question, answer }) => (
                <QABox key={question} question={question} answer={answer} />
              ))}
            </div>
          </div>
        </Section>

        {/* <Section title="Project Support">
          <p>{project.projectSupport}</p>
        </Section> */}

        <Section title="Pricing model">
          <div className="space-y-2">
            <div className="rounded border bg-gray-50 p-4">
              <p className="font-medium">{project.pricingModel}</p>
            </div>
            {/* <SimpleInfoBox
            title="Pay-to-use"
            description={project.pricingModel.payToUse}
            type="pricing"
          /> */}
            {/* <h3 className="font-semibold">Freemium</h3>
            <p>{project.pricingModel.freemium}</p>
            <h3 className="font-semibold mt-4">Pay-to-use</h3>
            <p>{project.pricingModel.payToUse}</p> */}
          </div>
        </Section>

        <Section title="Grants and investment">
          <div className="space-y-2">
            {project.grantsAndFunding.grants.map(grant => (
              <GrantBox
                key={grant.grant}
                description={grant.details}
                link={grant.link}
                amount={grant.amount}
                date={grant.date}
                title={grant.grant || ''}
              />
            ))}
          </div>
        </Section>
      </div>
    </div>

  )
}

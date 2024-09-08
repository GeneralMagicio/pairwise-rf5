import React, { useState } from 'react'
import Image from 'next/image'
import { Protocol } from './mockData'
import { ExternalLink } from './ExternalLink'
import GithubBox from './GithubBox'
import SimpleInfoBox from './SimpleInfoBox'
import QABox from './QABox'
import GrantBox from './GrantBox'
import Switch from 'react-switch'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<CollapsibleProps> = ({ title, children }) => {
  // const [isOpen, _setIsOpen] = useState(true);

  // const handleClick = () => {
  //   console.log("click!!");
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="mb-4 rounded-lg border-t pt-4">
      <div className="flex flex-col items-start gap-4 p-4">
        <button
          className="text-xl font-medium"
          // onClick={handleClick}
        >
          {title}
        </button>
        <span className="cursor-pointer text-sm text-primary"> View Less </span>
      </div>
      {true && <div className="p-2">{children}</div>}
    </div>
  )
}

export const ProtocolPage: React.FC<{ protocol: Protocol }> = ({
  protocol,
}) => {
  const [aiMode, setAiMode] = useState(false)

  const handleChange = () => {
    setAiMode(!aiMode)
  }

  return (
    <div className="container relative mx-auto mb-16 mt-4 h-[65vh] max-h-full max-w-[675px] overflow-y-auto rounded-xl border-4 border-yellow-200 bg-yellow-50 p-2 shadow-md">
      <div className="relative h-40">
        <Image
          src={protocol.bannerImage}
          unoptimized
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <Image
          src={protocol.profileImage}
          unoptimized
          alt={protocol.name}
          width={80}
          height={80}
          className="absolute -bottom-8 left-4 z-[4] rounded-md"
        />
      </div>
      <div className="mb-2 mt-12 flex items-center">
        <h1 className="text-3xl font-semibold">{protocol.name}</h1>
      </div>
      <div className="mb-6 flex items-center gap-1 text-slate-600">
        <p> By </p>
        <Image
          src={protocol.creatorImage}
          alt="Creator Image"
          width={20}
          height={20}
          className="rounded-full"
          unoptimized
        />
        <p>
          {' '}
          {protocol.creator}
          {' '}
        </p>
      </div>
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
      <p className="mb-4 text-slate-600">{protocol.description}</p>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
        <ExternalLink address={protocol.socialLinks.website} type="website" />
        <ExternalLink address={protocol.socialLinks.warpcast} type="warpcast" />
        <ExternalLink address={protocol.socialLinks.x} type="x" />
        <ExternalLink address={protocol.socialLinks.mirror} type="mirror" />
      </div>

      <Section title="Repos, links, and contracts">
        <div className="space-y-4">
          {protocol.repos.map(repo => (
            <GithubBox key={repo.url} repo={repo} />
          ))}
          {protocol.links.map(contract => (
            <SimpleInfoBox
              key={contract.description}
              description={contract.description}
              title={contract.address}
              type="link"
            />
          ))}
          {protocol.contracts.map(contract => (
            <SimpleInfoBox
              key={contract.description}
              description={contract.description}
              title={contract.address}
              type="contract"
            />
          ))}
        </div>
      </Section>

      <Section title="Testimonials">
        <div className="space-y-4">
          {protocol.testimonials.map((testimonial, index) => (
            <div key={index} className="rounded border p-4">
              <p className="italic">{testimonial.text}</p>
              <p className="mt-2 text-right">
                -
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Impact statement">
        <div className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong className="text-gray-800">Category:</strong>
              {' '}
              {protocol.impactStatement.category}
            </p>
            <p>
              <strong className="text-gray-800">Subcategory:</strong>
              {' '}
              {protocol.impactStatement.subcategory}
            </p>
            <p className="text-primary">
              Applicants were asked to report on impact made between Oct 1, 2023
              - July 31, 2024. Promises of future deliverables or impact are not
              allowed.
            </p>
          </div>
          <div className="space-y-2">
            {protocol.impactStatement.qas.map(({ question, answer }) => (
              <QABox key={question} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </Section>

      {/* <Section title="Project Support">
          <p>{protocol.projectSupport}</p>
        </Section> */}

      <Section title="Pricing model">
        <div className="space-y-2">
          <SimpleInfoBox
            title="Freemium"
            description={protocol.pricingModel.freemium}
            type="pricing"
          />
          <SimpleInfoBox
            title="Pay-to-use"
            description={protocol.pricingModel.payToUse}
            type="pricing"
          />
          {/* <h3 className="font-semibold">Freemium</h3>
            <p>{protocol.pricingModel.freemium}</p>
            <h3 className="font-semibold mt-4">Pay-to-use</h3>
            <p>{protocol.pricingModel.payToUse}</p> */}
        </div>
      </Section>

      <Section title="Grants and investment">
        <div className="space-y-2">
          {protocol.grants.map(grant => (
            <GrantBox key={grant.title} {...grant} />
          ))}
        </div>
      </Section>
    </div>
  )
}

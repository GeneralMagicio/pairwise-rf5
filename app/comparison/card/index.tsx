import React, { useState } from "react";
import Image from "next/image";
import { Protocol } from "./mockData";
import { ExternalLink } from "./ExternalLink";
import GithubBox from "./GithubBox";
import SimpleInfoBox from "./SimpleInfoBox";
import QABox from "./QABox";
import GrantBox from "./GrantBox";
import Switch from "react-switch";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  // const handleClick = () => {
  //   console.log("click!!");
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="border rounded-lg mb-4">
      <div className="flex flex-col p-4 gap-4 items-start">
        <button
          className="font-medium text-xl"
          // onClick={handleClick}
        >
          {title}
        </button>
        <span className="text-primary text-sm cursor-pointer"> View Less </span>
      </div>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
};

export const ProtocolPage: React.FC<{ protocol: Protocol }> = ({
  protocol,
}) => {
  const [aiMode, setAiMode] = useState(false);

  const handleChange = () => {
    setAiMode(!aiMode);
  };

  return (
    <div className="container bg-yellow-50 mx-auto p-2 max-w-[40vw] rounded-xl border-4 border-yellow-200 rounded-t-4 mt-4 mb-16">
      <div className="relative h-40">
        <Image
          src={protocol.bannerImage}
          unoptimized
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="relative bg-yellow-50 p-2 shadow-md">
        <Image
          src={protocol.profileImage}
          unoptimized
          alt={protocol.name}
          width={80}
          height={80}
          className="absolute rounded-md -top-12 mr-4"
        />
        <div className="flex items-center mb-2 mt-12">
          <h1 className="text-3xl font-semibold">{protocol.name}</h1>
        </div>
        <div className="flex items-center mb-6 gap-2 text-slate-600">
          <p> By </p>
          <Image
            src={protocol.creatorImage}
            alt="Creator Image"
            width={20}
            height={20}
            className="rounded-full"
            unoptimized
          />
          <p> {protocol.creator} </p>
        </div>
        <div className="flex items-center my-2 gap-3">
          <Switch
            onColor={"#FF0420"}
            offColor="#E0E2EB"
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={handleChange}
            checked={aiMode}
          />
          <p className="font-medium"> Toggle AI Mode </p>
        </div>
        <p className="mb-4 text-slate-600">{protocol.description}</p>
        <div className="flex text-slate-600 flex-wrap gap-x-6 gap-y-2 mb-6">
          <ExternalLink address={protocol.socialLinks.website} type="website" />
          <ExternalLink
            address={protocol.socialLinks.warpcast}
            type="warpcast"
          />
          <ExternalLink address={protocol.socialLinks.x} type="x" />
          <ExternalLink address={protocol.socialLinks.mirror} type="mirror" />
        </div>

        <Section title="Repos, links, and contracts">
          <div className="space-y-4">
            {protocol.repos.map((repo, index) => (
              <GithubBox repo={repo} />
            ))}
            {protocol.links.map((contract, index) => (
              <SimpleInfoBox
                description={contract.description}
                title={contract.address}
                type="link"
              />
            ))}
            {protocol.contracts.map((contract, index) => (
              <SimpleInfoBox
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
              <div key={index} className="border p-4 rounded">
                <p className="italic">"{testimonial.text}"</p>
                <p className="text-right mt-2">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Impact statement">
          <div className="space-y-4">
            <div className="space-y-2">
              <p>
                <strong className="text-gray-800">Category:</strong>{" "}
                {protocol.impactStatement.category}
              </p>
              <p>
                <strong className="text-gray-800">Subcategory:</strong>{" "}
                {protocol.impactStatement.subcategory}
              </p>
              <p className="text-primary">
                Applicants were asked to report on impact made between Oct 1,
                2023 - July 31, 2024. Promises of future deliverables or impact
                are not allowed.
              </p>
            </div>
            <div className="space-y-2">
              {protocol.impactStatement.qas.map(({ question, answer }) => (
                <QABox question={question} answer={answer} />
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
            {protocol.grants.map((grant, index) => (
              <GrantBox {...grant} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

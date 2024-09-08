import React, { useState } from "react";
import Image from "next/image";
import { Protocol } from "./mockData";
import { ExternalLink } from "./ExternalLink";
import GithubBox from "./GithubBox";
import SimpleInfoBox from "./SimpleInfoBox";

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
          className="font-semibold text-xl"
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
      <div className="relative bg-yellow-50 p-6 shadow-md">
        <Image
          src={protocol.profileImage}
          unoptimized
          alt={protocol.name}
          width={80}
          height={80}
          className="absolute rounded-md -top-12 mr-4"
        />
        <div className="flex items-center my-4">
          <h1 className="text-3xl font-bold">{protocol.name}</h1>
        </div>
        <p className="mb-4">{protocol.description}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
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
              <SimpleInfoBox description={contract.description} title={contract.address} type="link"/>
            ))}
            {protocol.contracts.map((contract, index) => (
              <SimpleInfoBox description={contract.description} title={contract.address} type="contract"/>
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
          <div>
            <p>
              <strong>Category:</strong> {protocol.impactStatement.category}
            </p>
            <p>
              <strong>Subcategory:</strong>{" "}
              {protocol.impactStatement.subcategory}
            </p>
            <p>{protocol.impactStatement.description}</p>
            <p>
              <strong>Date Range:</strong> {protocol.impactStatement.dateRange}
            </p>
          </div>
        </Section>

        <Section title="Project Support">
          <p>{protocol.projectSupport}</p>
        </Section>

        <Section title="Pricing model">
          <div>
            <h3 className="font-semibold">Freemium</h3>
            <p>{protocol.pricingModel.freemium}</p>
            <h3 className="font-semibold mt-4">Pay-to-use</h3>
            <p>{protocol.pricingModel.payToUse}</p>
          </div>
        </Section>

        <Section title="Grants, funding, and revenue">
          <div>
            <h3 className="font-semibold">Grants</h3>
            {protocol.grants.map((grant, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>{grant.name}:</strong> $
                  {grant.amount.toLocaleString()}
                </p>
                <p>{grant.description}</p>
              </div>
            ))}
            <h3 className="font-semibold mt-4">Funding</h3>
            <p>
              {protocol.funding.amount} ({protocol.funding.year})
            </p>
            <h3 className="font-semibold mt-4">Revenue</h3>
            <p>
              {protocol.revenue.amount} ({protocol.revenue.year})
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
};

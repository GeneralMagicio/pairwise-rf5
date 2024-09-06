import React, { useState } from "react";
import Image from "next/image";
import { Protocol } from "./mockData";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("click!!")
    setIsOpen(!isOpen);
  }

  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full text-left p-4 font-semibold flex justify-between items-center"
        onClick={handleClick}
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

export const ProtocolPage: React.FC<{ protocol: Protocol }> = ({ protocol }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-40">
        <Image
          src={protocol.bannerImage}
          unoptimized
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="bg-gray-100 p-6 rounded-b-lg shadow-md">
        <div className="flex items-center mb-4">
          <Image
            src={protocol.profileImage}
            unoptimized
            alt={protocol.name}
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <h1 className="text-3xl font-bold">{protocol.name}</h1>
        </div>
        <p className="mb-4">{protocol.description}</p>
        <div className="flex space-x-4 mb-6">
          <a
            href={protocol.socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            X
          </a>
          <a
            href={protocol.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Website
          </a>
          <a
            href={protocol.socialLinks.warpcast}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Warpcast
          </a>
        </div>

        <Collapsible title="Repos, links, and contracts">
          <div className="space-y-4">
            {protocol.repos.map((repo, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="font-semibold">{repo.url}</h3>
                <p>{repo.description}</p>
                <div className="flex space-x-4 mt-2">
                  <span>⭐ {repo.stars}</span>
                  <span>🍴 {repo.forks}</span>
                  <span>⚠️ {repo.issues}</span>
                  <span>🔀 {repo.pullRequests}</span>
                  <span>💻 {repo.commits}</span>
                  <span>👥 {repo.contributors}</span>
                </div>
              </div>
            ))}
            {protocol.contracts.map((contract, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="font-semibold">{contract.address}</h3>
                <p>{contract.description}</p>
              </div>
            ))}
          </div>
        </Collapsible>

        <Collapsible title="Testimonials">
          <div className="space-y-4">
            {protocol.testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="italic">"{testimonial.text}"</p>
                <p className="text-right mt-2">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </Collapsible>

        <Collapsible title="Impact statement">
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
        </Collapsible>

        <Collapsible title="Project Support">
          <p>{protocol.projectSupport}</p>
        </Collapsible>

        <Collapsible title="Pricing model">
          <div>
            <h3 className="font-semibold">Freemium</h3>
            <p>{protocol.pricingModel.freemium}</p>
            <h3 className="font-semibold mt-4">Pay-to-use</h3>
            <p>{protocol.pricingModel.payToUse}</p>
          </div>
        </Collapsible>

        <Collapsible title="Grants, funding, and revenue">
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
        </Collapsible>
      </div>
    </div>
  );
};
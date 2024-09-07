// rename this
export interface Protocol {
  name: string;
  profileImage: string;
  bannerImage: string;
  description: string;
  socialLinks: {
    x: string;
    website: string;
    warpcast: string;
    mirror: string;
  };
  repos: {
    url: string;
    description: string;
    stars: number;
    forks: number;
    issues: number;
    pullRequests: number;
    commits: number;
    contributors: number;
    license: string;
  }[];
  contracts: {
    address: string;
    description: string;
  }[];
  testimonials: {
    text: string;
    author: string;
  }[];
  impactStatement: {
    category: string;
    subcategory: string;
    description: string;
    dateRange: string;
  };
  projectSupport: string;
  pricingModel: {
    freemium: string;
    payToUse: string;
  };
  grants: {
    name: string;
    amount: number;
    description: string;
  }[];
  funding: {
    amount: string;
    year: number;
  };
  revenue: {
    amount: string;
    year: number;
  };
}

export const acrossProtocol: Protocol = {
  name: "Across Protocol",
  profileImage: "https://storage.googleapis.com/op-atlas/88007b1e-888c-48b1-b384-68007c654b08.png", // Placeholder path
  bannerImage: "https://storage.googleapis.com/op-atlas/f21beedb-75e7-4903-add5-cf143b691253.png", // Placeholder path
  description: "Across is an interoperability protocol powered by intents. We offer the fastest and lowest cost bridging solution for end-users, and streamlined interoperability for developers.",
  socialLinks: {
    x: "https://x.com/across_protocol",
    website: "https://across.to",
    warpcast: "https://warpcast.com/across_protocol",
    mirror: "https://mirror.com/across_protocol",
  },
  repos: [
    {
      url: "github.com/across-protocol/across-1",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      stars: 25,
      forks: 7,
      issues: 5,
      pullRequests: 2,
      commits: 1234,
      contributors: 14,
      license: "Open source",
    },
    {
      url: "github.com/across-protocol/across-2",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      stars: 0,
      forks: 0,
      issues: 0,
      pullRequests: 0,
      commits: 0,
      contributors: 0,
      license: "Open source",
    },
    {
      url: "github.com/across-protocol/across-3",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      stars: 0,
      forks: 0,
      issues: 0,
      pullRequests: 0,
      commits: 0,
      contributors: 0,
      license: "Open source",
    },
  ],
  contracts: [
    {
      address: "0xc30141B657f4216252dc59Af2e7CdB9D8792e1B0",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
    {
      address: "0xc30141B657f4216252dc59Af2e7CdB9D8792e1B1",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
    {
      address: "0xc30141B657f4216252dc59Af2e7CdB9D8792e1B2",
      description: "Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
  ],
  testimonials: [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "project_title",
    },
  ],
  impactStatement: {
    category: "Ethereum Core Contributions",
    subcategory: "Interoperability",
    description: "Applicants were asked to report on impact made between Oct 1, 2023 - July 31, 2024.",
    dateRange: "Oct 1, 2023 - July 31, 2024",
  },
  projectSupport: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat? Duis aute irure dolor in reprehenderit qui in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  pricingModel: {
    freemium: "Details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    payToUse: "Details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  grants: [
    {
      name: "Grant: Foundation Mission",
      amount: 500000,
      description: "Description of details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Grant: Foundation Grant",
      amount: 799999,
      description: "Description of details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Grant: Token House Mission",
      amount: 10000,
      description: "Description of details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Grant: Other",
      amount: 250000,
      description: "Description of details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  funding: {
    amount: "Less than $250k",
    year: 2024,
  },
  revenue: {
    amount: "$500k - $1M",
    year: 2024,
  },
};
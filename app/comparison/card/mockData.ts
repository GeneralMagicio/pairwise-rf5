// // rename this
// export interface Project {
//   name: string
//   image: string
//   projectCoverImageUrl: string
//   creator: string
//   creatorImage: string
//   description: string
//   socialLinks: {
//     x: string
//     website: string
//     warpcast: string
//     mirror: string
//   }
//   github: {
//     url: string
//     description: string
//     stars: number
//     forks: number
//     issues: number
//     pullRequests: number
//     commits: number
//     contributors: number
//     license: string
//   }[]
//   contracts: {
//     url: string
//     description: string
//   }[]
//   links: {
//     name: string
//     url: string
//     description: string
//   }[]
//   testimonials: {
//     text: string
//     author: string
//   }[]
//   impactStatement: {
//     category: string
//     subcategory: string
//     qas: {
//       question: string
//       answer: string
//     }[]
//   }
//   // projectSupport: string
//   pricingModel: string
//   grantsAndFunding: {
//     ventureFunding: Grant[]
//     revenue: Grant[]
//     grants: Grant[]
//   }
// }

// type Grant = {
//   grant?: string | null
//   link?: string | null
//   amount: string
//   date?: string
//   details?: null
// title: string
// money: {
//   currency: 'op' | 'usd'
//   amount: string
// }
// link?: string
// time?: string
// description: string
// }

// export const acrossProtocol: Project = {
//   name: 'Across Protocol',
//   creator: 'The Puky Cats',
//   creatorImage: 'https://img.babymarkt.com/isa/163853/c3/detailpage_desktop_600/-/c010866e8dca4c54a327b396f9479bbb/puky-trehjuling-cat-s6-ceety-silver-bla-2412-a235433',
//   image:
//     'https://storage.googleapis.com/op-atlas/88007b1e-888c-48b1-b384-68007c654b08.png', // Placeholder path
//   projectCoverImageUrl:
//     'https://storage.googleapis.com/op-atlas/f21beedb-75e7-4903-add5-cf143b691253.png', // Placeholder path
//   description:
//     'Across is an interoperability protocol powered by intents. We offer the fastest and lowest cost bridging solution for end-users, and streamlined interoperability for developers.',
//   socialLinks: {
//     x: 'https://x.com/across_protocol',
//     website: 'https://across.to',
//     warpcast: 'https://warpcast.com/across_protocol',
//     mirror: 'https://mirror.com/across_protocol',
//   },
//   github: [
//     {
//       url: 'github.com/across-protocol/across-1',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//       stars: 25,
//       forks: 7,
//       issues: 5,
//       pullRequests: 2,
//       commits: 1234,
//       contributors: 14,
//       license: 'Open source',
//     },
//     {
//       url: 'github.com/across-protocol/across-2',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//       stars: 0,
//       forks: 0,
//       issues: 0,
//       pullRequests: 0,
//       commits: 0,
//       contributors: 0,
//       license: 'Open source',
//     },
//     {
//       url: 'github.com/across-protocol/across-3',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//       stars: 0,
//       forks: 0,
//       issues: 0,
//       pullRequests: 0,
//       commits: 0,
//       contributors: 0,
//       license: 'Open source',
//     },
//   ],
//   links: [
//     {
//       name: 'some name',
//       url: 'link_placeholder/ipsum.com',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//     {
//       name: 'some name',
//       url: 'link_placeholder/ipsum.com',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//     {
//       name: 'some name',
//       url: 'link_placeholder/ipsum.com',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//   ],
//   contracts: [
//     {
//       url: '0xc30141B657f4216252dc59Af2e7CdB9D8792e1B0',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//     {
//       url: '0xc30141B657f4216252dc59Af2e7CdB9D8792e1B1',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//     {
//       url: '0xc30141B657f4216252dc59Af2e7CdB9D8792e1B2',
//       description:
//         'Description if it exists from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
//     },
//   ],
//   testimonials: [
//     {
//       text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       author: 'project_title',
//     },
//   ],
//   impactStatement: {
//     category: 'Ethereum Core Contributions',
//     subcategory: 'Interoperability',
//     qas: [
//       {
//         question:
//           'How does your project support, or is a dependency of, the OP Stack?',
//         answer:
//           'Our project serves as a crucial component within the OP Stack ecosystem, providing enhanced scalability and interoperability. It supports the OP Stack by offering optimized data processing capabilities, improving transaction throughput, and enabling seamless integration with other layer-2 solutions. As a dependency, it contributes to the overall efficiency and robustness of the OP Stack infrastructure.',
//       },
//       {
//         question:
//           'Which OP chains have used your project or contribution, and how have they benefited from it?',
//         answer:
//           'Several prominent OP chains have integrated our project, including OptimismPBC, Boba Network, and Metis. These chains have benefited through improved transaction speeds, reduced gas costs, and enhanced security features. Our contribution has enabled them to handle higher volumes of transactions more efficiently, resulting in a better user experience and increased adoption of their respective platforms.',
//       },
//       {
//         question:
//           'What would happen if your project or contribution ceased to exist?',
//         answer:
//           'If our project ceased to exist, it would likely cause disruptions in the OP Stack ecosystem. OP chains relying on our solution might experience reduced performance, increased transaction costs, and potential security vulnerabilities. The absence of our contribution could slow down innovation in the layer-2 scaling space and potentially hinder the growth and adoption of OP-based solutions.',
//       },
//       {
//         question: 'Is there anything else you\'d like to add?',
//         answer:
//           'We are continuously working on improving our project to better serve the OP Stack community. We welcome feedback and collaboration opportunities to further enhance the ecosystem\'s capabilities and drive innovation in the layer-2 scaling landscape. Our team is committed to maintaining and evolving our contribution to ensure long-term sustainability and value for all OP chain users and developers.',
//       },
//     ],
//   },
//   projectSupport:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat? Duis aute irure dolor in reprehenderit qui in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   pricingModel: {
//     freemium:
//       'Details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     payToUse:
//       'Details from project settings lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//   },
//   grants: [
//     {
//       title: 'Grant: Foundation Mission',
//       money: {
//         currency: 'op',
//         amount: '500,000',
//       },
//       link: 'link_placeholder/ipsum...',
//       description: 'Description or details from project settings lorem ipsum ut perspiciatis unde omnis iste natus error sit voluptatem accusa et verimos doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo unde omni.',
//     },
//     {
//       title: 'Grant: Foundation Grant',
//       money: {
//         currency: 'op',
//         amount: '799,999',
//       },
//       link: 'link_placeholder/ipsum...',
//       description: 'This grant aims to support foundational projects that align with the organization\'s core mission. It provides substantial funding to initiatives that have the potential to create significant impact and drive innovation in the field.',
//     },
//     {
//       title: 'Grant: Token House Mission',
//       money: {
//         currency: 'op',
//         amount: '10,500',
//       },
//       link: 'link_placeholder/ipsum...',
//       description: 'The Token House Mission grant is designed to support projects that enhance the ecosystem\'s token-based governance model. It funds initiatives that improve community engagement, decision-making processes, and overall decentralization efforts.',
//     },
//     {
//       title: 'Grant: Other Entities',
//       money: {
//         currency: 'usd',
//         amount: '250K - 500K',
//       },
//       link: 'link_placeholder/ipsum...',
//       time: '2024',
//       description: 'This grant program targets various entities working on diverse projects within the ecosystem. It offers flexible funding to support a wide range of initiatives that contribute to the growth and development of the platform.',
//     },
//     {
//       title: 'Funding',
//       money: {
//         currency: 'usd',
//         amount: 'Less than $250k',
//       },
//       time: '2024',
//       description: 'From a16z',
//     },
//     {
//       title: 'Revenue',
//       money: {
//         currency: 'usd',
//         amount: '$500K - $1M',
//       },
//       description: '',
//     },
//   ],
// }

// export const zeroKnowledgeProtocol: Project = {
//   name: 'ZeroKnowledge Protocol',
//   creator: 'The Crypto Wizards',
//   creatorImage: 'https://static3.tgstat.ru/channels/_0/eb/ebbd4ce575760482960843128f6f0dd1.jpg',
//   image: 'https://static3.tgstat.ru/channels/_0/eb/ebbd4ce575760482960843128f6f0dd1.jpg',
//   projectCoverImageUrl: 'https://images.ctfassets.net/qyo46trxl4dy/4qcXB8PKRguxLq90p1oHdz/d5e3beb245c294e90d9262e44352529e/what_is_a_zkp-_blog_header_1920x1080__1_.png?w=1440&h=810&q=70&fm=webp',
//   description: 'ZeroKnowledge Protocol is a cutting-edge privacy solution for blockchain networks, enabling secure and anonymous transactions while maintaining full verifiability.',
//   socialLinks: {
//     x: 'https://x.com/zk_protocol',
//     website: 'https://zeroknowledgeprotocol.io',
//     warpcast: 'https://warpcast.com/zk_protocol',
//     mirror: 'https://mirror.xyz/zk_protocol',
//   },
//   github: [
//     {
//       url: 'github.com/zeroknowledge-protocol/core',
//       description: 'Core implementation of the ZeroKnowledge Protocol, including cryptographic primitives and consensus mechanisms.',
//       stars: 1200,
//       forks: 300,
//       issues: 45,
//       pullRequests: 12,
//       commits: 3500,
//       contributors: 78,
//       license: 'MIT',
//     },
//     {
//       url: 'github.com/zeroknowledge-protocol/sdk',
//       description: 'Software Development Kit for integrating ZeroKnowledge Protocol into various blockchain applications.',
//       stars: 450,
//       forks: 120,
//       issues: 20,
//       pullRequests: 8,
//       commits: 850,
//       contributors: 35,
//       license: 'Apache-2.0',
//     },
//   ],
//   links: [
//     {
//       name: 'some name',

//       url: 'https://docs.zeroknowledgeprotocol.io',
//       description: 'Comprehensive documentation for developers and users of the ZeroKnowledge Protocol.',
//     },
//     {
//       url: 'https://forum.zeroknowledgeprotocol.io',
//       name: 'some name',
//       description: 'Community forum for discussions, proposals, and support related to the ZeroKnowledge Protocol.',
//     },
//   ],
//   contracts: [
//     {
//       url: '0x1234567890123456789012345678901234567890',
//       description: 'Main contract for the ZeroKnowledge Protocol, handling core functionality and governance.',
//     },
//     {
//       url: '0x0987654321098765432109876543210987654321',
//       description: 'ZeroKnowledge Protocol token contract, managing the native ZKP utility token.',
//     },
//   ],
//   testimonials: [
//     {
//       text: `ZeroKnowledge Protocol has revolutionized privacy in our DeFi application. It's a game-changer for user confidentiality.`,
//       author: 'DeFi Innovators Inc.',
//     },
//     {
//       text: 'Implementing ZK Protocol was seamless, and the privacy guarantees it provides are unparalleled in the industry.',
//       author: 'Blockchain Privacy Solutions',
//     },
//   ],
//   impactStatement: {
//     category: 'Privacy and Scalability',
//     subcategory: 'Zero-Knowledge Proofs',
//     qas: [
//       {
//         question: 'How does your project enhance privacy and scalability in the blockchain ecosystem?',
//         answer: 'Our ZeroKnowledge Protocol utilizes advanced cryptographic techniques to enable private transactions and computations on public blockchains. This not only enhances user privacy but also significantly improves scalability by reducing the amount of data that needs to be processed on-chain.',
//       },
//       {
//         question: 'What unique features does your protocol offer compared to other privacy solutions?',
//         answer: `Our protocol offers a unique combination of privacy, scalability, and interoperability. We've developed novel zero-knowledge proof systems that are more efficient and easier to implement than existing solutions. Additionally, our protocol is designed to be blockchain-agnostic, allowing for seamless integration with various Layer 1 and Layer 2 solutions.`,
//       },
//       {
//         question: 'How does your project contribute to the broader adoption of blockchain technology?',
//         answer: 'By addressing key concerns around privacy and scalability, our ZeroKnowledge Protocol removes significant barriers to blockchain adoption. It enables sensitive data to be processed on public blockchains without compromising confidentiality, opening up new use cases in fields such as finance, healthcare, and government services.',
//       },
//       {
//         question: `Is there anything else you'd like to add?`,
//         answer: `We're committed to ongoing research and development in the field of zero-knowledge proofs. Our team regularly publishes academic papers and open-source contributions to push the boundaries of what's possible in blockchain privacy and scalability.`,
//       },
//     ],
//   },
//   projectSupport: 'The ZeroKnowledge Protocol is supported by a dedicated team of cryptographers, blockchain developers, and security experts. We offer comprehensive documentation, developer tools, and direct support channels for projects integrating our protocol. Our community-driven governance model ensures that the protocol evolves to meet the needs of its users and stays at the forefront of privacy technology.',
//   pricingModel: {
//     freemium: 'Basic integration of ZeroKnowledge Protocol is free for all projects. This includes access to our core privacy features and basic support through our community channels.',
//     payToUse: 'For enterprise-level support, custom integrations, and advanced features, we offer tiered pricing plans. These plans include dedicated support, priority updates, and access to our team of experts for consultation.',
//   },
//   grants: [
//     {
//       title: 'ZK Innovator Grant',
//       money: {
//         currency: 'op',
//         amount: '250,000',
//       },
//       link: 'https://grants.zeroknowledgeprotocol.io/innovator',
//       description: 'This grant supports innovative projects building on top of ZeroKnowledge Protocol, focusing on novel applications of zero-knowledge proofs in various industries.',
//     },
//     {
//       title: 'Privacy Research Grant',
//       money: {
//         currency: 'usd',
//         amount: '100,000',
//       },
//       link: 'https://grants.zeroknowledgeprotocol.io/research',
//       time: '2024',
//       description: 'Aimed at academic researchers and institutions working on advancing the field of zero-knowledge proofs and their applications in blockchain technology.',
//     },
//     {
//       title: 'Ecosystem Development Fund',
//       money: {
//         currency: 'op',
//         amount: '1,000,000',
//       },
//       link: 'https://grants.zeroknowledgeprotocol.io/ecosystem',
//       description: 'A substantial fund dedicated to supporting the growth of the ZeroKnowledge Protocol ecosystem, including tooling, infrastructure, and user-facing applications.',
//     },
//     {
//       title: 'ZK Protocol Integration Grant',
//       money: {
//         currency: 'usd',
//         amount: '50K - 200K',
//       },
//       link: 'https://grants.zeroknowledgeprotocol.io/integration',
//       time: '2024-2025',
//       description: 'Grants for projects integrating ZeroKnowledge Protocol into existing blockchain platforms or applications, with funding based on the scope and impact of the integration.',
//     },
//     {
//       title: 'Series A Funding',
//       money: {
//         currency: 'usd',
//         amount: '15M',
//       },
//       time: '2023',
//       description: 'Led by Paradigm, with participation from a16z Crypto and Polychain Capital',
//     }],
// }

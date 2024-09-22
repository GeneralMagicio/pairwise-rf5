export interface ProjectMetadata {
  id: string
  applicationId: string
  projectId: string
  category: string
  applicationCategory: string
  organization: {
    name: string
    description: string
    organizationAvatarUrl: string
    organizationCoverImageUrl: string | null
    socialLinks: {
      website: string[]
      farcaster: string[]
      twitter: string | null
      mirror: string | null
    }
    team: string[]
  } | null
  name: string
  description: string
  profileAvatarUrl: string
  projectCoverImageUrl: string
  socialLinks: {
    website: string[]
    farcaster: string[]
    twitter: string | null
    mirror: string | null
  }
  team: Team[] | null
  github: Array<{
    url: string
    name: string | null
    description: string | null
  }>
  packages: any[]
  links: Array<{
    url: string
    name: string
    description: string
  }>
  contracts: Contract[]
  grantsAndFunding: {
    ventureFunding: any[]
    grants: Array<{
      grant: string | null
      link: string | null
      amount: string
      date: string
      details: string | null
    }>
    revenue: any[]
  }
  pricingModel: {
    type: string
    details: string
  }
  impactStatement: {
    category: string
    subcategory: string[]
    statement: Array<{
      answer: string
      question: string
    }>
  }
  testimonials: Array<{
    text: string
  }>
}

export interface ICategory {
  id: number
  name: string
  poll_id: number
  url: string
  impactDescription: string
  contributionDescription: null | string
  RPGF5Id: null | number
  parentId: null | number
  image: string | null
  metadata: ProjectMetadata
  created_at: string
  type: string
  progress: CollectionProgressStatus
}

export interface IProject {
  id: number
  rating: number | null
  name: string
  pollId: number
  url: string | null
  description: string
  RPGF5Id: string
  parentId: number | null
  image: string | null
  metadata: ProjectMetadata
  createdAt: string
  type: 'collection' | 'project'
}

type Contract = {
  address: string
  deploymentTxHash: string
  deployerAddress: string
  verificationProof: string
  chainId: number
  description?: string
}

type Team = {
  fid: number
  object: string
  pfp_url: string
  profile: {
    bio: {
      text: string
    }
  }
  username: string
  power_badge: boolean
  display_name: string
  active_status: string
  verifications: string[]
  follower_count: number
  custody_address: string
  following_count: number
  verified_addresses: {
    eth_addresses: string[]
    sol_addresses: string[]
  }
}

export type CollectionProgressStatus =
  | 'Attested'
  | 'Finished'
  | 'WIP - Threshold'
  | 'WIP'
  | 'Filtered'
  | 'Filtering'
  | 'Pending'

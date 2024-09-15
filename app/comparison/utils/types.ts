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
  }
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
  team: string[]
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
  contracts: any[]
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
  pricingModel: string
  impactStatement: {
    category: string
    subcategory: string[]
    statement: Array<{
      answer: string
      question: string
    }>
  }
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
  name: string
  poll_id: number
  url: string
  description: string
  RPGF5Id: string
  parentId: number | null
  image: string | null
  metadata: ProjectMetadata
  created_at: string
  type: 'collection' | 'project'
}

export type CollectionProgressStatus =
  | 'Attested'
  | 'Finished'
  | 'WIP - Threshold'
  | 'WIP'
  | 'Filtered'
  | 'Filtering'
  | 'Pending'

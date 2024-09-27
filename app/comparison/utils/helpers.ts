import { JWTPayload } from '@/app/utils/wallet/types';

export const convertCategoryNameToId = (category: JWTPayload['category']) => {
  switch (category) {
    case 'OP_STACK_RESEARCH_AND_DEVELOPMENT':
      return 1;
    case 'ETHEREUM_CORE_CONTRIBUTIONS':
      return 2;
    case 'OP_STACK_TOOLING':
      return 3;
    default:
      throw new Error(`Invalid category name: ${category}`);
  }
};

export const convertCategoryToLabel = (category: JWTPayload['category']) => {
  const labels = {
    ETHEREUM_CORE_CONTRIBUTIONS: 'Ethereum Core Contributors',
    OP_STACK_RESEARCH_AND_DEVELOPMENT: 'OP Stack R&D',
    OP_STACK_TOOLING: 'OP Stack Tooling',
  };
  return labels[category] || 'OP Stack';
};

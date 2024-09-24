import { JWTPayload } from '@/app/utils/wallet/types';

export const convertCategoryNameToId = (category: JWTPayload['category']) => {
  console.log('input cat name:', category);
  switch (category) {
    case 'ETHEREUM_CORE_CONTRIBUTIONS':
      return 1;
    case 'OP_STACK_TOOLING':
      return 2;
    case 'OP_STACK_RESEARCH_AND_DEVELOPMENT':
      return 3;
    default:
      throw new Error('Invalid category name', category);
  }
};

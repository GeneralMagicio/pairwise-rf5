import { JWTPayload } from '@/app/utils/wallet/types';

export const convertCategoryNameToId = (category: JWTPayload['category']) => {
  switch (category) {
    case 'ETHEREUM_CORE_CONTRIBUTIONS':
      return 1;
    case 'OP_STACK_RESEARCH_AND_DEVELOPMENT':
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

export const getCategoryCount = (category: JWTPayload['category']) => {
  const labels = {
    ETHEREUM_CORE_CONTRIBUTIONS: 30,
    OP_STACK_RESEARCH_AND_DEVELOPMENT: 29,
    OP_STACK_TOOLING: 20,
  };
  return category in labels ? labels[category] : 30;
};

export const categoryIdSlugMap = new Map([
  [1, 'ETHEREUM_CORE_CONTRIBUTIONS'],
  [2, 'OP_STACK_RESEARCH_AND_DEVELOPMENT'],
  [3, 'OP_STACK_TOOLING'],
]);

export const categoryIdTitleMap = new Map([
  [1, 'Ethereum Core Contributions'],
  [2, 'OP Stack Research and Development'],
  [3, 'OP Stack Tooling'],
]);

export const categorySlugIdMap = new Map([
  ['ETHEREUM_CORE_CONTRIBUTIONS', 1],
  ['OP_STACK_RESEARCH_AND_DEVELOPMENT', 2],
  ['OP_STACK_TOOLING', 3],
]);

export function formatBudget(budget: number | undefined): string {
  if (budget === undefined) {
    return 'N/A';
  }
  return budget.toLocaleString('en-US');
}

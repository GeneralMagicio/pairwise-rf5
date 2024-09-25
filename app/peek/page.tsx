'use client';

import { useEffect } from 'react';
import { useProjectsRankingByCategoryId } from '../comparison/utils/data-fetching/ranking';
import { convertCategoryNameToId } from '../comparison/utils/helpers';
import Spinner from '../components/Spinner';
import { useAuth } from '../utils/wallet/AuthProvider';


const Peek = () => {

  const {loggedToAgora, checkLoginFlow} = useAuth();

  useEffect(() => {
    checkLoginFlow();
  }, [checkLoginFlow]);

  console.log(loggedToAgora);
  
  const cid = convertCategoryNameToId(typeof loggedToAgora === 'object' ? loggedToAgora.category : 'ETHEREUM_CORE_CONTRIBUTIONS');

  const {data, isLoading} = useProjectsRankingByCategoryId(cid || 0);
  
  if (typeof loggedToAgora !== 'object' || isLoading) return <Spinner/>;

  return (
    <div>
      {data?.ranking.map((item) => (
        <p className='p-2' key={item.name}> {`${item.rank}- ${item.name} - ${Math.round(item.share * 100 * 100) / 100}% - ${item.star}`}&#9733; </p>
      ))}
    </div>
  );
  

};

export default Peek;
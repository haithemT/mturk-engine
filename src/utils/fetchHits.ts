import axios from 'axios';
import { SearchOptions, SearchSort } from '../types';
import { API_URL } from '../constants';
import { parseSearchPage } from './parsing';

export const batchFetchHits = async (options: SearchOptions) => {
  try {
    const t0 = performance.now();
    console.info(`${API_URL}${generateQueryString(options)}`);
    const response = await axios.get(`${API_URL}${generateQueryString(options)}`);
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    const rawHtml: string = response.data;
    return parseSearchPage(rawHtml);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};

export const generateQueryString = (options: SearchOptions) => {
  const { sortType, minReward, qualified } = options;

  const nonParam = `/mturk/searchbar?selectedSearchType=hitgroups`;
  return (
    nonParam +
    sortParam(sortType) +
    minRewardParam(minReward) +
    qualifiedParam(qualified)
  );
};

const sortParam = (sorting: SearchSort) => {
  switch (sorting) {
    case 'Latest':
      return '&sortType=LastUpdatedTime%3A1';
    case 'Batch Size':
      return '&sortType=NumHITs%3A1';
    case 'Reward':
      return '&sortType=Reward%3A1';
    default:
      throw new Error('Problem generating sortType param');
  }
};

const minRewardParam = (minReward: string): string => {
  return `&minReward=${minReward}`;
};

const qualifiedParam = (qualified: boolean): string => {
  return qualified ? '&qualifiedFor=on' : '&qualifiedFor=off';
};

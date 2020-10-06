import { Filter, useQuery, useSave, useUpdate, useRemove, useLazyQuery } from 'offix-datastore';
import { VolunteerActionModel } from './config';
import { VolunteerAction } from './generated';


/**
 * Fetch data for VolunteerAction
 * 
 * @param filter 
 */
export const useFindVolunteerActions = (filter?: Filter<VolunteerAction | any>) => useQuery(VolunteerActionModel);

/**
 * Update  VolunteerAction(used to update status)
 * @param filter 
 */
export const useEditVolunteerAction = () => useUpdate<VolunteerAction  | any>(VolunteerActionModel);


import { Filter, useQuery, useSave, useUpdate } from 'offix-datastore';
import { VolunteerActionModel, VolunteerEntryModel } from './config';
import { VolunteerAction, VolunteerEntry } from './generated';


/**
 * Fetch data for VolunteerAction
 * 
 * @param filter 
 */
export const useFindVolunteerActions = (filter?: Filter<VolunteerAction | any>) => useQuery(VolunteerActionModel, filter);

/**
 * Update  VolunteerAction(used to update status)
 * @param filter 
 */
export const useEditVolunteerAction = () => useUpdate<VolunteerAction  | any>(VolunteerActionModel);

/**
 * Create  VolunteerEntry
 * @param filter 
 */
 export const useCreateVolunteerEntry = () => useSave(VolunteerEntryModel);

/**
 * Update  VolunteerEntry(used to update status)
 * @param filter 
 */
 export const useEditVolunteerEntry = () => useUpdate<VolunteerEntry  | any>(VolunteerEntryModel);


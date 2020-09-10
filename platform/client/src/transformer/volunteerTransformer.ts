import { VolunteerFieldsFragment } from "../dataFacade";

export const volunteerTransformer = (volunteer: VolunteerFieldsFragment) => {
    // Restructure data
    if (volunteer.dateOfBirth) {
        //volunteer.dateOfBirth = new Date(volunteer.dateOfBirth);
    }
    //delete volunteer.__typename;

    return volunteer as VolunteerFieldsFragment;
}
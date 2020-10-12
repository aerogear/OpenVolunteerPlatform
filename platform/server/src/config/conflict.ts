// TODO

import { ThrowOnConflict } from "@graphback/datasync";

export const conflictConfig =  {
    enabled: true,
    // Let's client side to deal with conflict
    conflictResolution: ThrowOnConflict,
};
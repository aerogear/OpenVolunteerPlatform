import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const dailyAction = new SimpleSchema({
    owner: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    date: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    numberOfCasesCreated: {
        type: Number,
        max: 220,
        uniforms: {
            readonly: true
        }
    },
    numberOfRecipients: {
        type: Number,
        max: 220,
        uniforms: {
            readonly: true
        }
    },
    numberOfVolunteersAssigned: {
        type: Number,
        max: 220,
        uniforms: {
            readonly: true
        }
    }
} as any);

export default new SimpleSchema2Bridge(dailyAction);
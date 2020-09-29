import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const volunteerEntry = new SimpleSchema({
    volunteer: {
        type: String,
        uniforms: {
            readonly: true,
            required: false
        }
    },
    distributionCentre: {
        type: String,
        uniforms: {
            readonly: true,
            required: false
        }
    },
    checkedInAt: {
        type: String,
        label: "Checked in at",
        uniforms: {
            readonly: true,
            required: false
        }
    },
    checkedOutAt: {
        type: String,
        label: "Checked out at",
        uniforms: {
            readonly: true,
            required: false
        }
    },
    actionsCount: {
        type: Number,
        uniforms: {
            readonly: true,
            required: false
        }
    }
} as any);

export default new SimpleSchema2Bridge(volunteerEntry);
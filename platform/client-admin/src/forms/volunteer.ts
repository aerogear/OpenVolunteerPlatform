import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const volunteerForm = new SimpleSchema({
    firstName: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    lastName: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    email: {
        type: String,
        max: 220,
        uniforms: {
            readonly: true
        }
    },
    username: {
        type: String,
        max: 220,
        uniforms: {
            readonly: true
        }
    },
    address1: {
        type: String,
        max: 400
    },
    address2: {
        type: String,
        max: 400
    },
    city: {
        type: String,
        required: false,
        max: 100
    },
    dateOfBirth: {
        type: Date,
        required: false,
        uniforms: {
            label: "Date Of Birth"
        },
    },
    canPhoneCall: {
        type: Boolean,
        uniforms: {
            label: "I volunteer to deliver basic goods to recipients"
        }
    },
    canDeliver: {
        type: Boolean,
        uniforms: {
            label: "I volunteer to make phone calls to recipients"
        }
    }
} as any);

export default new SimpleSchema2Bridge(volunteerForm);

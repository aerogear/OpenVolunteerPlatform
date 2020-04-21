import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const volounteerForm = new SimpleSchema({
    firstName: {
        type: String,
        max: 120,
        uniforms: {
            disabled: true
        }
    },
    lastName: {
        type: String,
        max: 120,
        uniforms: {
            disabled: true
        }
    },
    email: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    },
    username: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
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
        max: 100
    },
    dateOfBirth: {
        type: Date,
        uniforms: {
            label: "Date Of Birth"
        },
    },
    canPhoneCall: {
        type: Boolean,
        uniforms: {
            label: "I volounteer to deliver basic goods to recipients"
        }
    },
    canDeliver: {
        type: Boolean,
        uniforms: {
            label: "I volounteer to make phone calls to recipients"
        }
    }
} as any);

export default new SimpleSchema2Bridge(volounteerForm);
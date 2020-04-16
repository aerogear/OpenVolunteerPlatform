import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const volounteerForm = new SimpleSchema({
    dateOfBirth: {
        type: Date,
        uniforms: {
            label: "Date Of Birth"
        },
        optional: true
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
    canPhoneCall: {
        type: Boolean,
        optional: true,
        uniforms: {
            label: "I volounteer to deliver basic goods to recipients"
        }
    },
    canDeliver: {
        type: Boolean,
        optional: true,
        uniforms: {
            label: "I volounteer to make phone calls to recipients"
        }
    }
} as any);

export default new SimpleSchema2Bridge(volounteerForm);
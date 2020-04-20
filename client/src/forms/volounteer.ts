import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const volounteerForm = new SimpleSchema({
    firstName: {
        type: String,
        max: 120,
        readonly: true
    },
    lastName: {
        type: String,
        max: 120,
        readonly: true
    },
    email: {
        type: String,
        max: 220,
        readonly: true
    },
    username: {
        type: String,
        max: 220,
        readonly: true
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
        optional: true
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
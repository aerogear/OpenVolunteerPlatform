import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const recipientSchema = new SimpleSchema({
    firstName: {
        type: String,
        max: 220
    },
    lastName: {
        type: String,
        max: 220
    },
    phone: {
        type: String,
        max: 220
    },
    address1: {
        type: String,
        max: 220
    },
    address2: {
        type: String,
        max: 220
    },
    city: {
        type: String,
        max: 220,
        required: false
    },
    postcode: {
        type: Number,
        required: false
    },
    prefferedProducts: {
        type: String,
        max: 220,
        required: false
    },
    lat: {
        type: Number,
        required: false,
        uniforms: {
            label: "Latitude"
        }
    },
    long: {
        type: Number,
        required: false,
        uniforms: {
            label: "Longitude"
        }
    }
} as any);

export default new SimpleSchema2Bridge(recipientSchema);

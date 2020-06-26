import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const distributionCentre = new SimpleSchema({
    name: {
        type: String,
        max: 120
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
    postcode: {
        type: Number,
        required: false,
    },
    lat: {
        type: Number,
        required: true,
        uniforms: {
            label: "Latitude"
        }
    },
    long: {
        type: Number,
        required: true,
        uniforms: {
            label: "Longitude"
        }
    }
} as any);

export default new SimpleSchema2Bridge(distributionCentre);

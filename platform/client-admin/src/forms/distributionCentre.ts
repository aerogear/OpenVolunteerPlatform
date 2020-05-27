import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

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

export default new SimpleSchema2Bridge(distributionCentre);

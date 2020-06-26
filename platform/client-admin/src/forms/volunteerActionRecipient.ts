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
    prefferedProducts: {
        type: String,
        max: 220,
        required: false
    }
} as any);

export default new SimpleSchema2Bridge(recipientSchema);

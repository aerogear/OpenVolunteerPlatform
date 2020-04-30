import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const recipientSchema = new SimpleSchema({
    name: {
        type: String,
        max: 220
    },
    phone: {
        type: String,
        max: 220
    },
    address: {
        type: String,
        max: 220
    },
    prefferedProducts: {
        type: String,
        max: 220
    }
} as any);

export default new SimpleSchema2Bridge(recipientSchema);

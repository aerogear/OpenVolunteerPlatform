import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const recieverSchema = new SimpleSchema({
    name: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    },
    phone: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    },
    address1: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    },
    address2: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    },
    prefferedProducts: {
        type: String,
        max: 220,
        uniforms: {
            disabled: true
        }
    }
} as any);

export default new SimpleSchema2Bridge(recieverSchema);
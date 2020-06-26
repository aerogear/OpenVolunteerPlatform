import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const adminForm = new SimpleSchema({
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
    }
} as any);

export default new SimpleSchema2Bridge(adminForm);
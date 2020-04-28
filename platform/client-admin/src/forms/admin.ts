import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const adminForm = new SimpleSchema({
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
    }
} as any);

export default new SimpleSchema2Bridge(adminForm);
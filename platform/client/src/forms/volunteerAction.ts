import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const volunteerActionForm = new SimpleSchema({
    title: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    },
    description: {
        type: String,
        max: 120,
        uniforms: {
            readonly: true
        }
    }/*,
    products: {
        type: String,
        max: 220,
        uniforms: {
            readonly: true
        }
    },*/,
    status: {
        type: String,
        max: 220,
        uniforms: {
            readonly: false,
            defaultValue: 'ASSIGNED',
            allowedValues: [
                'ASSIGNED', 'COMPLETED'
            ]
        }
    },

} as any);

export default new SimpleSchema2Bridge(volunteerActionForm);
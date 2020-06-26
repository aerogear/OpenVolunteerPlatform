import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

export default function createVolunteerActionForm(recipients: string[], volunteers: string[], distributionCentres: string[], products: string[]) {
    const volunteerActionForm = new SimpleSchema({
        title: {
            type: String,
            max: 120
        },
        description: {
            type: String,
            max: 120
        },
        recipientName: {
            type: String,
            max: 220,
            uniforms: {
                allowedValues: recipients
            }
        },
        volunteerName: {
            type: String,
            max: 220,
            uniforms: {
                allowedValues: volunteers
            }
        },
        distributionCentreName: {
            type: String,
            max: 220,
            uniforms: {
                allowedValues: distributionCentres
            }
        },
        products: {
            type: Array,
            uniforms: {
                multiple: true,
                allowedValues: products
            }
        },
        "products.$": {
            type: String
        }
    } as any);

    return new SimpleSchema2Bridge(volunteerActionForm);
}

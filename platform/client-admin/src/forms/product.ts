import SimpleSchema from '../config/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

export default function createProductSchema(distributionCentres: string[], defaultDistributionCentre: string) {
    const productSchema = new SimpleSchema({
        label: {
            type: String,
            max: 50
        },
        description: {
            type: String,
            max: 500
        },
        distributionCentre: {
            type: String,
            max: 100,
            required: false,
            uniforms: {
            label: "Name of the Distribution Centre",
            readonly: false,
            defaultValue: defaultDistributionCentre,
            allowedValues: distributionCentres
            }
        },
    } as any);

    return new SimpleSchema2Bridge(productSchema)
}

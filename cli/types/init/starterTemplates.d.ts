import { Template } from './templateMetadata';
/**
 * available templates
 */
export declare const allTemplates: Template[];
/**
 * download and extract template from repository into project folder
 * @param template template information
 * @param name name of project folder
 */
export declare function extractTemplate(template: Template, name: string): Promise<void>;

import { Argv } from 'yargs';
declare type Params = {
    name?: string;
    templateName?: string;
    templateUrl: string;
};
export declare const command = "init <name>";
export declare const desc = "Create project from available templates";
export declare const builder: (args: Argv<{}>) => void;
export declare function handler({ name, templateName, templateUrl }: Params): Promise<void>;
export {};

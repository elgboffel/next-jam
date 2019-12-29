/* This is required for cssModules to work with Typescript */
declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}
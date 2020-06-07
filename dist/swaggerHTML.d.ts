declare const swaggerHTML: (apiPath: string, options?: {
    [name: string]: any;
    ui?: string;
    swaggerVersion?: string;
}) => string;
export default swaggerHTML;
export { swaggerHTML };

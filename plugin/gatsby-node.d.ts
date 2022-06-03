declare const pluginOptionsSchema: ({ Joi }: {
    Joi: any;
}) => any;
declare const onPreInit: (_: any, pluginOptions: any) => void;

export { onPreInit, pluginOptionsSchema };

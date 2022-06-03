declare const onClientEntry: (_: any, pluginOptions: any) => void;
declare const onInitialClientRender: (_: any, { scrollbarOptions }: {
    scrollbarOptions: any;
}) => void;
declare const onRouteUpdate: ({ location, prevLocation }: {
    location: any;
    prevLocation: any;
}, scrollbarOptions: any) => void;
declare const shouldUpdateScroll: ({ routerProps: { location }, getSavedScrollPosition, }: {
    routerProps: {
        location: any;
    };
    getSavedScrollPosition: any;
}, scrollbarOptions: any) => boolean;

export { onClientEntry, onInitialClientRender, onRouteUpdate, shouldUpdateScroll };

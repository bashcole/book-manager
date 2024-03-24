import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            placeholderData: (previousData: never) => previousData,
            refetchOnWindowFocus: 'always',
        },
    },
});

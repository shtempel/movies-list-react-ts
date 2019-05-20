export interface Router {
    action: string;
    location: {
        hash: string;
        pathname: string;
        search: string;
        state: any;
    };
}

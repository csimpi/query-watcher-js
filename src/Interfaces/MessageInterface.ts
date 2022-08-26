export interface MessageInterface {
    data: {
        queryModel:
            {
                time: number;
                sql: string;
                bindings: any;
                connection: string;
                trigger?: {
                    action: string;
                    context: {
                        url: string;
                        method?: string;
                        input: any;
                    };
                };
                auth?:{
                    check: boolean;
                    id?: number|null;
                    model?: any|null;
                };
            };
    };
}
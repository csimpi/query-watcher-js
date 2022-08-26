import {program} from "commander";

export class QueryWatcherJsService{
    static instance:QueryWatcherJsService;
    static DEBUG_LEVEL = 1;

    options:string[] = [
        '-d --driver <driver>',
        '-t --token <token>'
    ];
    parameters:{[key: string]: string} = {}


    constructor() {
        this.parseParameters();
    }

    parseParameters(){
        const p = program.allowUnknownOption(true);
        p.name('query-log-watcher-js')
            .description('Stalker for YorCreative/Laravel-Query-Watcher');

        for(const k in this.options){
            p.option(this.options[k]);
        }

        program.parse();
        this.parameters = program.opts();
    }

    setParameter(parameter:string){
        this.options.push(parameter);
        this.parseParameters();
    }

    /** Singleton **/
    public static getInstance(): QueryWatcherJsService {
        if (!QueryWatcherJsService.instance) {
            QueryWatcherJsService.instance = new QueryWatcherJsService();
        }
        return QueryWatcherJsService.instance;
    }

}
#!/usr/bin/env node
import "dotenv/config"
import {AdapterInterface} from "./Interfaces/AdapterInterface";
import {MessageInterface} from "./Interfaces/MessageInterface";
import {MessageTransformer} from "./Transformers/MessageTransformer";
import {QueryWatcherJsService} from "./Services/QueryWatcherJsService";
import chalk from "chalk";
import {Log} from "./Utilities/Log";

export class QueryLogWatcher {
    // Parse .env params first (can be overridden by command line parameters)
    driver: string | undefined = process.env.DRIVER;
    token:string = process.env.QUERY_WATCH_TOKEN ? process.env.QUERY_WATCH_TOKEN : '';
    channel:string = "private-query.event."+this.token;

    protected connection: AdapterInterface | undefined;

    constructor() {
        this.parseParameters();
        if(this.validateParameters()){
            console.log('Selected driver:',chalk.greenBright(this.driver));
            let adapter = this.capitalizeFirstLetter(this.driver || '')+'Adapter';
            import("./Adapters/"+adapter).then((adapter:any) => {
                this.connection = new adapter.RedisAdapter(this.channel);
                this.watch();
            });
        }else{
            process.exit(1);
        }
    }

    watch(){
        this.connection?.onMessage().subscribe((message: MessageInterface)=>{
            console.log(...MessageTransformer.transform(message));
            console.log();
        })
    }

    parseParameters(){
        Log.info('Default arguments: ',QueryWatcherJsService.getInstance().parameters);
        const parameters = QueryWatcherJsService.getInstance().parameters;
        this.driver = parameters.driver || this.driver;
        this.token = parameters.token || this.token;
    }

    validateParameters(){
        if(!this.token){
            console.error(chalk.red.bold('Security token is missing. You can set it either in a .env file (recommended) or with --token argument (not recommended)'));
            return false;
        }
        if(!this.driver){
            console.error(chalk.red.bold('The driver parameter is missing. You can set it either in a .env file or with --driver parameter'));
            return false;
        }
        return true;
    }

    capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

new QueryLogWatcher();




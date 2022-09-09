import chalk from "chalk";
import {QueryWatcherJsService} from "../Services/QueryWatcherJsService";

export class Log{
    static status_colors:{[key: string]: any} = {
        'debug': chalk.reset,
        'info': chalk.blue,
        'success': chalk.green,
        'warning': chalk.hex('#FFA500'), // Orange color
        'error': chalk.bold.red,
    };

    static debug(...args: any[]){
        this.log('debug',...args);
    }

    static info(...args: any[]){
        this.log('info',...args);
    }

    static success(...args: any[]){
        this.log('success',...args);
    }

    static warning(...args: any[]){
        this.log('warning',...args);
    }

    static error(...args: any[]){
        this.log('error',...args);
    }

    static memory(){
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        this.warning(`${Math.round(used * 100) / 100} MB`);
    }

    static log(type:string, ...args: any[]){
        if(QueryWatcherJsService.DEBUG_LEVEL > 0){
            let message:any[] = [];
            for(const k in args){
                if(typeof args[k] === 'string'){
                    message.push(this.status_colors[type](args[k]));
                }else{
                    message.push(args[k]);
                }
            }
            console.log(...message);
        }
    }
}
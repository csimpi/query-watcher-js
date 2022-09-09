import { Subject } from "rxjs"
import ioRedis from "ioredis";
import {AdapterInterface} from "../Interfaces/AdapterInterface";
import {QueryWatcherJsService} from "../Services/QueryWatcherJsService";
import {Log} from "../Utilities/Log";

const host = process.env.REDIS_HOST ?? 'localhost';
const port:number = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;

export class RedisAdapter implements AdapterInterface{
    protected host:string;
    protected port:number;
    protected channel:string;
    protected Server:any;
    protected $Messages: Subject<any> = new Subject();

    constructor(channel:string) {
        const queryWatcherJsService = QueryWatcherJsService.getInstance();
        queryWatcherJsService.setParameter('-rh --redis_host <driver>');
        queryWatcherJsService.setParameter('-rp --redis_port <port>');

        Log.info('Adapter\'s extra Params:',queryWatcherJsService.parameters);

        this.host = queryWatcherJsService.parameters.redis_host || host;
        this.port = parseInt(queryWatcherJsService.parameters.redis_port) || port;
        this.channel = channel;

        this.connect(this.host, this.port, this.channel);
    }

    connect(host:string,port:number, channel:string){
        console.log(`Connecting to ${host}:${port}`)
        this.Server = new ioRedis(port, host);

        this.Server.subscribe(channel, (err: { message: any; }, count: number) => {
            if (err) {
                console.error("Failed to subscribe: %s", err.message);
                process.exit(1);
            } else {
                Log.debug(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
            }
        });

        this.Server.on('message',  (channel: string, message: any) => {
            message  = JSON.parse(message);
            //io.emit(channel + ':' + message.event, message.data);
            this.$Messages.next(message);
        });

        this.Server.on('error',  (error: any) => {
            console.error('Error during connecting to the service:\n', error);
            process.exit(1);
        });
    }

    onMessage(){
        return this.$Messages;
    }

    getServer(){
        return this.Server;
    }

}
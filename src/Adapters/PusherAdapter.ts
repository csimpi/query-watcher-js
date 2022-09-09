import { Subject } from "rxjs"
import {QueryWatcherJsService} from "../Services/QueryWatcherJsService";
import {Log} from "../Utilities/Log";
import {AdapterInterface} from "../Interfaces/AdapterInterface";
import Pusher from 'pusher-js';


export class PusherAdapter implements AdapterInterface{
    protected app_id:string = process.env.PUSHER_APP_ID ?? '';
    protected app_key:string = process.env.PUSHER_APP_KEY ?? '';
    protected app_secret:string = process.env.PUSHER_APP_SECRET ?? '';
    protected app_cluster:string = process.env.PUSHER_APP_CLUSTER ?? '';
    protected app_auth_endpoint:string = process.env.PUSHER_APP_AUTH_ENDPOINT ?? '/broadcasting/auth';
    protected channel:string;
    protected Server:any;
    protected $Messages: Subject<any> = new Subject();

    constructor(channel:string) {
        const queryWatcherJsService = QueryWatcherJsService.getInstance();
        queryWatcherJsService.setParameter('-pappid --pusher_app_id <driver>');
        queryWatcherJsService.setParameter('-pappkey --pusher_app_key <port>');
        queryWatcherJsService.setParameter('-pappsec --pusher_app_secret <port>');
        queryWatcherJsService.setParameter('-pappclu --pusher_app_cluster <port>');
        queryWatcherJsService.setParameter('-pappauthep --pusher_app_auth_endpoint <port>');

        Log.info('Adapter\'s extra Params:',queryWatcherJsService.parameters);

        this.app_id = queryWatcherJsService.parameters.pusher_app_id || this.app_id;
        this.app_key = queryWatcherJsService.parameters.pusher_app_key || this.app_key;
        this.app_secret = queryWatcherJsService.parameters.pusher_app_secret || this.app_secret;
        this.app_cluster = queryWatcherJsService.parameters.pusher_app_cluster || this.app_cluster;
        this.app_auth_endpoint = queryWatcherJsService.parameters.pusher_app_cluster || this.app_auth_endpoint;
        this.channel = channel;

        this.connect();
    }

    connect(){
        Log.info(`Connecting to pusher APP ID: ${this.app_id} APP KEY: ${this.app_key} on channel ${this.channel}`);


        Pusher.log = (msg) => {
            //Log.info(msg);
        };

        const pusher = new Pusher(this.app_key, {
            cluster: this.app_cluster,
            //forceTLS: true,
            authEndpoint: this.app_auth_endpoint,
        });

        pusher.connection.bind('connected',(data: any) => {
            Log.success('Connection was successful!');
        });

        const channel = pusher.subscribe(this.channel);

        channel.bind('pusher:subscription_succeeded', function() {
            Log.success('Successfully subscribed to the channel!');
        });

        pusher.bind('query.event',(data: any) => {
            this.$Messages.next({data:data});
        });
    }

    onMessage(){
        return this.$Messages;
    }

    getServer(){
        return this.Server;
    }

}
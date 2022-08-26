import {Subject} from "rxjs"
export interface AdapterInterface {
    connect(host:string, port: number, channel: string): any;
    onMessage(): Subject<any>;
    getServer(): any;
}
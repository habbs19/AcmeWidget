import { Injectable } from "@angular/core";
import { Adapter } from "../adapter";

export interface  Activity {
    type: number,
    name: string
}

@Injectable({
    providedIn: "root",
})
export class ActivityAdapter implements Adapter<Activity>{
    adapt(item: any): Activity {
        return {type:item.type,name:item.name} as Activity
    }
}
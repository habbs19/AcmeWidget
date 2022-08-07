import { Injectable } from "@angular/core";
import { Adapter } from "../adapter";
import { Activity, ActivityAdapter } from "./activity.model";
import { Participant, ParticipantAdapter } from "./participant.model";

export interface ActivityForm {
    formId: number | null | undefined 
    activity: Activity | undefined
    employee: Participant | undefined
    comments: string | null | undefined
}

@Injectable({
    providedIn: "root",
})
export class ActivityFormAdapter implements Adapter<ActivityForm>{

    constructor(
        private partAdapter: ParticipantAdapter,
        private actAdapter: ActivityAdapter
    ) {}

    adapt(item: any): ActivityForm {
        return {
            formId: item.formId,
            employee: this.partAdapter.adapt(item.employee),
            activity: this.actAdapter.adapt(item.activity),
            comments: item.comments
        } as ActivityForm
    }
}


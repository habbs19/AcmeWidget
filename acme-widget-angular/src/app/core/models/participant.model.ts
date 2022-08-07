import { Injectable } from "@angular/core"
import { Adapter } from "../adapter"
import { Activity } from "./activity.model"

export interface Participant {
    employeeId: number | null | undefined
    firstName: string
    lastName: string
    emailAddress: string
}

@Injectable({
    providedIn: "root",
})
export class ParticipantAdapter implements Adapter<Participant>{
    adapt(item: any): Participant {
        return {
            employeeId: item.employeeId,
            firstName: item.firstName,
            lastName: item.lastName,
            emailAddress: item.emailAddress
        } as Participant
    }
}
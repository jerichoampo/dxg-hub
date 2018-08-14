import { Character } from "./character";

export interface User {
    uid: string
    email: string
    displayName: string
    photoUrl: string
    dateCreated: string
    dateUpdated: string
    wow_character?: Character
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { WowClass } from '../model/wow-class';
import { WowRace } from '../model/wow-race';
import { Character } from '../model/character';


@Injectable({
    providedIn: 'root'
})
export class WowService {

    races: BehaviorSubject<WowRace[]>;
    classes: BehaviorSubject<WowClass[]>;

    constructor(private http: HttpClient) {
        const raceUrl = `${ environment.blizzard.url }/data/character/races?locale=en_US&apikey=${ environment.blizzard.apiKey }`;
        const classUrl = `${ environment.blizzard.url }/data/character/classes?locale=en_US&apikey=${ environment.blizzard.apiKey }`;

        this.races = new BehaviorSubject<WowRace[]>(null);
        this.classes = new BehaviorSubject<WowClass[]>(null);

        this.http.get<WowRace[]>(raceUrl).subscribe(res => this.races.next(res));
        this.http.get<WowClass[]>(classUrl).subscribe(res => this.classes.next(res));

    }


    getCharacter(realm: string, characterName: string): Promise<Character> {
        return this.http.get<Character>(`${ environment.blizzard.url }/character/${ realm }/${ characterName }?locale=en_US&apikey=${ environment.blizzard.apiKey }`).toPromise()
    }

    get races$(): Observable<WowRace[]> {
        return this.races.asObservable();
    }

    get classes$(): Observable<WowClass[]> {
        return this.classes.asObservable()
    }

    get factions(): any {
        return ['', 'Horde'];
    }

}

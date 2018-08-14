import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../model/character';
import { environment } from '../../../environments/environment';
import { WowService } from '../../wow/wow.service';
import { WowClass } from '../../model/wow-class';
import { Observable } from 'rxjs';
import { WowRace } from '../../model/wow-race';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

    @Input() data: Character
    imageUrl: string
    characterClass: string

    wowClasses$: Observable<WowClass[]>;
    wowRaces$: Observable<WowRace[]>;
    factions: any;

    constructor(private wow: WowService) {
        this.wowRaces$ = this.wow.races$;
        this.wowClasses$ = this.wow.classes$;
        this.factions = this.wow.factions;
    }

    ngOnInit() {
        this.imageUrl = environment.blizzard.imgUrl + this.data.thumbnail;
    }

}

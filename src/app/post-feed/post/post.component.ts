import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input() title: string
    @Input() body: string

  constructor() { }

  ngOnInit() {
  }

}

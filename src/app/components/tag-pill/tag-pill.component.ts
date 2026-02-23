import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cmp-tag-pill',
  templateUrl: './tag-pill.component.html',
  styleUrls: ['./tag-pill.component.scss'],
})
export class TagPillComponent  implements OnInit {

  @Input() tag: String = "";

  constructor() { }

  ngOnInit() {}

}

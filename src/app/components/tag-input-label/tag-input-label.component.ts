import { Component, Input, OnInit } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'cmp-tag-input-label',
  templateUrl: './tag-input-label.component.html',
  styleUrls: ['./tag-input-label.component.scss'],
  imports: [IonIcon],
})
export class TagInputLabelComponent  implements OnInit {
  @Input() tag: String = "";

  constructor() {
    addIcons({closeOutline})
   }

  ngOnInit() {}

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon, IonButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'cmp-tag-input-label',
  templateUrl: './tag-input-label.component.html',
  styleUrls: ['./tag-input-label.component.scss'],
  imports: [IonButton, IonIcon],
})
export class TagInputLabelComponent  implements OnInit {
  @Input() tag: String = "";
  @Output() triggerRemove = new EventEmitter<null>();;

  constructor() {
    addIcons({closeOutline})
   }

  ngOnInit() {}

  emitClick(){
    this.triggerRemove.emit()
  }
}

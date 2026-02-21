import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonSearchbar, IonList, IonItem, IonItemOption, IonText } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'cmp-searching-text-input',
  templateUrl: './searching-text-input.component.html',
  styleUrls: ['./searching-text-input.component.scss'],
  imports: [IonText, IonItemOption, IonItem, IonList, IonSearchbar, FormsModule],
  host:{
    class: 'ion-display-relative'
  }
})
export class SearchingTextInputComponent  implements OnInit {
  constructor() { }

  ngOnInit() {}

  searchTerm: string = '';
  @Input() options: string[] = [
    'Berlin',
    'Hamburg',
    'München',
    'Köln',
    'Frankfurt',
    'Stuttgart',
    'Düsseldorf'
  ];
  filteredItems: string[] = [];
  @Output() onValueChanged = new EventEmitter<string>();

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.onValueChanged.emit(this.searchTerm);
    
    const searchIn = this.searchTerm.toLowerCase();
    if (searchIn && searchIn.trim() !== '') {
      this.filteredItems = this.options.filter(options =>
        options.toLowerCase().includes(searchIn)
      );
    } else {
      this.filteredItems = [];
    }
  }

  selectItem(item: string) {
    this.searchTerm = item;
    this.filteredItems = [];
    this.onValueChanged.emit(this.searchTerm);
    console.log("Emit: " + this.searchTerm);
    
  }
}

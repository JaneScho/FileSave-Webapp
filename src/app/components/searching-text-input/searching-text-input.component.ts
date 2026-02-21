import { Component, Input, OnInit, Output } from '@angular/core';
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
  @Output() selected !: String;

  constructor() { }

  ngOnInit() {}

  searchTerm: String = '';
  @Input() options: String[] = [
    'Berlin',
    'Hamburg',
    'München',
    'Köln',
    'Frankfurt',
    'Stuttgart',
    'Düsseldorf'
  ];
  filteredItems: String[] = [];

  onSearch(event: any) {
    const val = event.target.value.toLowerCase();
    if (val && val.trim() !== '') {
      this.filteredItems = this.options.filter(options =>
        options.toLowerCase().includes(val)
      );
    } else {
      this.filteredItems = [];
    }
  }

  selectItem(item: String) {
    this.searchTerm = item;
    this.filteredItems = [];
  }
}

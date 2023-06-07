import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef<HTMLInputElement>;

  @Output() add = new EventEmitter<Ingredient>();
  @Output() delete = new EventEmitter<Ingredient>();
  @Output() clear = new EventEmitter<void>();

  onAdd(ingredient: Ingredient) {
    this.add.emit(ingredient);
  }

  onDelete(ingredient: Ingredient) {
    this.delete.emit(ingredient);
  }

  onClear() {
    this.clear.emit();
  }
}

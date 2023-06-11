import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '@doable/api-interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[doableItem]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoItemComponent implements OnChanges {
  constructor(private elementRef: ElementRef) { }

  @ViewChild('titleInput') titleInput: ElementRef;
  @Input() todo: Todo;
  @Input() selected: boolean;
  @Output() checked: EventEmitter<void> = new EventEmitter();
  @Output() unchecked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() doubleClicked: EventEmitter<void> = new EventEmitter();
  @Output() saved: EventEmitter<Todo> = new EventEmitter();
  @Output() cancelled: EventEmitter<Todo> = new EventEmitter();
  @HostBinding('class.todo--selected') get isSelected() {
    return this.selected;
  }

  @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
      if (this.selected && !this.elementRef.nativeElement.contains(event.target)) {
        this.handleFormSubmit();
      }
    }

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    note: new FormControl('')
  });

  get title(): string {
    return this.form.get('title').getRawValue();
  }

  get note(): string {
    return this.form.get('note').getRawValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo']) {
      this.form.patchValue(changes['todo'].currentValue);
    }
    if (changes['selected'] && changes['selected'].currentValue) {
      // TODO: replace
      setTimeout(() => {
        this.titleInput.nativeElement.focus();
      }, 300);
    }
  }

  handleCheckboxChanged(event: Event): void {
    const target = (event.target as HTMLInputElement);
    target.checked ? this.checked.emit() : this.unchecked.emit();
  }

  handleDeleteClick(): void {
    this.deleteClicked.emit();
  }

  handleDoubleClick(): void {
    this.doubleClicked.emit();
  }

  handleSave(): void {
    this.saved.emit({ ...this.todo, title: this.title, note: this.note });
  }

  handleCancel(): void {
    this.cancelled.emit();
  }

  handleFormSubmit(): void {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.handleSave();
        return;
      }
      this.handleCancel();
    }
  }
}

import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc' | '';
}
@Directive({
  selector: 'th[sortable]',
  standalone: true
})
export class SortableHeaderDirective {
  @Input() sortable: string = '';
  @Input() direction: 'asc' | 'desc' | '' = '';
  @Output() sort = new EventEmitter<SortEvent>();
  static headers: SortableHeaderDirective[] = []; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    SortableHeaderDirective.headers.push(this);
  }

  @HostListener('click') onClick() {
    SortableHeaderDirective.headers.forEach(header => {
      if (header !== this) {
        header.direction = '';
        header.updateStatus();
      }
    });

    this.toggleSortDirection();
    this.sortChange();
    this.updateStatus();
  }

  updateStatus() {
    const caretElement = this.el.nativeElement.querySelector('a');
    if (caretElement) {
      ['asc', 'desc', 'none'].forEach(className => {
        this.renderer.removeClass(caretElement, className);
      });

      const directionClass =
        this.direction === 'asc' ? 'asc' :
        this.direction === 'desc' ? 'desc' : 'none';

      this.renderer.addClass(caretElement, directionClass);
    }
  }

  private toggleSortDirection() {
    this.direction =
      this.direction === 'asc' ? 'desc' :
      this.direction === 'desc' ? '' : 'asc';
  }

  private sortChange() {
    this.sort.emit({
      column: this.sortable,
      direction: this.direction
    });
  }
}



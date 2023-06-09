import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open')  isOpen = false;
    constructor(private el: ElementRef<HTMLElement>) {}

    @HostListener('document:click', ['$event'])
    toggleOpen(event: Event) {
        this.isOpen = this.el.nativeElement.contains(event.target as Node) ? !this.isOpen : false;
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {

  @Input() availableColors: string[] = [];
  @Input() selectedColor: string = '';

  @Output() attempt = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  colorSelected(color: string) {
    this.attempt.emit(color);
  }

}

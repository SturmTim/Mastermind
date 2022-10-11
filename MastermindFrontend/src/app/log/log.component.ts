import { Component, OnInit } from '@angular/core';
import {NotifierService} from "./NotifierService";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: string[] = []

  constructor(
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.notifierService.listen().subscribe(x => this.logs.push(x))
  }

}

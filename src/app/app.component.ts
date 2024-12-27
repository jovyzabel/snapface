import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { HeaderComponent } from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {filter, interval, map, Observable, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  interval$ !: Observable<string>

  logger(text:string){
    console.log(`Log : ${text}`);
  }

  ngOnInit() {
   this.interval$ = interval(1000).pipe(
     filter(value => value % 3 === 0),
     map(value => value%2  === 0 ?
     `Je suis ${value} pair`:
         `Je suis ${value} impair`
     ),
     tap(value => console.log(value))
   );
    //this.interval$.subscribe(v => console.log(v));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import {FaceSnapService} from "../services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, DatePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{
  @Input() faceSnap!: FaceSnap;
  userHasSnapped!: boolean;
  snapButtonText!: string;

  constructor(private faceSnapService: FaceSnapService, private router: Router) {
  }
  onViewFaceSnap(){
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }

  ngOnInit(): void {
      this.userHasSnapped = false;
      this.snapButtonText = "Oh snap!"
  }
  onSnap(){
    this.userHasSnapped ? this.unSnap() : this.snap();
  }
  unSnap(): void{
    this.faceSnapService.snapFaceSnapById(this.faceSnap.id, 'unsnap')
    this.snapButtonText = "snap!";
    this.userHasSnapped = false;
  }
  snap(): void{
    this.faceSnapService.snapFaceSnapById(this.faceSnap.id,'snap')
    this.snapButtonText = "Oops, snap!";
    this.userHasSnapped = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import {FaceSnapService} from "../services/face-snaps.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, DatePipe, RouterLink],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit{
  faceSnap!: FaceSnap;
  userHasSnapped!: boolean;
  snapButtonText!: string;

  constructor(private faceSnapService: FaceSnapService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  private prepareInterface(){
    this.userHasSnapped = false;
    this.snapButtonText = "Oh snap!"
  }

  private getFaceSnap(){
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapService.getFaceSnapById(faceSnapId);
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

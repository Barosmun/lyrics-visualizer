import { Component, OnInit } from '@angular/core';
import { Lyric } from '../models/lyric.model';
@Component({
  selector: 'app-lyrics-upload',
  templateUrl: './lyrics-upload.component.html',
  styleUrls: ['./lyrics-upload.component.css']
})
export class LyricsUploadComponent implements OnInit {
  timer: number = 0;
  timerID: any;
  timerActive: boolean = false;

  lyrics: Lyric[] = [];

  activeLyric: number = 0;


  constructor() { }

  ngOnInit(): void {
  }

  startTimer(){
    this.timerID = setInterval(() => { this.incrementTimer(); }, 1000);
    this.timerActive = true;
  }

  stopTimer(){
    clearInterval(this.timerID);
    this.timerActive = false;
  }

  incrementTimer(){
    this.timer += 1;
    if(this.lyrics.length > this.activeLyric+1 && this.timer >= this.lyrics[this.activeLyric+1].time){
      this.activeLyric += 1;
    }
  }

  setLyrics(event: any){
    var lines = JSON.parse(event.target.value);
    for(var i = 0; i < lines.length; i++){
      var timeValue = lines[i].seconds;
      var textValue = lines[i].lyrics;
      this.lyrics.push({time: timeValue, text: textValue});
    }
  }

  setLyricsYoutube(event: any){
    var lines = event.target.value.split(/\n/);
    for(var i = 0; i < lines.length; i+=2){
      var timeValue = this.convertToSeconds(lines[i]);
      var textValue = lines[i+1];
      this.lyrics.push({time: timeValue, text: textValue});
    }
  }

  convertToSeconds(t: String){
    var vals = t.split(':');
    var total = 0;
    var position = 1;
    for(var i = vals.length-1; i > -1; i--){
      total += parseInt(vals[i]) * position;
      position *= 60;
    }
    return total;
  }

}

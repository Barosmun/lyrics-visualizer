import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify-service.service';
import { TextylService } from '../textyl-service.service';
import { Lyric } from '../models/lyric.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lyrics-search',
  templateUrl: './lyrics-search.component.html',
  styleUrls: ['./lyrics-search.component.css'],
  animations: [
    trigger(
      'inQueue',
      [
          transition('void => *', []),   // when the item is created
          transition('* => void', []),   // when the item is removed
          transition('* => *', [         // when the item is changed
            style({ opacity: 1, transform: 'translateY(0px)' }),
            animate('500ms', style({ opacity: 1, transform: 'translateY(-2.5em) scale(115%)' })),
          ]),
      ]),
    trigger(
      'outQueue',
      [
          transition('void => *', []),   // when the item is created
          transition('* => void', []),   // when the item is removed
          transition('* => *', [         // when the item is changed
            style({ opacity: 1, transform: 'translateY(0px)' }),
            animate('500ms', style({ opacity: 1, transform: 'translateY(-1em) scale(65%)' })),
          ]),
      ]),
  ]
})


export class LyricsSearchComponent implements OnInit {
  currentSong: any = {};
  accessToken: string = '';
  timer: number = 0;
  timerID: any;
  timerActive: boolean = false;
  lyricsLink: string = '';
  lyrics: Lyric[] = [];

  activeLyric: number = 0;
  title: any;
  artist: any;
  timestamp: any;
  offset: number = 0;

  error: boolean = false;

  albumArt: string = '';
  albumArtStyle: object = {};

  
  
  constructor(
    private spotifyService: SpotifyService,
    private textylService: TextylService
    ) { }

  ngOnInit(): void {
  }

  startTimer(){
    clearInterval(this.timerID);
    this.timerID = setInterval(() => { this.incrementTimer(); }, 100);
    this.timerActive = true;
  }

  stopTimer(){
    clearInterval(this.timerID);
    this.timerActive = false;
  }

  incrementTimer(){
    //runs every 1/10 second
    this.timer += 100;
    if(this.lyrics.length > this.activeLyric+1 && this.timer >= this.lyrics[this.activeLyric+1].time+this.offset){
      this.activeLyric += 1;
    }
    if(this.currentSong.duration_ms <= this.timer){
      this.getCurrentSong();
    }
  }

  getCurrentSong(){
    this.error = false;
    this.offset = 0;
    this.timer = 0;
    this.lyrics = [];
    this.activeLyric = 0;
    this.spotifyService.getCurrentSong(this.accessToken).subscribe(data => {
      this.currentSong = data.item;
      this.timestamp = data.timestamp;
      this.timer = data.progress_ms;
      this.title = this.currentSong.name;
      // this.artist = this.currentSong.artists[0].name;
      this.artist = this.currentSong.artists[0].name;
      this.albumArt = data?.item?.album?.images[0]?.url;
      this.albumArtStyle = this.getAlbumArt();
      this.convertTextyl(this.currentSong.name, this.currentSong.artists[0].name);
    });
  }

  convertTextyl(title: string, artist: string){
    var str = 'https://api.textyl.co/api/lyrics?q=';
    str += artist.replace(/\s/g, '%20') + '%20' + title.replace(/\s/g, '%20');
    str = str.replace('&', '%26');
    str = str.normalize("NFD").replace(/\p{Diacritic}/gu, ""); //removes diacritics
    this.lyricsLink = str;
    // console.log(str);
    this.getLyrics();
  }

  getLyrics(){
    this.textylService.getLyrics(this.lyricsLink).subscribe(data => {
      var newData;
      if(Array.isArray(data) && Array.isArray(data[0])){
        let code = 'newData = data[0].concat(';
        for(var j = 1; j < data.length; j++){
          code += `data[${j}],`;
        }
        code = code.slice(0, code.length-1) + ');'
        eval(code);
      }
      else{
        newData = data;
      }
      var lines = newData;
      for(var i = 0; i < lines.length; i++){
        var timeValue = lines[i].seconds * 1000;
        var textValue = lines[i].lyrics;
        if(textValue.match(/.*\S+.*/)){
          this.lyrics.push({time: timeValue, text: textValue});
        }
      }
      this.activeLyric = this.getActiveLyric();
      console.log(this.activeLyric);
    }, err => {
      this.lyrics = [];
      this.error = true;
    })
    
  }

  getActiveLyric(){
    // this.timer += Date.now() - this.timestamp;
    // console.log(this.timer);
    for(var i = 1; i < this.lyrics.length; i++){
      if(this.lyrics[i].time > this.timer){
        this.startTimer();
        return i-1;
      }
    }
    this.startTimer();
    return 0;
  }

  getAlbumArt(){
    console.log(`url('${this.albumArt}')`);
    return {'background-image': `url('${this.albumArt}')`};
  }
}



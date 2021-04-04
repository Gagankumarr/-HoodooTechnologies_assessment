import { Component, OnInit, Inject, ElementRef, ViewChild, NgZone  } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs';
import { GeoServiceService } from './services/geo-service.service';

import { ApiService, Maps } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Task';
  search: FormGroup;
  submitted = false;
  setClasses = new Set();
  user_location: Observable<any>;
  classToggled = false;
  
  @ViewChild("location")
  public searchElementRef: ElementRef;

 
  constructor(private geoService: GeoServiceService , apiService: ApiService, private ngZone: NgZone) { 
    apiService.api.then(maps => {
      this.initAutocomplete(maps);
    });
  }
  
  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
      });
    });
  }

  ngOnInit(){
    
    this.search= new FormGroup({
      'location': new FormControl(null,[Validators.required])
    });
    
  }
  get f(){
    return this.search.controls;
  }

  updateLocation(input){
    console.log(input);
    
  }
  onSubmit(){
    this.submitted= true;
    if(this.search.invalid){
      return;
    }
    else{
      console.log(this.search.value)
    }
  }

  showGpsBtn() {
    
    this.classToggled = !this.classToggled; 
    
  }

  gpsOn(){
    this.user_location = this.geoService.geoLocation$
    this.geoService.getUserLocation();
    console.log(this.user_location);
    
    
  }
 

}


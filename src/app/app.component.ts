import { Component, OnInit, Inject, ElementRef, ViewChild, NgZone  } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms'
import { Observable } from 'rxjs';
import { GeoServiceService } from './services/geo-service.service';

import { ApiService, Maps } from './services/api.service';
import { GetCooksService } from './services/get-cooks.service';

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
  latitude  = '';
  longitude ='';
  cooksList = [];
  locationHasCooks : boolean;
  
  @ViewChild("location")
  public searchElementRef: ElementRef;

 
  constructor(private geoService: GeoServiceService , 
    apiService: ApiService, 
    private ngZone: NgZone,
    private getCooksService:GetCooksService,
    ) { 
    apiService.api.then(maps => {
      this.initAutocomplete(maps);
    });
  }
  
  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(this.searchElementRef.nativeElement);
    this.search.patchValue({location:'Bangalore, Karnataka, Inde'})
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        const locationRef = autocomplete.getPlace().geometry.location;
        console.log(autocomplete.getPlace(),maps)
        const location = {latitude:locationRef.lat(),longitude:locationRef.lng()}
        this.getCooks(location);
      });
    });
    console.log(autocomplete)
  }

  ngOnInit(){
    
    this.search= new FormGroup({
      'location': new FormControl(null,[Validators.required])
    });
    const location = {latitude:12.970786,longitude: 77.593466}
    this.getCooks(location)
  }
  get f(){
    return this.search.controls;
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
   this.geoService.geoLocation$.subscribe(res=>{
    const location = {latitude:res['coords']['latitude'],longitude:res['coords']['longitude']};
    this.getCooks(location);

    });
  }
  getCooks(location){
    this.getCooksService.filterCooks({location}).subscribe(res=>{
      this.cooksList = res?.data?.response;
      if(this.cooksList.length === 0){
        this.locationHasCooks = false
      }
      else{
        this.locationHasCooks = true;
      }
    })
  }
 

}


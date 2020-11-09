import { Component, OnInit } from '@angular/core';
import { PhotoService } from "../../services/photo.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos = [];  
  
// creamos un objeto router que es de tipo Router
  constructor(private photoService :PhotoService, 
              private router: Router) { }

  ngOnInit() {
    this.photoService.getPhotoss()
        .subscribe(          
          // osea vas a grabar en this.photo el retorno
           res => {
             this.photos = res;
           },
           err => console.log(err)          
           )
    // recibimos algo y con subscribe asignamos algo para despues renderizarlo o enviarlo 
    
  }

  
  selectCard(id: string){
    this.router.navigate(['./photos', id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})

export class PhotoPreviewComponent implements OnInit {
  id: string;
  photo: Photo;

  constructor(
      private activatedRoute: ActivatedRoute,
      private photoService: PhotoService,
      private router: Router
  ) { }

  ngOnInit() {
    // con esto obtenemos los parametros de la foto a la que le dimos click 
    // voy a obtener los parametros de la ruta activada
    // solo quiero el id de la url 
    this.activatedRoute.params.subscribe(params =>{
      // obtienes solo el id de la url, osea la url se comporta como un array
       this.id = params['id'];
       
       
       this.photoService
            .gGetPhoto(this.id)
  // el get puede retornar una de dos cosas → res o err
  // res es la info de la foto
            .subscribe(                            
              res => {
                this.photo = res
              }
              ,
              err => console.log(err)         
            )
            
            
    });
  }

 

  deletePhoto(id: string){
      this.photoService.dDeletePhoto(id)
      // subscribe al parecer es para guardar los cambios que hacemos en router 
        .subscribe(
           res => {
           this.router.navigate(['/photos']);             
              },
              err => console.log(err)              
          )
  }

  updatePhoto(title: HTMLInputElement, description: HTMLInputElement): boolean {
      this.photoService.uUpdatePhoto(this.id, title.value, description.value)
      .subscribe(
        res => {
          // para ir a la url del router
          this.router.navigate(['/photos']);
        },
        err => console.log(err)       
      )
      return false;
  }

}

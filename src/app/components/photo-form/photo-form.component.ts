import { Component, OnInit } from '@angular/core';
import { PhotoService } from "../../services/photo.service";

import { Router } from "@angular/router";

interface HtmlInputEvent extends Event {
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})

export class PhotoFormComponent implements OnInit {
  // ↓↓ almacena imagenes 
// objeto file, es el que tiene las propiedades y datos de la imagen 
  file: File;
  // para mostrar 
  photoSelected: string | ArrayBuffer;


  // constructor inyector, xq las dependencias se inyectan en el constructor 
  constructor(private photoService: PhotoService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  onPhotoSelected(even: HtmlInputEvent ): void{
    if (even.target.files && even.target.files[0]){  
             
       this.file = <File>even.target.files[0];   

       // image preview 
       // leer archivo 
       // creas un objeto llamado reader para leer su contenido en memoria
            const reader = new FileReader();
       // cuando finaliza la carga se activa el objeto onload y se puede utilizar su atributo result para acceder a datos del archivo  
       reader.onload = e => this.photoSelected = reader.result;
       // el result es → data:image/jpeg;base64,/9j/4AAQBAAD"       
       reader.readAsDataURL(this.file);
       // this.file es →→ File {name: "advd2 - copia.jpg", lastModified: 1571004246000, lastModifiedDate: Sun Oct 13 2019 17:04:06 GMT-0500 (hora de verano central), webkitRelativePath: "", size: 500276, …}
    }
  }


  // title es tipo objetom, lo q ponemos en el input
  uploadPhoto(title: HTMLInputElement, 
        description: HTMLTextAreaElement): boolean{
          
    this.photoService.createPhoto(title.value, 
                            description.value, 
                                   this.file)
        .subscribe( res => {
              this.router.navigate(['/photos']);}, 
              err => console.log(err)); 
           
    return false;
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  

import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  // parece q es la BD ↓↓
  URI = 'http://localhost:4000/api/photos'

    // instanciamos HttpClient
    // HttpClient es clase inyectable, para realizar metodos HTTP
  constructor(private http: HttpClient) { }

  createPhoto(title:string, description:string, photo:File){
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('image', photo);
      // // → post( direccion, datos ó body);
      //console.log(fd);      
      return this.http.post(this.URI, fd);

  }

  getPhotoss(){
      // // get retorna → <Photo[]> → un arreglo de foto
      return this.http.get<Photo[]>(this.URI)
  }

  gGetPhoto(id: string){
     return this.http.get<Photo>(`${this.URI}/${id}`);
  }

  dDeletePhoto(id: string){
    return this.http.delete(`${this.URI}/${id}`);
  }

  uUpdatePhoto(id: string, title: string, description: string){
     return this.http.put(`${this.URI}/${id}`, {title, description});
  }


}

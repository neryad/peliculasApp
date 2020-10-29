import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie [] = [];

  constructor(private activatedRoute: ActivatedRoute, private peliculasServices: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.texto = params.texto;
      // TODO: llamar servicio

      this.peliculasServices.buscarPelicula(params.texto).subscribe
      (movies => {
        this.movies = movies;
        console.log(movies);

      });

    });
  }

}

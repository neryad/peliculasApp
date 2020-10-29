import { CreditsResponse, Cast } from './../interfaces/credist-response';
import { MovieResponse } from './../interfaces/movie-response';
import { CarteleraResponse, Movie } from './../interfaces/cartelera-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private cateleraPage = 1;
  public cargando = false;
  constructor(private http: HttpClient) {}
  get params() {
    return {
      api_key: '262954bed4bbc548cd1ef39ba4b76107',
      page: this.cateleraPage.toString(),
    };
  }

  getCartelera(): Observable<Movie[]> {
    if ( this.cargando){
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.cateleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(map (res => res.results));
  }

  resetCarteleraPage(){
    this.cateleraPage = 1;
  }

  getPeliculaDetalle( id: string){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(catchError(err => of(null)));
  }

  getCast( id: string):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(map(res => res.cast), catchError(err => of([])));
  }
}

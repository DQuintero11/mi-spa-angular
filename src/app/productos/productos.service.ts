import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto.model';  // Asegúrate de que tienes un modelo de Producto


@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:5000/api/productos';  // Cambia a la URL de tu API

  constructor(private http: HttpClient ) {}

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    this.apiUrl = 'https://localhost:7247/api/productos'
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Obtener un producto por ID
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    this.apiUrl = 'https://localhost:7247/api/productos'
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    return this.http.post<Producto>(this.apiUrl, producto,   { headers });
  }

  // Actualizar un producto
  updateProducto( producto: Producto): Observable<Producto> {
    this.apiUrl = 'https://localhost:7247/api/productos'
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    return this.http.put<any>(`${this.apiUrl}/${producto.id}`, producto, {headers});
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<void> {
    this.apiUrl = 'https://localhost:7247/api/productos'
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });


    return this.http.delete<void>(`${this.apiUrl}/${id}`,  { headers });
  }
}

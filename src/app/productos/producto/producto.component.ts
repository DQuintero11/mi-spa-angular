import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../productos.service';  // Asegúrate de tener un servicio de productos

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent {
  productosForm: FormGroup;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }


}

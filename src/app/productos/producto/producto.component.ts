import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../productos.service';  // Asegúrate de tener un servicio de productos
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true, // Esto habilita el componente como standalone
  imports: [CommonModule, ReactiveFormsModule] 
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

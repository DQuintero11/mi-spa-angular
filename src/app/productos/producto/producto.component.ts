import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoService } from '../productos.service';  // Asegúrate de tener un servicio de productos
import { CommonModule } from '@angular/common';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule] 
})
export class ProductoComponent {
  productosForm: FormGroup;
  products: any[] = [];  
  errorMessage: string = '';  
  showEditModal: boolean = false; 
  editProductData: any = {}; 
  selectedProducto: Producto | null = null;  
  isCreateModalOpen = false;
  newProduct: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    fechaCreacion: new Date(),
    id: 0
  };


  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.productosForm = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los productos';
        console.error(error);
      }
    );
  };




  editProduct(productId: number): void {

    const producto = this.products.find(p => p.id === productId);
  
    if (producto) {
      this.selectedProducto = { ...producto };  
    } else {
      console.error('Producto no encontrado');
    }
  }

  closeEditModal() {
    this.showEditModal = false;
  }



  saveChanges(): void {
    if (this.selectedProducto) {
      this.productoService.updateProducto(this.selectedProducto).subscribe(
        (updatedProducto) => {
          const index = this.products.findIndex(p => p.id === updatedProducto.id);
          if (index !== -1) {
            this.products[index] = updatedProducto;
          }
          this.selectedProducto = null;  
        },
        (error) => {
          this.errorMessage = 'Error al actualizar el producto';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'No se seleccionó un producto válido para editar';
    }
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  createProducto() {
    this.productoService.createProducto(this.newProduct).subscribe(
      (response) => {
        console.log('Producto creado con éxito', response);
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error al crear producto', error);
      }
    );
  }



  deleteProduct(index: number) {
    const product = this.products[index];
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(product.id).subscribe(
        () => {
          this.products.splice(index, 1); 
        },
        (error) => {
          this.errorMessage = 'Error al eliminar el producto';
        }
      );
    }
  }


}

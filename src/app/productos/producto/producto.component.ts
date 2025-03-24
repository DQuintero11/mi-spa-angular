import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoService } from '../productos.service';  // Asegúrate de tener un servicio de productos
import { CommonModule } from '@angular/common';
import { Producto } from '../producto.model';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule] 
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


   page: number = 1; // Página actual
   itemsPerPage: number = 5; // Número de productos por página

  constructor(private fb: FormBuilder, private productoService: ProductoService, private toastr: ToastrService ) {
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


  onPageChange(page: number) {
    this.page = page;
  }

  getPaginatedProducts() {
    const startIndex = (this.page - 1) * this.itemsPerPage; // Calcula el índice de inicio para la página actual
    return this.products.slice(startIndex, startIndex + this.itemsPerPage); // Devuelve los productos de la página actual
  }


  editProduct(index: number ,productId: number): void {
debugger;
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
   
    debugger;
   
    if (this.selectedProducto?.precio ==0 || this.selectedProducto?.stock ==0 ){
      this.toastr.error("NO SE PUEDEN ACTUALIZAR PRODUCTOS CON STOCK O PRECIO IGUAL A CERO!!!","Info");
    } else{
      if (this.selectedProducto) {
        this.productoService.updateProducto(this.selectedProducto).subscribe(
          (response) =>
             {
           
            this.selectedProducto = null;  
              debugger;
            this.toastr.success("Producto ACTUALIZADO con éxito","Info");
            this.ngOnInit();
  
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
   

  }


  // saveChanges(): void {
  //   debugger;
  //   if (this.selectedProducto) {
  //     this.productoService.updateProducto(this.selectedProducto).subscribe(
  //       (updatedProducto) =>
  //          {
  //        debugger; 
  //         const index = this.products.findIndex(p => p.id === updatedProducto.id);
  //         if (index !== -1) {
  //           this.products[index] = updatedProducto;
  //         }
  //         this.selectedProducto = null;  
  //           debugger;
  //         this.toastr.success("Producto ACTUALIZADO con éxito","Info");
  //         this.ngOnInit();

  //       },
  //       (error) => {
  //         this.errorMessage = 'Error al actualizar el producto';
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'No se seleccionó un producto válido para editar';
  //   }
  // }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  createProducto() {

    if (this.newProduct.precio ==0 || this.newProduct.stock ==0 ){
      this.toastr.error("NO SE PUEDEN CREAR PRODUCTOS CON STOCK O PRECIO IGUAL A CERO!!!","Info");
    } else{

      this.productoService.createProducto(this.newProduct).subscribe(
        (response) => {
  
          this.closeCreateModal();
          this.newProduct.nombre= '',
          this.newProduct.descripcion= '',
          this.newProduct.precio =  0,
          this.newProduct.stock= 0,
          this.newProduct.fechaCreacion =  new Date(),
          this.newProduct.id=  0;
  
          this.toastr.success("Producto creado con éxito","Info");
          this.ngOnInit();
        },
        (error) => {
          console.error('Error al crear producto', error);
        }
      );
    }

  }

  sortByName(ascending: boolean) {
    this.products.sort((a, b) => {
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return ascending ? -1 : 1;
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return ascending ? 1 : -1;
      return 0;
    });
  }


  sortByPrice(ascending: boolean) {
    this.products.sort((a, b) => {
      if (a.precio < b.precio) return ascending ? -1 : 1;
      if (a.precio > b.precio) return ascending ? 1 : -1;
      return 0;
    });
  }

  deleteProduct(index: number , productId: number) {
    const product = this.products[index];
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(productId).subscribe(
        () => {
          this.products.splice(index, 1); 
          this.toastr.success("Producto ELIMINADO con éxito","Info");
          this.ngOnInit();
        },
        (error) => {
          this.errorMessage = 'Error al eliminar el producto';
        }
      );
    }
  }


}

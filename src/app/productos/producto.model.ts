export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    fechaCreacion: string;  // O usa Date si prefieres trabajar con fechas como objetos Date
  }
  
import SideBar from "../components/general/SideBar";
import FormularioRegistroProductos from "../components/ProductComponents/FormularioRegistroProductos";
import TablaProductos from "../components/ProductComponents/TablaProductos";
import { useState, useEffect } from "react";
import {useProduct} from "../context/ProductContext.jsx"

function ProductsPage() {

  const {products, loading, error, addProduct, editProduct, removeProduct} = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function handleAgregarProducto(nuevoProducto) {
    
    const success = await addProduct(nuevoProducto);

    if(success){
      alert("Producto guardado con éxito!");
    } else {
      alert("Error al guardar el producto. Por favor, intente de nuevo");
    }
  }

  async function handleActualizarProducto(producto){

    const success = await editProduct(producto);

    if(success){
      alert("Producto actualizado con éxito!");
    } else {
      alert("Error al actualizar el producto. Por favor, intente de nuevo");
    }

  }

  async function handleEliminarProducto(productoId) {
    
    const success = await removeProduct(productoId);

    if(success){
      alert("Producto eliminado con éxito!");
    } else {
      alert("Error al eliminar el producto. Por favor, intente de nuevo");
    }
  }

  function handleSeleccionarProducto(producto){
    if(!selectedProduct){
      setSelectedProduct(producto);
    } else{
      setSelectedProduct(null);
    }
  }

  if(loading){
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Products Page</h1>
          <p className="text-center text-danger">Cargando los productos ...</p>
      </div>
    </div>
  };

  if(error){
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Products Page</h1>
          <p className="text-center text-danger">Error al cargar los productos: {error.message}</p>
      </div>
    </div>
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Products Page</h1>
        <FormularioRegistroProductos agregarProducto={handleAgregarProducto} productoSeleccionado={selectedProduct} actualizarProducto={handleActualizarProducto}/>
        <TablaProductos products={products} seleccionarProducto={handleSeleccionarProducto} eliminarProducto={handleEliminarProducto}/>
      </div>
    </div>
  );
}
export default ProductsPage;
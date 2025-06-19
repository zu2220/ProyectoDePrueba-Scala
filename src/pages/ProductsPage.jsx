import SideBar from "../components/SideBar";
import FormularioRegistroProductos from "../components/ProductComponents/FormularioRegistroProductos";
import TablaProductos from "../components/ProductComponents/TablaProductos";
import { useState, useEffect } from "react";
import { createProduct, getProducts } from "../api/products.js";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  async function agregarProducto(nuevoProducto) {
    try {
      await createProduct(nuevoProducto);
      setProducts([...products, nuevoProducto]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Products Page</h1>
        <FormularioRegistroProductos agregarProducto={agregarProducto}/>
        <TablaProductos products={products}/>
      </div>
    </div>
  );
}
export default ProductsPage;
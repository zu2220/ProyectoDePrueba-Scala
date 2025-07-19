import { createContext, useContext, useEffect, useState } from "react";
import {getProducts, createProduct, updateProduct, deleteProduct} from '../api/products';

const ProductContext = createContext();

export function useProduct(){

    const context = useContext(ProductContext);

    if(context === undefined){
        throw new Error("El contexto no está definido");
        
    } else {
        return context;
    }
};

export function ProductProvider({children}){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [products, setProducts] = useState([]);

    async function fetchProducts(isRefresh = false){

        if(isRefresh){
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null)

        try {
            const products2 = await getProducts();
            setProducts(products2.data);
        } catch (err) {
            setError(err);
            console.error("Error al obtener a los usuarios" + error);
        } finally {
            if(isRefreshing){
                setIsRefreshing(false);
            } else{
                setLoading(false);
            }
        }
    }

    async function addProduct(product){
        try {
            await createProduct(product);
            await fetchProducts(true);
            return true;
        } catch (err) {
            setError(err);
            console.error("Error al agregar a un nuevo usuario: " + error);
            return false;
        }
    }

    async function editProduct(product){
        try {
            await updateProduct(product);
            await fetchProducts(true);
            return true;
        } catch (err) {
            setError(err);
            console.error("Error al editar al producto: " + error);
            return false;
        }
    }

    async function removeProduct(productId) {
        try {
            await deleteProduct(productId);
            await fetchProducts(true);
            return true;
        } catch (err) {
            setError(err);
            console.error("Error al eliminar al productos: " + error);
            return false;
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    const values = {
        products,
        loading,
        error,
        addProduct,
        editProduct,
        removeProduct
    }

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
}
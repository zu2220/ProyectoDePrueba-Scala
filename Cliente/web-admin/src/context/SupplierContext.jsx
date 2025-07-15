import { useContext, createContext, useState, useEffect } from "react";
import {getSuppliers, createSupplier, updateSupplier, deleteSupplier} from "../api/suppliers"

export const SupplierContext = createContext();

export function useSupplier(){
    const context = useContext(SupplierContext);

    if(context === undefined){
        throw new Error("Error en el contexto de los proveedores");
        
    } else {
        return context;
    }

}

export function SupplierProvider({children}){
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    async function fetchSuppliers(isRefresh = false){

        if(isRefresh) {
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }

        setError(null);

        try {
            const data = await getSuppliers();
            setSuppliers(data.data);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al obtener a los proveedores: " + error);
            return false;

        } finally {
            if(isRefreshing){
                setIsRefreshing(false);
            } else {
                setLoading(false);
            }
        }

    }

    async function addSupplier(supplier){
        try {
            await createSupplier(supplier);
            await fetchSuppliers(true);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al agregar al proveedor: " + error);
            return false;
        }
    }

    async function editSupplier(supplier){
        try {
            await updateSupplier(supplier._id, supplier);
            await fetchSuppliers(true);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al actualizar al proveedor: " + error);
            return false;
        }
    }

    async function removeSupplier(supplierId) {
        try {
            await deleteSupplier(supplierId);
            await fetchSuppliers(true);
            return true;
            
        } catch (err) {
            setError(err);
            console.error("Error al eliminar al proveedor: " + error);
            return false;
        }
    }

    useEffect(()=>{
        fetchSuppliers();
    }, [])

    const contextValue = {
        loading,
        error,
        suppliers,
        addSupplier,
        editSupplier,
        removeSupplier
    }

    return(
        <SupplierContext.Provider value={contextValue}>
            {children}
        </SupplierContext.Provider>
    )
}
import { useContext, createContext, useState, useEffect } from "react";
import { getSupplies, createSupply, updateSupply, deleteSupply } from "../api/supplies";

export const SupplyContext = createContext();

export function useSupply(){
    const context = useContext(SupplyContext);
    if(context === undefined){
        throw Error("useSupply debe estar dentro del proveedor del contexto");
    }else{
        return context;
    }
}

export function SupplyProvider({children}){
    const [supplies, setSupplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    async function fetchSupplies(isRefresh = false) {
        if(isRefresh){
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const data = await getSupplies();
            setSupplies(data.data);

        } catch (err) {
            setError(err);
            console.error("Error al obtener los insumos: " + error);
        } finally {
            if(isRefreshing){
                setIsRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }

    async function addSupply(supply) {
        try {
            await createSupply(supply);
            await fetchSupplies(true);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al guardar el insumo: " + error);
            return false;
        }
    }

    async function editSupply(supply) {
        try {
            await updateSupply(supply);
            await fetchSupplies(true);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al actualizar el insumo: " + error);
            return false;
        }
    }

    async function removeSupply(supplyId) {
        try {
            await deleteSupply(supplyId);
            await fetchSupplies(true);
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al eliminar el insumo: " + error);
            return false;
        }
    }

    const contextValue = {
        supplies,
        loading,
        error,
        addSupply,
        editSupply,
        removeSupply
    }

    useEffect(()=>{
        fetchSupplies();
    },[])

    return(
        <SupplyContext.Provider value={contextValue}>
            {children}
        </SupplyContext.Provider>
    )

}
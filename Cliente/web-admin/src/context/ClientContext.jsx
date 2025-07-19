import { useContext, createContext, useState, useEffect } from "react";
import { getClients, createClient, updateClient, deleteClient } from '../api/clients'; 

export const ClientContext = createContext();

export function useClient(){
    const context = useContext(ClientContext);
    if(context === undefined){
        throw Error("useClient debe estar dentro de ClientProvider");

    } else{
        return context;
    }
}

export function ClientProvider({children}){
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    async function fetchClients(isRefresh = false) {
        if(isRefresh){
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const data = await getClients();
            setClients(data.data);
            
        } catch (err) {
            setError(err);
            console.error("Error al obtener a los clientes: " + error);
        } finally {
            if(isRefreshing) {
                setIsRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }

    async function addClient(client){
        try {
            await createClient(client);
            await fetchClients();
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al guardar a un cliente: " + error);
            return false;
        }
    }

    async function editClient(client) {
        
        try {
            await updateClient(client);
            await fetchClients();
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al actualizar a un cliente: " + error);
            return false;
        }
    }

    async function removeClient(clientId) {
        try {
            await deleteClient(clientId);
            await fetchClients();
            return true;

        } catch (err) {
            setError(err);
            console.error("Error al eliminar al cliente: " + error);
            return false;
        }
    }

    useEffect(()=>{
        fetchClients();
    },[])

    const contextValue = {
        clients,
        loading,
        error,
        addClient,
        editClient,
        removeClient,
    }

    return (
        <ClientContext.Provider value={contextValue}>
            {children}
        </ClientContext.Provider>
    )

}
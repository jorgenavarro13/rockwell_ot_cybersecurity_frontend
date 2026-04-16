async function getRanking(){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API}/ranking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",  
        });
        const data = await respuesta.json();
        return data;

    } catch (error) {
        console.error("Error fetching ranking:", error);
        throw error;
    }
}

export {getRanking};
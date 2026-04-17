export async function fetchDashboardData() {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API}/admin/dashboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",  
        });
        const data = await respuesta.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error fetching the data:", error);
        throw error;
    }
}
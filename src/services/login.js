export async function loginUser(email, password){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",  
            body: JSON.stringify({ email:email, password:password }),
        });
        const data = await respuesta.json();
        return data;

    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

// El metodo GET no puede tener un body, por lo que el backend no esta recibiendo el email y password, hay que cambiarlo a POST o enviar los datos como query params. En este caso, lo mas sencillo es cambiarlo a POST, ya que el login generalmente se hace con un POST request.
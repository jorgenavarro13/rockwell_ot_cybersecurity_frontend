export async function registerUser(Usuario){
    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify  (Usuario),  
      });

      if (respuesta.ok) {
        const respuesta2= await respuesta.json();
        return respuesta2;
      } else {
        return { registered: false, message: 'Registration failed. Please try again.' };
      }

    } catch (error) {
      console.error("Error registering user:", error);
      return { registered: false, message: 'An error occurred. Please try again.' };
    }

  };

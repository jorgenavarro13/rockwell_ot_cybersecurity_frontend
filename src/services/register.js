export async function registerUser(Usuario,navigate){
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
        navigate('/game');
      } else {
        const errorMessage = await respuesta.json();
        return { message: 'Registration failed. Please try again.' };
      }

    } catch (error) {
      console.error("Error registering user:", error);
    }

  };

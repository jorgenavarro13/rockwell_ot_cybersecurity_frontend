export function registerUser(Usuario,navigate){
    try {
      const respuesta =  fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify  (Usuario),  
      });

      if (respuesta.ok) {
        navigate('/login');
      } else {
        console.error("Error registering user");
      }

    } catch (error) {
      console.error("Error registering user:", error);
    }

  };

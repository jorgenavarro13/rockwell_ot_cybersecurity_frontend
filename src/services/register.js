
export function registerUser(Usuario){
  console.log(import.meta.env.VITE_API)
    fetch(`${import.meta.env.VITE_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify  (Usuario),  
    })
      .then((respuesta) => console.log(respuesta))
      .catch((error) => console.error(error));
  };

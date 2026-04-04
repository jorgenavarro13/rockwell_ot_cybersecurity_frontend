
export function registerUser(Usuario){
  console.log(import.meta.env.VITE_API)
    fetch(`${import.meta.env.VITE_API}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify  (Usuario),  
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          window.location.href = "/game";
        } else {
          console.error("Error registering user");
        }
      })
      .catch((error) => console.error(error));


  };

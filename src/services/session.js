
export default async function checkSession(){
   try {
    const respuesta= await fetch(`${import.meta.env.VITE_API}/session`, {
      method: "GET",
      credentials: "include",  
    })

    if(!respuesta.ok){ return null;}

    const data = respuesta.json()
    return data;

    } catch (error) {
      console.error(error); 
      return null;
  };                    
}
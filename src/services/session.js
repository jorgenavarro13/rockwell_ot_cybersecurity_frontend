
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

export async function logoutSession() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Logout failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
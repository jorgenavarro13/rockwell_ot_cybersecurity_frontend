
export const verifyEmailDuplicates = async (email) => {
    const response = await fetch(`${import.meta.env.VITE_API}/check-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data.exists);
    return data.exists;
  };


  //Aqui estamos usando query params para enviar el email al backend, lo cual es una práctica común para este tipo de verificaciones. El backend debería tener un endpoint que reciba el email como query param y devuelva un JSON indicando si el email es un duplicado o no.
  // /check-email?email=test@mail.com
  {/*
    app.get("/check-email", (req, res) => {
    const { email } = req.query;
    });
    */ }
export const verifyPhoneDuplicates = async (phone) => {
    const response = await fetch(`${import.meta.env.VITE_API}/check-phone?phone=${encodeURIComponent(phone)}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.exists;
  };

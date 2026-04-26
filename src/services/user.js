export async function getUserProfile(userId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/user`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) return null;
        const data = await response.json();
        console.log("✅ User profile data received:", data);
        return data;

    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
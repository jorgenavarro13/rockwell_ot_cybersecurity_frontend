export async function getUserProfile(userId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/user`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.status === 403) return { forbidden: true };
        if (!response.ok) return null;

        const data = await response.json();
        const users = Array.isArray(data) ? data : [];
        return users.find((u) => u.user_id === userId) ?? null;

    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

export async function getUserGameHistory(username) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/ranking`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (!response.ok) return [];

        const data = await response.json();
        const entries = Array.isArray(data) ? data : [];

        return entries
            .filter((entry) => entry.playername === username)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

    } catch (error) {
        console.error("Error fetching game history:", error);
        return [];
    }
}

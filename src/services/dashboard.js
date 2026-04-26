export async function fetchDashboardData() {
    try {
        const [usersResponse, rankingResponse] = await Promise.all([
            fetch(`${import.meta.env.VITE_API}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }),
            fetch(`${import.meta.env.VITE_API}/ranking`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }),
        ]);

        if (!usersResponse.ok) {
            throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();
        const rankingData = rankingResponse.ok ? await rankingResponse.json() : [];

        const rankingById = new Map(
            (Array.isArray(rankingData) ? rankingData : []).map((player) => [player.id, player])
        );

        const normalizedUsers = (Array.isArray(usersData) ? usersData : []).map((user) => {
            const rankingEntry = rankingById.get(user.user_id) ?? {};
            const countryFromRanking = rankingEntry.country ?? {};

            return {
                id: user.user_id,
                username: user.name ?? '',
                email: user.email ?? '',
                company: user.company ?? '',
                relation: user.type_of_user != null ? String(user.type_of_user) : 'N/A',
                state: user.state ?? true,
                country: {
                    name: countryFromRanking.name ?? (user.country != null ? `Country #${user.country}` : 'N/A'),
                    flag: countryFromRanking.flag ?? '',
                },
                gamesPlayed: user.gamesplayed ?? user.gamesPlayed ?? 0,
                maxScore: Number.isFinite(rankingEntry.score) ? rankingEntry.score : 0,
                score: Number.isFinite(rankingEntry.score) ? rankingEntry.score : 0,
            };
        });

        return normalizedUsers;

    } catch (error) {
        console.error("Error fetching the data:", error);
        throw error;
    }
}
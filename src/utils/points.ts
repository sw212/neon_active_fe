export const MAX_RANK = 6;
export const POINTS_PER_RANK = 3000;

export const RANK_NAMES = {
    0: "Novice",
    1: "Beginner",
    2: "Junior",
    3: "Intermediate",
    4: "Skilled",
    5: "Advanced",
    6: "Expert",
}

export function rankFromPoints(points)
{
    const rank = Math.min(MAX_RANK, Math.floor(points / POINTS_PER_RANK));
    const rankName = RANK_NAMES[rank];

    return {rank, rankName};
}
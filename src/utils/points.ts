export const MAX_RANK = 9;
export const POINTS_PER_RANK = 1000;

export const RANK_NAMES = {
    0: "Novice",
    1: "Beginner",
    2: "Junior",
    3: "Intermediate",
    4: "Competent",
    5: "Skilled",
    6: "Proficient",
    7: "Adept",
    8: "Advanced",
    9: "Expert",
}

export function rankFromPoints(points)
{
    const rank = Math.min(MAX_RANK, Math.floor(points / POINTS_PER_RANK));
    const rankName = RANK_NAMES[rank];

    return {rank, rankName};
}
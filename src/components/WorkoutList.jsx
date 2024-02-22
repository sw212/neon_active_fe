import WorkoutCard from "./WorkoutCard";
import { View, Text, FlatList } from "react-native";
import { useState } from "react";

// e.g.
// {
//     workout_id: 1
//     type: "Stretch", // Run Gym Walk Stretch
//     duration: 45, // minutes
//     date: new Date("2024-02-20"), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// }

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState([
        {
            workout_id: 1,
            type: "Run",
            duration: 10,
            date: new Date("2024-02-20"),
        },
        {
            workout_id: 2,
            type: "Gym",
            duration: 20,
            date: new Date("2024-02-21"),
        },
        {
            workout_id: 3,
            type: "Walk",
            duration: 60,
            date: new Date("2024-02-22"),
        },
        {
            workout_id: 4,
            type: "Stretch",
            duration: 65,
            date: new Date("2024-02-23"),
        },
    ]);

    console.info("TODO: allow duration to be formatted as either '90m' or '1h30m'");

    return (
        <View>
            {workouts.map((workout) => {
                return <WorkoutCard key={workout.workout_id} workout={workout} />;
            })}
        </View>
    );
}

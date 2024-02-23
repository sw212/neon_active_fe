import WorkoutCard from "./WorkoutCard";
import { View } from "react-native";

export default function WorkoutList({ workouts }) {
    return (
        <View>
            {workouts.slice(0, 4).map((workout) => {
                return <WorkoutCard key={workout._id} workout={workout} />;
            })}
        </View>
    );
}

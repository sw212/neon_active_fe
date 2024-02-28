import { View, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";

export default function CumulativePointsChart({ workouts }) {
    const currTime = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;

    const data = [];
    const daySpan = 30;
    let total = 0;

    for (let i = 0; i < daySpan; i++) {
        //
        // NOTE/TODO: this doesn't work correctly in different timezones
        //

        const date = new Date(1970, 0, 1, null, null, null, currTime - (daySpan - 1 - i) * msPerDay);

        const dataPoint = {
            id: i + 1,
            date: date,
            value: total,
        };

        for (let j = 0; j < workouts.length; j++) {
            const workout = workouts[j];
            const workoutDate = new Date(workout.addedAt);

            if (
                date.getFullYear() === workoutDate.getFullYear() &&
                date.getMonth() === workoutDate.getMonth() &&
                date.getDate() === workoutDate.getDate()
            ) {
                total += workout.duration * (1 + (workout.type === "cardio" || workout.type === "weights"));
                dataPoint.value = total;
            }
        }

        data.push(dataPoint);
    }

    const width = Dimensions.get("window").width;

    const values = data.map((v) => ({ x: v.date, y: v.value }));

    return (
        <View className="flex items-center">
            <VictoryChart width={Math.min(400, 0.8 * width)} height={Math.min(400, 0.6 * width)}>
                <VictoryLine
                    data={values}
                    style={{
                        data: { stroke: "white" },
                    }}
                    animate={{ onEnter: { duration: 1000 } }}
                />
                <VictoryAxis
                    tickFormat={(v) => {
                        const date = new Date(v);
                        const day = date.getDate().toString();
                        const month = date.toLocaleString("fr-fr", { month: "2-digit" });
                        return `${day}/${month}`;
                    }}
                    style={{
                        tickLabels: {
                            fill: "white",
                        },
                        ticks: { stroke: "grey", size: 5 },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickCount={3}
                    style={{
                        tickLabels: {
                            fill: "white",
                        },
                        ticks: { stroke: "grey", size: 5 },
                        grid: { stroke: "grey", strokeDasharray: 5 },
                    }}
                />
            </VictoryChart>
        </View>
    );
}

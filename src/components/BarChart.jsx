import { View, Dimensions } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";

export default function BarChart({ workouts }) {
    const currTime = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;

    const data = [];
    for (let i = 0; i < 7; i++) {
        //
        // NOTE/TODO: this doesn't work correctly in different timezones
        //

        const date = new Date(1970, 0, 1, null, null, null, currTime - (6 - i) * msPerDay);

        const dataPoint = {
            id: i + 1,
            date: date,
            value: 0,
        };

        for (let j = 0; j < workouts.length; j++) {
            const workout = workouts[j];
            const workoutDate = new Date(workout.addedAt);

            if (
                date.getFullYear() === workoutDate.getFullYear() &&
                date.getMonth() === workoutDate.getMonth() &&
                date.getDate() === workoutDate.getDate()
            ) {
                dataPoint.value += workout.duration * (1 + (workout.type === "cardio" || workout.type === "weights"));
            }
        }

        data.push(dataPoint);
    }

    const width = Dimensions.get("window").width;

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const tickValues = data.map((item) => days[item.date.getDay()]);

    const values = data.map((v) => ({ x: v.id, y: v.value }));

    let maxValue = 1;
    for (let i = 0; i < values.length; i++) {
        maxValue = Math.max(maxValue, values[i].y);
    }

    const scale = ["#3D365E", "#31265C", "#351e7c", "#4c12c8", "#7c1bff", "#b853ff"];
    const numColors = scale.length;
    const colorScale = [];

    for (let i = 0; i < values.length; i++) {
        const v = values[i].y;
        const idx = Math.min(Math.floor((v / maxValue) * numColors), numColors - 1);
        colorScale.push(scale[idx]);
    }

    return (
        <View className="flex items-center">
            <VictoryChart
                width={Math.min(400, 0.9 * width)}
                height={Math.min(400, 0.6 * width)}
                domain={{ y: [-3, Math.max(maxValue, 100)] }}
            >
                <VictoryBar
                    data={values}
                    y0={() => -3}
                    barRatio={0.5}
                    style={{ data: { fill: ({ index }) => colorScale[index] } }}
                />
                <VictoryAxis
                    style={{
                        axis: {
                            display: "none",
                        },
                        tickLabels: {
                            fill: "white",
                        },
                    }}
                    tickValues={tickValues}
                />
            </VictoryChart>
        </View>
    );
}

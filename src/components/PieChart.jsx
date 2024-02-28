import { useState } from "react";
import { View, Dimensions } from "react-native";
import { VictoryPie, VictoryChart } from "victory-native";

export default function PieChart({ workouts }) {
    const width = Dimensions.get("window").width;

    const data = {};

    for (let i = 0; i < workouts.length; i++) {
        const workout = workouts[i];
        const type = workout.type[0].toUpperCase() + workout.type.slice(1);
        data[type] = 1 + (data[type] ?? 0);
    }

    const values = Object.entries(data).map((v) => ({ x: v[0], y: v[1] }));

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
            <VictoryPie
                data={values}
                width={Math.min(400, 0.9 * width)}
                height={Math.min(400, 0.7 * width)}
                innerRadius={Math.min(125, 0.25 * width)}
                radius={Math.min(100, 0.2 * width)}
                padAngle={5}
                labelRadius={Math.max(140, 0.15 * width)}
                colorScale={colorScale}
                style={{ labels: { fill: "white" } }}
            />
        </View>
    );
}

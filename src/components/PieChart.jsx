import { useState } from "react";
import { View, Dimensions } from "react-native";
import { VictoryPie } from "victory-native";

export default function PieChart() {
    const [data, setData] = useState([
        { id: 1, type: "Run", count: 15 },
        { id: 2, type: "Gym", count: 5 },
        { id: 3, type: "Stretch", count: 0 },
        { id: 4, type: "Walk", count: 10 },
    ]);

    const width = Dimensions.get("window").width;

    const values = data.filter((v) => v.count).map((v) => ({ x: v.type, y: v.count }));
    let maxValue = 0;
    for (let i = 0; i < values.length; i++) {
        maxValue = Math.max(maxValue, values[i].y);
    }

    const scale = ["#181525", "#251c45", "#351e7c", "#4c12c8", "#7c1bff", "#b853ff"];
    const numColors = scale.length;
    const colorScale = [];

    for (let i = 0; i < values.length; i++) {
        const v = values[i].y;
        const idx = Math.min(Math.floor((v / maxValue) * numColors), numColors - 1);
        colorScale.push(scale[idx]);
    }

    return (
        <View className="flex w-full">
            <View className="flex items-center">
                <VictoryPie
                    data={values}
                    width={Math.min(400, 0.8 * width)}
                    height={Math.min(400, 0.6 * width)}
                    innerRadius={Math.min(125, 0.25 * width)}
                    radius={Math.min(100, 0.2 * width)}
                    padAngle={5}
                    labelRadius={Math.min(133, 0.3 * width)}
                    colorScale={colorScale}
                    style={{ labels: { fill: "white" } }}
                />
            </View>
        </View>
    );
}

import { useState } from "react";
import { View, Dimensions } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";

export default function BarChart() {
    //
    //  TODO: handle empty values for days where no value is given?
    //

    const [data, setData] = useState([
        { id: 1, date: new Date(2024, 2, 20), value: 100 },
        { id: 2, date: new Date(2024, 2, 21), value: 200 },
        { id: 3, date: new Date(2024, 2, 22), value: 300 },
        { id: 4, date: new Date(2024, 2, 23), value: 0 },
        { id: 5, date: new Date(2024, 2, 24), value: 500 },
        { id: 6, date: new Date(2024, 2, 25), value: 600 },
    ]);

    const width = Dimensions.get("window").width;

    const days = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
    const tickValues = data.map((item) => days[item.date.getDay()]);

    const values = data.map((v) => ({ x: v.id, y: v.value }));
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
        <View className="flex items-center -my-8">
            <VictoryChart width={Math.min(400, 0.9 * width)} height={Math.min(400, 0.6 * width)}>
                <VictoryBar data={values} barRatio={0.8} style={{ data: { fill: ({ index }) => colorScale[index] } }} />
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

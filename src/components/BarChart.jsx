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
        { id: 4, date: new Date(2024, 2, 23), value: 400 },
        { id: 5, date: new Date(2024, 2, 24), value: 500 },
        { id: 6, date: new Date(2024, 2, 25), value: 600 },
    ]);

    const width = Dimensions.get("window").width;

    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const tickValues = data.map((item) => days[item.date.getDay()]);

    return (
        <View className="flex items-center">
            <VictoryChart width={Math.min(400, 0.9 * width)}>
                <VictoryBar data={data} x="id" y="value" barRatio={0.8} style={{ data: { fill: "#3679F3" } }} />
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

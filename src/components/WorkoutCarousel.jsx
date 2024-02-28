import { useCallback } from "react";
import { View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Extrapolation, interpolate } from "react-native-reanimated";
import { withAnchorPoint } from "../utils/anchor-point";

import WorkoutCard from "./WorkoutCard";

export default function WorkoutCarousel({ workouts }) {
    const windowWidth = Dimensions.get("window").width * 0.8;

    const animation = useCallback((value) => {
        "worklet";
        const sFactorA = 0.6;
        const scale = interpolate(value, [-1, 0, 1], [sFactorA, 1, sFactorA], Extrapolation.CLAMP);

        const size = windowWidth;
        const tFactorA = 0.5;
        const translateX = interpolate(value, [-1, 0, 1], [-size * tFactorA, 0, size * tFactorA], Extrapolation.CLAMP);
        const zIndex = interpolate(
            value,
            [-2, -1, 0, 1, 2],
            [2, 1, 0, 1, 2].map((v) => -v * 10),
            Extrapolation.CLAMP
        );
        const opacity = interpolate(value, [-1, 0, 1], [0.1, 1, 0.1], Extrapolation.EXTEND);

        const transform = {
            transform: [
                { perspective: 150 },
                { translateX },
                {
                    rotateY: `${interpolate(value, [-1, 0, 1], [-45, 0, 45], Extrapolation.CLAMP)}deg`,
                },
                { scale },
            ],
        };

        return {
            ...withAnchorPoint(
                transform,

                { x: 0.5, y: 0.5 },
                {
                    width: windowWidth,
                    height: 200,
                }
            ),
            zIndex,
            opacity,
        };
    }, []);

    return (
        <View className="items-center">
            <Carousel
                loop={false}
                style={{
                    width: windowWidth,
                    height: 190,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                width={windowWidth}
                data={workouts}
                withAnimation={{
                    type: "spring",
                    config: {
                        damping: 13,
                    },
                }}
                renderItem={({ item }) => {
                    return (
                        <View key={item._id} className="self-center">
                            <WorkoutCard workout={item} />
                        </View>
                    );
                }}
                windowSize={3}
                customAnimation={animation}
            />
        </View>
    );
}

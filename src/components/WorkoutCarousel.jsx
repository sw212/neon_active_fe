import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { withAnchorPoint } from "../utils/anchor-point";

import WorkoutCard from "./WorkoutCard";

export default function WorkoutCarousel({ workouts }) {
    const width = Dimensions.get("window").width;

    return (
        <Carousel
            loop={false}
            style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
            }}
            width={width * 0.7}
            data={workouts}
            withAnimation={{
                type: "spring",
                config: {
                    damping: 13,
                },
            }}
            renderItem={({ index, item, animationValue }) => {
                return (
                    <CustomWorkoutCard index={index} workout={item} key={item._id} animationValue={animationValue} />
                );
            }}
        />
    );
}

const CustomWorkoutCard = ({ index, animationValue, workout }) => {
    const width = Dimensions.get("window").width;

    const cardStyle = useAnimatedStyle(() => {
        const scale = interpolate(animationValue.value, [-0.1, 0, 1], [0.95, 1, 1], Extrapolation.CLAMP);

        const translateX = interpolate(animationValue.value, [-1, -0.2, 0, 1], [0, width * 0.3, 0, 0]);

        const transform = {
            transform: [
                { scale },
                { translateX },
                { perspective: 200 },
                {
                    rotateY: `${interpolate(
                        animationValue.value,
                        [-1, 0, 0.4, 1],
                        [30, 0, -25, -25],
                        Extrapolation.CLAMP
                    )}deg`,
                },
            ],
        };

        return {
            ...withAnchorPoint(transform, { x: 0.5, y: 0.5 }, { width: width, height: 200 }),
        };
    }, [index]);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Animated.View
                style={[
                    {
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        width: width,
                        height: 200,
                    },
                    cardStyle,
                ]}
            >
                <WorkoutCard workout={workout} />
            </Animated.View>
        </Animated.View>
    );
};

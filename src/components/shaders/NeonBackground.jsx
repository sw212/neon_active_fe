import { View } from "react-native";
import { vec3 } from "gl-matrix";
import NeonRoundedRect from "./NeonRoundedRect";

export default function NeonBackground() {
    return (
        <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
            <NeonRoundedRect
                startX={0.05}
                startY={0.5}
                width={1.5}
                length={0.9}
                color={[0.9, 0.1, 0.1]}
                intensity={0.9}
                radius={0.001}
            />
        </View>
    );
}

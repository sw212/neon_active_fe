import { memo } from "react";
import { View } from "react-native";
import { NeonRoundedRect } from "./NeonRoundedRect";

export const NeonBackground = memo(function () {
    const radiusUpdateBlink = (radius, t) => {
        const a = 0.09;
        const b = 0.5;
        t = t % (1 / b);
        const v = radius * Math.pow(t, a) * Math.pow(1.0 - b * t, a);
        return v;
    };

    const radiusUpdate = (radius, t) => {
        const v = radius * (1 + 0.8 * Math.abs(Math.sin(t)));
        return v;
    };

    const lerpColor = (color1, color2, t) => {
        const result = [];
        for (let i = 0; i < color1.length; i++) {
            result[i] = color1[i] * (1 - t) + color2[i] * t;
        }
        return result;
    };

    const colorUpdate = (color, t) => {
        const color_b = [0.1, 0.1, 0.9];
        const color_r = [0.9, 0.1, 0.1];

        const v = 0.5 * (1 + Math.sin(t * 0.1));
        const c = lerpColor(color_b, color_r, v);
        return c;
    };

    return (
        <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
            <NeonRoundedRect
                startX={0.05}
                startY={0.5}
                width={1.5}
                length={0.9}
                color={[0.9, 0.1, 0.1]}
                colorUpdate={colorUpdate}
                intensity={0.9}
                radius={0.001}
                radiusUpdate={radiusUpdate}
            />
        </View>
    );
});

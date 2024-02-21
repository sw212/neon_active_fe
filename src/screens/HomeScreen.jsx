import { useState, useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";

import { vec3 } from "gl-matrix";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber/native";
import { Trail } from "@react-three/drei/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { generatePathShape, index_in_path } from "../utils/track";

import WorkoutList from "../components/WorkoutList";
import NeonRoundedRect from "../components/shaders/NeonRoundedRect";
import NeonGrid from "../components/shaders/NeonGrid";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import PointsBar from "../components/shaders/PointsBar";

const OrbitTarget = ({ measure }) => {
    const { left, top, width, height } = measure;
    const meshRef = useRef();

    const { size } = useThree();

    const aspect = size.width / size.height;
    const x = left / size.width;
    const y = (size.height - top) / size.height;
    const w = width / size.width;
    const h = height / size.height;

    const centre = [x + 0.5 * w - 0.5, y - 0.5 * h - 0.5, 0];

    const screenHeight = Math.tan(37.5 * (Math.PI / 180)) * 2;
    const screenWidth = aspect * screenHeight;
    const screenCentre = [centre[0] * screenWidth, centre[1] * screenHeight, 0];

    const num_pts = 50;
    const [vertices, pathLengths, cumulativeLengths, pathLength] = generatePathShape(
        0.5 * w * screenWidth,
        0.5 * h * screenHeight,
        num_pts
    );

    useFrame((state) => {
        const { clock } = state;
        const t = clock.elapsedTime;

        let d = ((t * pathLength) / 2) % pathLength;
        const idx = index_in_path(d, num_pts, pathLength, cumulativeLengths);
        const frac = (d - cumulativeLengths[idx]) / pathLengths[idx];

        let position = vec3.create();
        vec3.lerp(position, vertices[idx], vertices[(idx + 1) % num_pts], frac);

        meshRef.current.position.set(screenCentre[0] + position[0], screenCentre[1] + position[1], 0);
    });

    return (
        <>
            <EffectComposer>
                <Bloom mipmapBlur luminanceThreshold={1} radius={0.2} />
            </EffectComposer>
            <Trail local width={0.05} length={1} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
                <mesh ref={meshRef} position={screenCentre}>
                    <sphereGeometry args={[0.01]} />
                    <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
                </mesh>
            </Trail>
        </>
    );
};

export default function HomeScreen() {
    const targetRef = useRef();
    const containerRef = useRef();
    const [measure, setMeasure] = useState();

    useEffect(() => {
        if (targetRef.current && containerRef.current) {
            targetRef.current?.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    setMeasure({ left, top, width, height });
                },
                () => {
                    console.error("measurement failed");
                }
            );
        }
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="h-full pt-4" ref={containerRef}>
                    <View className="w-[700px] h-[100px] mx-auto">
                        <PointsBar frac={1.0} />
                    </View>
                    <View className="w-[700px] h-[200px] mx-auto">
                        <NeonRoundedRect />
                    </View>

                    <PieChart />

                    <BarChart />

                    <WorkoutList />

                    <View className="flex grow gap-2 items-center justify-evenly">
                        <View className="relative w-32 h-16 bg-[#d75151] rounded-xl" ref={targetRef}>
                            <View className="absolute left-0 top-0 right-0 bottom-0"></View>
                        </View>
                        <View className="w-16 h-16 bg-[#abe267]" />
                        <View className="w-16 h-16 bg-[#25b1c7]" />
                    </View>

                    <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
                        <NeonRoundedRect
                            startX={0.05}
                            startY={0.5}
                            width={0.95}
                            length={0.9}
                            intensity={0.5}
                            radius={0.0001}
                        />
                    </View>

                    <View className="absolute left-0 top-0 right-0 bottom-0 z-10">
                        {/* <Canvas camera={{ position: [0, 0, 1] }}>{measure && <OrbitTarget measure={measure} />}</Canvas> */}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

/*
<View className="flex-row gap-x-2">
<View className="w-16 h-16 bg-[#ef276f]" />
<View className="w-16 h-16 bg-[#82df37]" />
<View className="w-16 h-16 bg-[#d75151]" />
<View className="w-16 h-16 bg-[#abe267]" />
<View className="w-16 h-16 bg-[#25b1c7]" />
<View className="w-16 h-16 bg-[#e8c940]" />
</View>

<Text className="text-3xl text-white">Text!</Text>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#ffd931]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#ffd931] text-black">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#ffd931] text-[#ffd931]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#e8c940]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#e8c940] text-black">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#e8c940] text-[#e8c940]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#ef276f]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#ef276f] text-white">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#ef276f] text-[#ef276f]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#82df37]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#82df37] text-white">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#82df37] text-[#82df37]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#d75151]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#d75151] text-white">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#d75151] text-[#d75151]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#abe267]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#abe267] text-white">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#abe267] text-[#abe267]">
    Text!
</Text>
</View>

<View className="flex flex-row gap-x-4 items-center">
<Text className="text-3xl text-[#25b1c7]">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl bg-[#25b1c7] text-white">Text!</Text>
<Text className="text-3xl p-4 w-44 text-center rounded-3xl border-solid border-2 border-[#25b1c7] text-[#25b1c7]">
    Text!
</Text>
</View> */

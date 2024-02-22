import { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

import { vec3 } from "gl-matrix";
import * as THREE from "three";
import { useThree, useFrame, Canvas } from "@react-three/fiber/native";
import { Trail } from "@react-three/drei/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { generatePathShape, index_in_path } from "../utils/track";

import WorkoutList from "../components/WorkoutList";
import NeonRoundedRect from "../components/shaders/NeonRoundedRect";
import NeonGrid from "../components/shaders/NeonGrid";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import PointsBar from "../components/shaders/PointsBar";
import NeonBackground from "../components/NeonBackground";

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
                    {/* <View className="w-[700px] h-[500px] mx-auto">
                        <NeonGrid />
                    </View> */}
                    <View className="py-4">
                        <View className="flex-row">
                            <Text className="text-white text-2xl ml-[10%]">Recent Workouts</Text>
                        </View>
                        <WorkoutList />
                    </View>

                    <View className="w-[700px] h-[100px] mx-auto hidden">
                        <PointsBar frac={0.4} />
                    </View>

                    <View className="py-4">
                        <View className="flex-row">
                            <Text className="text-white text-2xl ml-[10%]">Past 7 Days</Text>
                        </View>
                        <BarChart />
                    </View>

                    <View className="flex grow gap-2 items-center justify-evenly hidden">
                        <View className="relative w-32 h-16 bg-[#d75151] rounded-xl" ref={targetRef}>
                            <View className="absolute left-0 top-0 right-0 bottom-0"></View>
                        </View>
                    </View>

                    <NeonBackground />

                    <View className="absolute left-0 top-0 right-0 bottom-0 z-10 hidden">
                        {/* <Canvas camera={{ position: [0, 0, 1] }}>{measure && <OrbitTarget measure={measure} />}</Canvas> */}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

import { useState, useRef, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";

import { vec3 } from "gl-matrix";
import * as THREE from "three";
import { useThree, useFrame, Canvas } from "@react-three/fiber/native";
import { Trail } from "@react-three/drei/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { generatePathShape, index_in_path } from "../utils/track";

import { API } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

import WorkoutList from "../components/WorkoutList";
import NeonRoundedRect from "../components/shaders/NeonRoundedRect";
import NeonRoundedRectTarget from "../components/shaders/NeonRoundedRectTarget";
import NeonDivider from "../components/shaders/NeonDivider";
import NeonGrid from "../components/shaders/NeonGrid";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import PointsBar from "../components/shaders/PointsBar";
import NeonBackground from "../components/shaders/NeonBackground";

export default function HomeScreen() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

    // idle | loading | success | error
    const [status, setStatus] = useState("idle");

    const barRef = useRef();
    const workoutRef = useRef();
    const containerRef = useRef();
    const [barMeasure, setBarMeasure] = useState();
    const [workoutMeasure, setWorkoutMeasure] = useState();

    const handleMeasure = () => {
        if (barRef.current && containerRef.current) {
            barRef.current?.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    setBarMeasure({ left, top, width, height });
                },
                () => {
                    console.error("measurement failed");
                }
            );
        }

        if (workoutRef.current && containerRef.current) {
            workoutRef.current?.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    setWorkoutMeasure({ left, top, width, height });
                },
                () => {
                    console.error("measurement failed");
                }
            );
        }
    };

    useEffect(() => {
        handleMeasure();
    }, [status, workouts]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setStatus("loading");
            try {
                const response = await API.get(`/user/workouts/${user.username}`);
                setWorkouts(response.data.workouts);
                setStatus("success");
            } catch (err) {
                setStatus("error");
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {status === "success" && (
                    <View className="h-full pt-4 pb-6" ref={containerRef}>
                        {/* <View className="p-4">
                            <View className="flex-row">
                                <Text className="text-white text-2xl ml-[10%]">Recent Workouts</Text>
                            </View>
                            <WorkoutList workouts={workouts} />
                        </View> */}

                        <View className="w-[80%] max-w-md mx-auto mb-4" ref={workoutRef}>
                            <Text className="text-white text-2xl ml-[10%]">Recent Workouts</Text>
                            <WorkoutList workouts={workouts} />
                        </View>

                        <View className="w-[80%] h-6">
                            <NeonDivider />
                        </View>

                        <View className="w-[80%] max-w-md mx-auto my-4" ref={barRef}>
                            <View className="flex items-center">
                                <Text className="self-start text-white text-2xl ml-[10%]">Past 7 Days</Text>
                                <BarChart workouts={workouts} />
                            </View>
                        </View>

                        <View className="absolute left-0 top-0 right-0 bottom-0 -z-10">
                            {/* {workouts && <NeonRoundedRectTarget measure={barMeasure} />} */}
                            {/* {workouts && <NeonRoundedRectTarget measure={workoutMeasure} />} */}
                        </View>
                    </View>
                )}
                <NeonBackground />
            </ScrollView>
        </>
    );
}

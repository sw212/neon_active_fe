import { useState, useRef, useEffect, useMemo } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import { Canvas, useThree, useFrame } from "@react-three/fiber/native";
import { Trail, Line } from "@react-three/drei/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { vec3 } from "gl-matrix";
import WorkoutList from "../components/WorkoutList";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryPie } from "victory-native";

import { generatePathShape, index_in_path } from "../utils/track";

const Display = () => {
    const vertexShader = `
    varying vec2 fragCoord;
    
    void main()
    {
        int vertexIndex = gl_VertexID;
    
        int X = int((50u >> vertexIndex) & 1u);
        int Y = int((38u >> vertexIndex) & 1u);
    
        fragCoord.x = float(X);
        fragCoord.y = float(Y);
    
        X = (2 * X) - 1;
        Y = (2 * Y) - 1;
        vec2 pos = vec2(X, Y);
    
        gl_Position = vec4(pos, 0.0, 1.0);
    }
    `;

    const fragmentShader = `

    uniform vec2 size;

    varying vec2 fragCoord;

    float roundSquare(vec2 at)
    {
        float size = 0.2;
        float cornerRadius = 0.01;
        
        at = abs(at);

        if ((at.x > size) || (at.y > size))
        {
            return abs( length(max(at - size, vec2(0))) - cornerRadius );
        }
        else
        {
            vec2 delta = abs(at - size);
            return ((delta.x * delta.y) / (delta.x + delta.y)) + cornerRadius;
            // return min(delta.x, delta.y) + cornerRadius;
        }
    }

    // Narkowicz 2015, "ACES Filmic Tone Mapping Curve"
    vec3 Tonemap_ACES(vec3 x)
    {
        const float a = 2.51;
        const float b = 0.03;
        const float c = 2.43;
        const float d = 0.59;
        const float e = 0.14;
        return (x * (a * x + b)) / (x * (c * x + d) + e);
    }

    void main()
    {
        float intensity = 1.3;
        float radius = 0.005;

        vec2 uv = fragCoord;
        float aspect = size.x/size.y;

        vec2 centre = vec2(0.5, 0.5);
        vec2 at = uv - centre;
        at.y /= aspect;
        
        float dist = roundSquare(at);
        float glow = pow(radius/dist, intensity);
        vec3 col = glow * vec3(0.9, 0.1, 0.1);
        
        col = Tonemap_ACES(col);

        gl_FragColor = vec4(col, 1.0);
    }
    `;

    const { size } = useThree();

    const uniforms = {
        size: { value: [size.width, size.height] },
    };

    return (
        <>
            <mesh>
                <bufferGeometry drawRange={{ start: 0, count: 6 }}>
                    <bufferAttribute />
                </bufferGeometry>

                <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
            </mesh>
        </>
    );
};

const Grid = () => {
    const meshRef = useRef();

    const size = 20;
    const divisions = 10;

    const [vertices, normals, uv, indices] = useMemo(() => {
        const plane = new THREE.PlaneGeometry(size, size, divisions, divisions);
        const vertices = plane.getAttribute("position").array;
        const normals = plane.getAttribute("normal").array;
        const uv = plane.getAttribute("uv").array;
        const indices = plane.getIndex();

        for (let i = 0; i < vertices.length; i += 3) {
            vertices[i + 2] = Math.random() * 2 - 1;
            // vertices[i + 2] = Math.abs(Math.sin(i * 13.17)) * 2 - 1;
        }

        return [vertices, normals, uv, indices];
    }, []);

    const vertexShader = `
    varying vec2 UV;

    void main()
    {
        UV = 25.0 * uv;

        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
      
        gl_Position = projectedPosition;
    }
    `;

    const fragShader = `
    uniform float time;

    varying vec2 UV;

    float rand(float n) { return fract(sin(n) * 43758.5453123); }
    float rand2(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

    float noise(float p)
    {
        float fl = floor(p);
        float fc = fract(p);
        return mix(rand(fl), rand(fl + 1.0), fc);
    }
        
    float noise2(vec2 n)
    {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand2(b), rand2(b + d.yx), f.x), mix(rand2(b + d.xy), rand2(b + d.yy), f.x), f.y);
    }

    void main()
    {      
        vec2 coord = UV;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
      
        float color = 1.0 - min(line, 1.0);
        
        color = pow(color, 1.0 / 2.2);
        float divisor = 5.0;

        // sin((UV.x - time) / divisor)

        vec2 v = UV.xy / 25.0;
        gl_FragColor = vec4(color * noise(v.x - time), color * noise(v.y - time), 0.0, 1.0);
    }
    `;

    const uniforms = {
        time: { value: 0 },
    };

    useFrame((state) => {
        const { clock } = state;
        const t = clock.elapsedTime;
        meshRef.current.rotation.z = t * 0.1;
        meshRef.current.material.uniforms.time.value = t;
    });

    return (
        <>
            <EffectComposer>
                <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.4} />
            </EffectComposer>
            <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
                <bufferGeometry index={indices}>
                    <bufferAttribute
                        attach="attributes-position"
                        array={vertices}
                        itemSize={3}
                        count={vertices.length / 3}
                    />
                    <bufferAttribute
                        attach="attributes-normal"
                        array={normals}
                        itemSize={3}
                        count={normals.length / 3}
                    />
                    <bufferAttribute attach="attributes-uv" array={uv} itemSize={2} count={uv.length / 2} />
                </bufferGeometry>

                <shaderMaterial vertexShader={vertexShader} fragmentShader={fragShader} uniforms={uniforms} />
            </mesh>
        </>
    );
};

const LetterN = () => {
    const { size } = useThree();
    let vx = 0.6;
    let vy = 0.6;

    // prettier-ignore
    const positions = [
        [-vx, -vy, 0.0], [-vx,  vy, 0.0],
        [-vx,  vy, 0.0], [ vx, -vy, 0.0],
        [ vx, -vy, 0.0], [ vx,  vy, 0.0],
    ];

    return (
        <>
            {/* <EffectComposer>
                <Bloom radius={0.2} />
            </EffectComposer> */}

            <Line points={positions} lineWidth={1.0} />
        </>
    );
};

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

const BarChart = () => {
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
};

const PieChart = () => {
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
                    <View className="w-[600px] h-[500px] mx-auto">
                        <Canvas camera={{ position: [0, 2, 3] }}>
                            <Grid />
                        </Canvas>
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
                        <Canvas>
                            <Display />
                            {/* <LetterN /> */}
                        </Canvas>
                    </View>
                    {/* <View className="absolute left-0 top-0 right-0 bottom-0 z-10">
                        <Canvas camera={{ position: [0, 0, 1] }}>{measure && <OrbitTarget measure={measure} />}</Canvas>
                    </View> */}
                </View>
            </ScrollView>
        </>
    );
}

{
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
}

import { Text, View, ScrollView } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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
void main()
{
    gl_FragColor = vec4(1.0, 0.5, 0.1, 1.0);
}
`;

const Display = () => {
    return (
        <>
            <mesh>
                <bufferGeometry drawRange={{ start: 0, count: 6 }}>
                    <bufferAttribute />
                </bufferGeometry>

                <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} />
            </mesh>
        </>
    );
};

const LetterN = () => {
    // prettier-ignore
    const positions = new Float32Array([
        -0.6, -0.6, 0.1, -0.6,  0.6, 0.1,
        -0.6,  0.6, 0.1,  0.6, -0.6, 0.1, 
         0.6, -0.6, 0.1,  0.6,  0.6, 0.1, 
         0.6,  0.6, 0.1,  0.6, -0.6, 0.1,
    ]);

    return (
        <>
            <EffectComposer>
                <Bloom mipmapBlur intensity={0.3} />
            </EffectComposer>

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length}
                        itemSize={3}
                        array={positions}
                    />
                </bufferGeometry>

                <lineBasicMaterial attach="material" color={[1.5, 1, 4]} linewidth={10} toneMapped={false} />
            </lineSegments>
        </>
    );
};

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="h-full pt-4 bg-[#161619]">
                <View className="h-full pt-4">
                    <Canvas>
                        <LetterN />
                    </Canvas>
                </View>
            </View>
        </ScrollView>
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

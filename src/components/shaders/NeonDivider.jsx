import { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber/native";

const Divider = (props) => {
    const meshRef = useRef();
    const { size } = useThree();

    const { intensity = 1.5, radius = 0.02 } = props;

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
    uniform vec2 power;

    varying vec2 fragCoord;

    float sdSegment( in vec2 p, in vec2 a, in vec2 b )
    {
        vec2 pa = p-a, ba = b-a;
        float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
        return length( pa - ba*h );
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
        float intensity = power.x;
        float radius = power.y;

        vec2 uv = fragCoord;
        float aspect = size.x/size.y;
        
        uv.x *= aspect;

        vec2 at = uv - vec2(0.5 * aspect, 0.5);

        vec2 a = vec2(-0.4 * aspect, 0.0);
        vec2 b = vec2( 0.4 * aspect, 0.0);
        float dist = sdSegment(at, a, b);
        float glow = pow(radius/dist, intensity);
        vec3 col = glow * vec3(0.0, 0.5, 0.5);
        
        col = Tonemap_ACES(col);

        gl_FragColor = vec4(col, glow);
    }
    `;

    const uniforms = {
        size: { value: [size.width, size.height] },
        power: { value: [intensity, radius] },
    };

    return (
        <mesh ref={meshRef}>
            <bufferGeometry drawRange={{ start: 0, count: 6 }}>
                <bufferAttribute />
            </bufferGeometry>

            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    );
};

export default function NeonDivider(props) {
    return (
        <Canvas>
            <Divider {...props} />
        </Canvas>
    );
}

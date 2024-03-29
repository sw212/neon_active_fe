import { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber/native";

const RoundedRect = (props) => {
    const meshRef = useRef();
    const { size } = useThree();

    const { measure, intensity = 1.0, radius = 0.006 } = props;

    const width = measure.width / size.width;
    const height = measure.height / size.height;

    const startX = measure.left / size.width;
    const startY = (size.height - measure.top) / size.height;

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
    uniform vec4 measure;
    uniform vec2 power;

    varying vec2 fragCoord;

    float roundSquare(vec2 at, vec2 size)
    {
        // float size = 0.2;
        float cornerRadius = 0.01;
        
        at = abs(at);

        if ((at.x > size.x) || (at.y > size.y))
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
        float startX = measure.x;
        float startY = measure.y;
        float width = measure.z;
        float height = measure.w;

        float intensity = power.x;
        float radius = power.y;

        vec2 uv = fragCoord;
        float aspect = size.x/size.y;
        
        uv.x *= aspect;

        vec2 centre;
        centre.x = aspect * (startX + 0.5 * width);
        centre.y = startY - 0.5 * height;

        vec2 at = uv - centre;

        vec2 size = 0.5 * vec2(aspect * width, height);
        
        float dist = roundSquare(at, size);
        float glow = pow(radius/dist, intensity);
        vec3 col = glow * vec3(0.0, 0.1, 0.1);
        
        col = Tonemap_ACES(col);

        gl_FragColor = vec4(col, glow);
    }
    `;

    const uniforms = {
        size: { value: [size.width, size.height] },
        measure: { value: [startX, startY, width, height] },
        power: { value: [intensity, radius] },
    };

    useFrame((state) => {
        const { clock } = state;
        const t = clock.elapsedTime;

        const s = 0.004 * Math.abs(Math.sin(t));
        meshRef.current.material.uniforms.power.value = [intensity, radius + s];
    });

    return (
        <mesh ref={meshRef}>
            <bufferGeometry drawRange={{ start: 0, count: 6 }} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    );
};

export default function NeonRoundedRectTarget(props) {
    return (
        <Canvas>
            <RoundedRect {...props} />
        </Canvas>
    );
}

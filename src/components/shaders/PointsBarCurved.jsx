import { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber/native";

const Bar = ({ frac }) => {
    const meshRef = useRef();

    const startX = 0.1;
    const startY = 0.5;
    const width = 0.5;
    const length = 0.8;

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
    #define PI 3.141593

    uniform vec2 size;
    uniform vec4 measure;
    uniform float frac;
    uniform float time;

    varying vec2 fragCoord;

    float sdRing( in vec2 p, in vec2 n, in float r, float th )
    {
        p.x = abs(p.x);
    
        p = mat2x2(n.x,n.y,-n.y,n.x)*p;

        return max( abs(length(p)-r)-th*0.5,
                    length(vec2(p.x,max(0.0,abs(r-p.y)-th*0.5)))*sign(p.x) );
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
        vec2 p = fragCoord - 0.5;
        float aspect = size.x/size.y;
        float i_aspect = size.y/size.x;
        
        p.x *= aspect;
        p.y += 0.45;

        float angle = 1.0 - atan(p.y, p.x) / PI;
        float r = length(p);

        float t = 3.14159 * 0.5;
        vec2 cs = vec2(cos(t),sin(t));
        float ra = 0.4 * aspect;
        float th = 0.1 * aspect;
        
        float d = sdRing(p, cs, ra, th);
        float m = abs(d);
        
        float glow = pow(0.01 / m, 1.5);
        vec3 col = glow * vec3(0.8, 0.1, 0.1);

        float f = (1.0 - pow(2.0, -2.0 * time)) * frac;
        float lower = ra - 0.5*th + 0.01;
        float upper = ra + 0.5*th - 0.01;
        if ((0.0 < angle) && (angle < f) && (r > lower) && (r < upper))
        {
            col = mix(vec3(.8,.8,.8), vec3(0.9, 0.1, 0.1), abs(r - ra) / (0.5*th));
            col *= smoothstep(f, f - 0.01, angle - 0.05*abs(r - ra));
        }
    
        col = Tonemap_ACES(col);
    
        gl_FragColor = vec4(col, glow);
    }
    `;

    const { size } = useThree();

    const uniforms = {
        size: { value: [size.width, size.height] },
        measure: { value: [startX, startY, width, length] },
        frac: { value: frac },
        time: { value: 0 },
    };

    useFrame((state) => {
        const { clock } = state;
        const t = clock.elapsedTime;

        meshRef.current.material.uniforms.time.value = t;
    });

    return (
        <mesh ref={meshRef}>
            <bufferGeometry drawRange={{ start: 0, count: 6 }} />
            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    );
};

export default function PointsBarCurved({ frac = 0 }) {
    return (
        <Canvas>
            <Bar frac={frac} />
        </Canvas>
    );
}

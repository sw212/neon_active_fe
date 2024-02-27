import { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber/native";

const Badge = () => {
    const meshRef = useRef();

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
    uniform float time;

    varying vec2 fragCoord;

    mat2 rot(float theta)
    {
        float c = cos(theta);
        float s = sin(theta);
    
        return mat2(c, -s, s, c);
    }

    // https://iquilezles.org/articles/distfunctions2d/
    float sdStar(in vec2 p, in float r, in int n, in float m) // m=[2,n]
    {
        // these 4 lines can be precomputed for a given shape
        float an = 3.141593/float(n);
        float en = 3.141593/m;
        vec2  acs = vec2(cos(an),sin(an));
        vec2  ecs = vec2(cos(en),sin(en)); // ecs=vec2(0,1) and simplify, for regular polygon,
    
        // symmetry (optional)
        p.x = abs(p.x);
        
        // reduce to first sector
        float bn = mod(atan(p.x,p.y),2.0*an) - an;
        p = length(p)*vec2(cos(bn),abs(sin(bn)));
    
        // line sdf
        p -= r*acs;
        p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y);
        return length(p)*sign(p.x);
    }

    void main()
    {
        vec2 uv = (2.0*fragCoord - vec2(1.0));
        uv.x *= size.x / size.y;

        uv *= rot(time * 0.2);

        float n = 5.0;
        float w = 3.0; // [2,n]
        float d = abs(sdStar(uv, 0.75, int(n), w));
        float m = pow(0.04 / d, 1.9);
        vec3 col = m * vec3(0.1, 0.1, 0.7);
        gl_FragColor = vec4(col, m);
    }
    `;
    const { size } = useThree();

    const uniforms = {
        size: { value: [size.width, size.height] },
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

export default function NeonBadge() {
    return (
        <Canvas>
            <Badge />
        </Canvas>
    );
}

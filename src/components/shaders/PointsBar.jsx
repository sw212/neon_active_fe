import { Canvas, useThree } from "@react-three/fiber/native";

const Bar = ({ frac }) => {
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

    uniform vec2 size;
    uniform vec4 measure;
    uniform float frac;

    varying vec2 fragCoord;

    float roundSquare(vec2 at, vec2 size, float cornerRadius)
    {
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
        float length = measure.w;

        vec2 uv = fragCoord;
        float aspect = size.x/size.y;
        
        uv.x *= aspect;

        vec2 centre;
        centre.x = startX + 0.5 * length;
        centre.x *= aspect;
        centre.y = startY;

        vec2 at = uv - centre;

        vec2 size = 0.5 * vec2(length * aspect, width);
        
        float corner = 0.08;
        float dist = roundSquare(at, size, corner);
        float intensity = 1.8;
        float radius = 0.04;
        float glow = pow(radius/dist, intensity);

        vec3 col = glow * vec3(0.9, 0.1, 0.1);
        col = clamp(col, 0.0, 1.0);

        vec2 inner_centre = vec2((startX + 0.5 * length * frac) * aspect, centre.y);
        vec2 inner_size = vec2(size.x * frac, size.y);
        vec2 inner_at = abs(uv - inner_centre);
        float inner_v = inner_at.y / inner_size.y;
        float inner_corner = corner / sqrt(2.5);

        float alpha = glow;
        alpha = clamp(alpha, 0.0, 1.0);
        if ((inner_at.x < (inner_size.x + inner_corner)) && (inner_at.y < (inner_size.y + inner_corner)))
        {
            alpha = 1.0;
            col = mix(vec3(0.8, 0.8, 0.8), vec3(0.9, 0.1, 0.1), inner_v);
        }
        
        vec3 result = Tonemap_ACES(col);
        gl_FragColor = vec4(result, alpha);
    }
    `;

    const { size } = useThree();

    const uniforms = {
        size: { value: [size.width, size.height] },
        measure: { value: [startX, startY, width, length] },
        frac: { value: frac },
    };

    return (
        <mesh>
            <bufferGeometry drawRange={{ start: 0, count: 6 }}>
                <bufferAttribute />
            </bufferGeometry>

            <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
        </mesh>
    );
};

export default function PointsBar({ frac = 0 }) {
    return (
        <Canvas>
            <Bar frac={frac} />
        </Canvas>
    );
}

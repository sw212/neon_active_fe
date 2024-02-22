import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

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

    vec3 palette(in float t)
    {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);

        return a + b*cos( 6.28318*(c*t+d) );
    }    

    void main()
    {      
        vec2 coord = UV;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        float factor = 1.0 - min(line, 1.0);
        
        vec2 v = UV.xy / 25.0;
        v = 2.0 * (v - 0.5);

        v = 2.0 * fract(v) - 1.0;

        float d = length(v);

        vec3 col = palette(noise2(v) - time * 0.1);

        d = sin(d * 8.0 + time);
        d = abs(d);

        d = exp(-d / 0.1 + 0.6);

        col *= factor * d;        

        col = pow(col, vec3(1.0 / 2.2));
        gl_FragColor = vec4(col, 1.0);
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

export default function NeonGrid() {
    const v = 1.0;

    return (
        <Canvas camera={{ position: [0, v * 2, v * 3] }}>
            <Grid />
        </Canvas>
    );
}

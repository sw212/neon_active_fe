import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";

const Scene = () => {
    const meshRef = useRef();

    const vertexShader = `
    varying vec2 UV;
    
    void main()
    {
        int vertexIndex = gl_VertexID;
    
        int X = int((50u >> vertexIndex) & 1u);
        int Y = int((38u >> vertexIndex) & 1u);
    
        UV.x = float(X);
        UV.y = float(Y);
    
        X = (2 * X) - 1;
        Y = (2 * Y) - 1;
        vec2 pos = vec2(X, Y);
    
        gl_Position = vec4(pos, 0.0, 1.0);
    }
    `;

    const fragShader = `
    uniform vec2 size;
    uniform float time;
    
    varying vec2 UV;

    #define PI          3.141592654
    const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    #define hsv_2_rgb(c)  (c.z * mix(hsv2rgb_K.xxx, clamp(abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www) - hsv2rgb_K.xxx, 0.0, 1.0), c.y))
    
    vec3 aces_approx(vec3 v)
    {
        v = max(v, 0.0);
        v *= 0.6f;
        float a = 2.51f, b = 0.03f, c = 2.43f, d = 0.59f, e = 0.14f;
        return clamp((v*(a*v+b))/(v*(c*v+d)+e), 0.0f, 1.0f);
    }
    
    vec2 spherical(vec3 p)
    {
        float theta = acos(p.z / length(p));
        float phi   = atan(p.y, p.x);
        return vec2(theta, phi);
    }
    
    vec3 glow(vec3 ray_origin, vec3 ray_dir)
    {
        vec3 col = vec3(0.0);
    
        vec3 point = vec3(0.0, 125.0, -500.0);
        vec2 theta_phi = spherical(ray_dir.xzy); // theta, phi
    
        float y = -0.5+theta_phi.x/PI; // acos scaled to 0/1 then centred to -0.5/0.5
        y = max(abs(y)-0.02, 0.0) + 0.1 * smoothstep(0.5, PI, abs(theta_phi.y + 0.5* PI));
    
        float ld = clamp(dot(normalize(point - ray_origin), ray_dir), 0.0, .9); // circular blob centred at "lp-ro" direction
        float ci = pow(ld, 10.0)*2.0*exp(-5.0*y);
    
        float h = 0.65;
        col = hsv_2_rgb(vec3(h, 0.75, 0.35*exp(-15.0*y)))+hsv_2_rgb(vec3(0.8, 0.75, 0.5))*ci;
    
        return col;
    }
    
    vec3 neonBG(vec3 ray_origin, vec3 ray_dir)
    {
        vec3 lp = 500.0*vec3(0.0, 0.25, -1.0);
    
        float glare = pow(abs(dot(ray_dir, normalize(lp))), 20.0);
        float m = 0.4/abs(ray_dir.y);
        float gm = m*mix(0.005, 2.0, glare);
        gm = pow(gm, .5);
        vec3 skyCol = hsv_2_rgb(vec3(0.8, 0.75, 0.05));
        vec3    col = skyCol*gm;
    
        col += glow(ray_origin, ray_dir);
    
        return col;
    }
    
    void main()
    {
        vec2 coord = 2.0 * (UV - 0.5);
        coord.x *= size.x / size.y; 
    
        vec3 origin = vec3(0.0, 0.0, 10.0);
        vec3 view_dir = vec3(0.0, 1.0, 0.0);
        vec3 up = vec3(0.0, 1.0, 0.0);
    
        vec3 w = normalize(view_dir - origin);
        vec3 u = normalize(cross(up, w));
        vec3 v = (cross(w, u));
        float fov = tan(PI / 3.0);
        vec3 ray = normalize(-coord.x*u + coord.y*v + fov*w);
        
        float fade = 1.0 - pow(2.0, -time);
        vec3 col = fade * neonBG(origin, ray);
        col = aces_approx(col);
        
        gl_FragColor = vec4(col, 1.0);
    }
    `;

    const { size } = useThree();

    const uniforms = {
        time: { value: 0 },
        size: { value: [size.width, size.height] },
    };

    useFrame((state) => {
        const { clock } = state;
        const t = clock.elapsedTime;
        meshRef.current.material.uniforms.time.value = t;
    });

    return (
        <>
            <mesh ref={meshRef}>
                <bufferGeometry drawRange={{ start: 0, count: 6 }} />
                <shaderMaterial vertexShader={vertexShader} fragmentShader={fragShader} uniforms={uniforms} />
            </mesh>
        </>
    );
};

export default function NeonLoginBG() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}

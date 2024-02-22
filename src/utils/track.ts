import { vec3 } from "gl-matrix";

export const generatePathShape = (w, h, n, p=0.3) => {
    const vertices: Array<vec3> = [];

    for (let i = 0; i < n; i++) {
        const theta = i * ((2 * Math.PI) / n) + Math.PI / n;

        const c = Math.cos(theta);
        const s = Math.sin(theta);
        const x = w * Math.sign(c) * Math.pow(Math.abs(c), p);
        const y = h * Math.sign(s) * Math.pow(Math.abs(s), p);

        vertices.push([x, y, 0]);
    }

    let pathLength = 0;
    const pathLengths: Array<number> = [];
    const cumulativeLengths: Array<number> = [];

    for (let i = 0; i < n; i++)
    {
        let v = vec3.create();
        vec3.sub(v, vertices[(i + 1) % n], vertices[i]);
        let l = vec3.length(v);
        pathLengths.push(l);
        cumulativeLengths.push(pathLength);
        pathLength += l;
    }

    return [vertices, pathLengths, cumulativeLengths, pathLength];
};

export const index_in_path = (t: number, n: number, pathLength: number, cumulativeLengths: Array<number>) => {
    let l = 0;
    let r = n - 1;

    let d = t % pathLength;

    while (l < r)
    {
        const m = Math.ceil((l + r) / 2);

        const mid = cumulativeLengths[m];

        if (d <= mid)
        {
            r = m - 1;
        }
        else
        {
            l = m;
        }
    }

    return l;
}

function createNineShapes() {
    let shapes = [];

    shapes.push(createPyramid());
    shapes[0].translate([-1, 1, 0]);
    shapes.push(createSquare());
    shapes[1].translate([0, 1, 0]);
    shapes.push(createPyramid());
    shapes[2].translate([1, 1, 0]);

    shapes.push(createSquare());
    shapes[3].translate([-1, 0, 0]);
    shapes.push(createPyramid());
    shapes[4].translate([0, 0, 0]);
    shapes.push(createSquare());
    shapes[5].translate([1, 0, 0]);

    shapes.push(createPyramid());
    shapes[6].translate([-1, -1, 0]);
    shapes.push(createSquare());
    shapes[7].translate([0, -1, 0]);
    shapes.push((createPyramid()));
    shapes[8].translate([1, -1, 0]);

    return shapes;
}


function createTeaPot(teapot_vertices) {
    teapot_vertices = parseOBJ(teapot_data);

    shapes[4] = (createOBJ(teapot_vertices));
    shapes[4].translate([0, -0.25, 0]);
    shapes[4].scale([0.5, 0.5, 0.5]);
}

function createSquare() {
    const vertices = [
        // X, Y, Z, W
        0.2, 0.2, 0.2,
        -0.2, 0.2, 0.2,
        0.2, -0.2, 0.2,

        -0.2, 0.2, 0.2,
        -0.2, -0.2, 0.2,
        0.2, -0.2, 0.2,  // front face end

        -0.2, -0.2, -0.2,
        -0.2, -0.2, 0.2,
        -0.2, 0.2, 0.2,

        -0.2, -0.2, -0.2,
        -0.2, 0.2, 0.2,
        -0.2, 0.2, -0.2,  // left face end

        0.2, 0.2, -0.2,
        -0.2, -0.2, -0.2,
        -0.2, 0.2, -0.2,

        0.2, 0.2, -0.2,
        0.2, -0.2, -0.2,
        -0.2, -0.2, -0.2,  // back face end

        0.2, -0.2, 0.2,
        -0.2, -0.2, -0.2,
        0.2, -0.2, -0.2,

        0.2, -0.2, 0.2,
        -0.2, -0.2, 0.2,
        -0.2, -0.2, -0.2,  // bottom face end

        0.2, 0.2, 0.2,
        0.2, -0.2, -0.2,
        0.2, 0.2, -0.2,

        0.2, -0.2, -0.2,
        0.2, 0.2, 0.2,
        0.2, -0.2, 0.2,  // right face end

        0.2, 0.2, 0.2,
        0.2, 0.2, -0.2,
        -0.2, 0.2, -0.2,

        0.2, 0.2, 0.2,
        -0.2, 0.2, -0.2,
        -0.2, 0.2, 0.2,  // Top face end
    ];



    const normalData = [
        [0, 0, 1], // front
        [-1, 0, 0], // left
        [0, 0, -1], // back
        [0, -1, 0], // bottom
        [1, 0, 0], // right
        [0, 1, 0], // top
    ];


    const colorData = [  // one color for each face 
        [114 / 255, 24 / 255, 23 / 255],
        [250 / 255, 159 / 255, 66 / 255],
        [43 / 255, 65 / 255, 98 / 255],
        [11 / 255, 110 / 255, 79 / 255],
        [205 / 255, 199 / 255, 229 / 255],
        [168 / 255, 194 / 255, 86 / 255],
    ];

    const colors = [];

    const normals = [];

    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 6; ++j) {
            normals.push(normalData[i]);
            colors.push(colorData[i]);
        }
    }

    const cube = new Shape();
    cube.initData(vertices, colors, normals)

    return cube;
}

function createPyramid() {

    const vertices = [
        0.2, -0.2, -0.2,
        0.2, -0.2, 0.2,
        -0.2, -0.2, 0.2,

        0.2, -0.2, -0.2,
        -0.2, -0.2, 0.2,
        -0.2, -0.2, -0.2,

        0.0, 0.2, 0.0,
        -0.2, -0.2, 0.2,
        0.2, -0.2, 0.2,

        0.0, 0.2, 0.0,
        0.2, -0.2, 0.2,
        0.2, -0.2, -0.2,

        0.0, 0.2, 0.0,
        0.2, -0.2, -0.2,
        -0.2, -0.2, -0.2,

        0.0, 0.2, 0.0,
        -0.2, -0.2, -0.2,
        -0.2, -0.2, 0.2
    ];


    const colors = [

        114 / 255, 24 / 255, 23 / 255,
        114 / 255, 24 / 255, 23 / 255,
        114 / 255, 24 / 255, 23 / 255,

        114 / 255, 24 / 255, 23 / 255,
        114 / 255, 24 / 255, 23 / 255,
        114 / 255, 24 / 255, 23 / 255,


        43 / 255, 65 / 255, 98 / 255,
        43 / 255, 65 / 255, 98 / 255,
        43 / 255, 65 / 255, 98 / 255,


        134 / 255, 165 / 255, 217 / 255,
        134 / 255, 165 / 255, 217 / 255,
        134 / 255, 165 / 255, 217 / 255,


        216 / 255, 151 / 255, 60 / 255,
        216 / 255, 151 / 255, 60 / 255,
        216 / 255, 151 / 255, 60 / 255,


        189 / 255, 198 / 255, 150 / 255,
        189 / 255, 198 / 255, 150 / 255,
        189 / 255, 198 / 255, 150 / 255
    ];

    const normals = [];

    for (let i = 0; i < vertices.length; i += 9) {
        let vertex1 = vec3.fromValues(vertices[i], vertices[i + 1], vertices[i + 2]);
        let vertex2 = vec3.fromValues(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
        let vertex3 = vec3.fromValues(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

        let normal = getNormal(vertex1, vertex2, vertex3);

        for (let n = 0; n < 3; n++) {
            normals.push(normal);
        }
    }

    const pyramid = new Shape();
    pyramid.initData(vertices, colors, normals)

    return pyramid;
}

function getNormal(vertex1, vertex2, vertex3) {
    let vector1 = vec3.subtract(vec3.create(), vertex2, vertex1);
    let vector2 = vec3.subtract(vec3.create(), vertex3, vertex1);

    let normal = vec3.cross(vec3.create(), vector1, vector2);

    vec3.normalize(normal, normal);

    return [normal[0], normal[1], normal[2]];  // has to return array and not vec
}

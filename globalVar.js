const { mat4, mat3, vec4, vec3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const viewMatrix = mat4.create();

// * * * * LIGHT VECTOR * * * * 
let lightPosition = vec4.fromValues(0, 10, 0, 1);

let lightMovement = false;

let shapes = [];
let gl = null;

let camera_movement = false;
let all_selected = false;
let mouseClick = false;

let lastMouseX = 0;
let lastMouseY = 0;

//  * * * * * * * * LAB 1 B  * * * * *  * * (tutorial)

let currentShaderProgram = null;

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create()
};

const shaders = {
    noLight: "v-shader-nolight",
    gouraudDiff: "v-shader-gouraud-d",
    gouraudSpec: "v-shader-gouraud-s",
    phongDiff: "v-shader-phong-d",
    phongSpec: "v-shader-phong-s",
    phongFSpec: "f-shader-phong-s",
    phongF: "f-shader-phong-d",
    fragment: "f-shader"
};

const shaderProgramms = {
    noLightProgram: null,
    gouraoudDiffProgram: null,
    gouraoudSpecProgram: null,
    phongDiffProgram: null,
    phongSpecProgram: null
}

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix",
        lightPosition: "lightViewPosition"
    }
}



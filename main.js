
window.onload = async () => {
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    //gl.clearColor(241 / 255, 240 / 255, 204 / 255, 1); // original Lab1A background color
    gl.clearColor(1 / 255, 6 / 255, 20 / 255, 1);

    mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    shaderProgramms.noLightProgram = new ShaderProgram(shaders.noLight, shaders.fragment, shaderInfo);
    shaderProgramms.gouraoudDiffProgram = new ShaderProgram(shaders.gouraudDiff, shaders.fragment, shaderInfo);
    shaderProgramms.gouraoudSpecProgram = new ShaderProgram(shaders.gouraudSpec, shaders.fragment, shaderInfo);
    shaderProgramms.phongDiffProgram = new ShaderProgram(shaders.phongDiff, shaders.phongF, shaderInfo);
    shaderProgramms.phongSpecProgram = new ShaderProgram(shaders.phongSpec, shaders.phongFSpec, shaderInfo);

    shaderProgramms.noLightProgram.enable();

    mat4.lookAt(matrices.viewMatrix, [0, 0, 6], [0, 0, 0], [0, 1, 0]);

    shapes = createNineShapes();

    window.addEventListener("mousedown", (event) => {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        checkLeftMouseClick(event);
    });

    window.addEventListener("mouseup", (event) => {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        mouseClick = false;
    });


    window.addEventListener("mousemove", (event) => {
        mouseMovements(event);
    });

    window.addEventListener("keydown", (event) => {
        test1(event);
    });

    teapot_data = await loadData();
    createTeaPot(teapot_data);

    requestAnimationFrame(render);
}

async function loadData() {
    const data = await fetch('teapot.obj').then(result => result.text());
    return data;
}

let then = 0;
let first = true;

function render(now) {
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.uniform4fv(currentShaderProgram.uniforms.lightPosition, lightPosition);

    if (lightMovement) {
        gl.uniform4fv(currentShaderProgram.uniforms.lightPosition, lightPosition);
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach(shape => {
        shape.draw();
        if (shape.selected == true & !camera_movement) {
            shape.drawLocalCoordinateSystem();
        }
    })

    requestAnimationFrame(render)
}


function rotateLight(axis) {
    const rotationMatrix = mat4.create();
    mat4.fromRotation(rotationMatrix, 0.2, axis);

    vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);

    // console.log("the after: -> ", lightPosition);
}

function moveLight(lightDirection) {
    switch (lightDirection) {
        case "ArrowLeft":
            lightPosition[0] -= 0.2;
            break;
        case "ArrowRight":
            lightPosition[0] += 0.2;
            break;
        case "ArrowDown":
            lightPosition[1] -= 0.2;
            break;
        case "ArrowUp":
            lightPosition[1] += 0.2;
            break;
        case ".":
            lightPosition[2] -= 0.2;
            break;
        case ",":
            lightPosition[2] += 0.2;
            break;
        default:
            break;
    }
}
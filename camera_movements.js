
function moveCamera(direction) {
    switch (direction) {
        case "right":
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0.02, 0, 0]);
            break;
        case "left":
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [-0.02, 0, 0]);
            break;
        case "up":
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, 0.02, 0]);
            break;
        case "down":
            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, -0.02, 0]);
            break;
        default:
            console.log("Invalid direction, sorry")
    }
}
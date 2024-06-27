
function checkLeftMouseClick(event) {
    if (event.buttons == 1) {
        mouseClick = true;
    }
}

function mouseMovements(event) {
    if (mouseClick) {
        // end position of mouse movement
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        // difference of movement position
        const deltaX = mouseX - lastMouseX;
        const deltaY = mouseY - lastMouseY;
        // update last mouse position
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        const moveX = deltaX / 100;
        const moveY = deltaY / 100;

        mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [moveX, -moveY, 0]);
    }

    /*
    My first try of camera movements was done something like this:
    if (event.movementX != 0) {
            if (event.movementX > 0) {
                moveCamera("right") ... 

    But that wasnt smooth and it looked weird, so i looked up the followig tutorial to make the dragging smooth.
    The part that i took from that was the calculations for X and Y positions and how to use that information with translation.

     "Coding First Person Camera Controls in 10 Minutes" by morejpeg
     https://www.youtube.com/watch?v=0b9WPrc0H2w
    */
}

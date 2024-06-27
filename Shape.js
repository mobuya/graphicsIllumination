class Shape {
    constructor() {
        this.vertices = [];
        this.colors = [];
        this.selected = false;
        this.normals = [];

        this.buffers = {
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer()
        }

        this.modelMatrix = mat4.create();
        this.normalMatrix = mat3.create();
    }

    initData(vertices, colors, normals) {
        this.vertices = new Float32Array(vertices.flat()); // -> its important that it flattens the data 
        this.colors = new Float32Array(colors.flat());
        this.normals = new Float32Array(normals.flat());

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }

    draw() {
        // what buffers to use to supply the attributes
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
        Shape.setupAttribute(this.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation);

        const modelViewMatrix = mat4.create();

        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.modelMatrix);
        mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix); // without this the light isnt moving with the shapes 
        gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix); // witohut this its just black

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    rotate(angle, axis, global = false) {
        if (global) {
            const rotationMatrix = mat4.create();
            mat4.fromRotation(rotationMatrix, angle, axis);
            mat4.mul(this.modelMatrix, rotationMatrix, this.modelMatrix);
        } else {
            mat4.rotate(this.modelMatrix, this.modelMatrix, angle, axis);
        }
    }

    translate(vector, global = false) {
        if (global) {
            const translateMatrix = mat4.create();
            mat4.fromTranslation(translateMatrix, vector);
            mat4.mul(this.modelMatrix, translateMatrix, this.modelMatrix);
        } else {
            mat4.translate(this.modelMatrix, this.modelMatrix, vector);
        }
    }

    scale(scaling_vector, global = false) {
        if (global) {
            const scalingMatrix = mat4.create();
            mat4.fromScaling(scalingMatrix, scaling_vector);
            mat4.mul(this.modelMatrix, scalingMatrix, this.modelMatrix);
        } else {
            mat4.scale(this.modelMatrix, this.modelMatrix, scaling_vector);
        }
    }


    static setupAttribute(buffer, location) {
        if (location === -1) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            3, // number of elements for each vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // should data be normalised?
            0, // stride
            0 // offset
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }

    drawLocalCoordinateSystem() {
        const coordinate_lenght = 0.6;

        const vertices = [
            // for X coordinate 
            -coordinate_lenght, 0, 0,
            coordinate_lenght, 0, 0,
            // for Y
            0, -coordinate_lenght, 0,
            0, coordinate_lenght, 0,
            // for Z
            0, 0, -coordinate_lenght,
            0, 0, coordinate_lenght
        ];

        const colors = [
            1, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1
        ];


        const axisVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, axisVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        const axisColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, axisColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, axisVertexBuffer);
        gl.vertexAttribPointer(
            currentShaderProgram.attributes.vertexLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            0,
            0
        );
        gl.enableVertexAttribArray(currentShaderProgram.attributes.vertexLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, axisColorBuffer);
        gl.vertexAttribPointer(
            currentShaderProgram.attributes.colorLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            0,
            0
        );
        gl.enableVertexAttribArray(currentShaderProgram.attributes.colorLocation);

        gl.drawArrays(gl.LINES, 0, vertices.length / 3); // no triange, we use lines
    }
}

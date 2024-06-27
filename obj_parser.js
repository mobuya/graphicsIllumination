
function parseOBJ(data) {

    const objVertices = [];
    const objNormals = [];

    const faces = [];
    const normals = [];

    const lines = data.split('\n');

    lines.forEach(line => {
        if (line.startsWith('v ')) {
            const vertexInfo = line.trim().split(/\s+/);
            const x = vertexInfo[1];
            const y = vertexInfo[2];
            const z = vertexInfo[3];
            objVertices.push([x, y, z]);
        } else if (line.startsWith('vn ')) {
            const normalInfo = line.trim().split(/\s+/);
            const normX = normalInfo[1];
            const normY = normalInfo[2];
            const normZ = normalInfo[3];
            objNormals.push([normX, normY, normZ]);
        } else if (line.startsWith('f ')) {
            const faceInfo = line.trim().split(/\s+/);
            for (i = 1; i < faceInfo.length; i++) {

                let oneFace = faceInfo[i].split("//");

                const vertexIndex = parseInt(oneFace[0]) - 1;
                const normalIndex = parseInt(oneFace[1]) - 1;

                faces.push(...objVertices[vertexIndex]);
                normals.push(...objNormals[normalIndex]);
            }
        }
    });

    console.log("normals: ", normals.length);
    console.log("faces: ", faces.length);

    return { faces, normals };
}


function createOBJ(data) {
    const faces = data.faces;
    const normals = data.normals;
    const colors = [];
    for (i = 0; i < faces.length / 3; i++) {
        colors.push(...[114 / 255, 24 / 255, 23 / 255]); // red
        //colors.push(...[43 / 255, 65 / 255, 98 / 255]); // blue
    }

    const teaPot = new Shape();

    normals.push([1, 1, 1]);
    teaPot.initData(faces, colors, normals);

    return teaPot;
}


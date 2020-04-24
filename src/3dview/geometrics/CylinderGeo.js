/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Geometry, BufferGeometry, Float32BufferAttribute, Vector3, Vector2 } from 'three';

// CylinderGeo

class CylinderGeo extends Geometry {
    constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, topVisible = false, bottomVisible = false, thetaStart = 0.0, thetaLength = Math.PI * 2, sideVisble = true) {
        super();

        this.type = 'CylinderGeo';

        this.parameters = {
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            topVisible,
            bottomVisible,
            thetaStart,
            thetaLength,
            sideVisble
        };

        this.fromBufferGeometry(new CylinderBufferGeo(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));
        this.mergeVertices();

    }
}


// CylinderBufferGeo

class CylinderBufferGeo extends BufferGeometry {
    constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, topVisible = true, bottomVisible = false, thetaStart = 0.0, thetaLength = Math.PI * 2, sideVisble = false) {
        super();
        var scope = this;
        this.parameters = {
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            topVisible,
            bottomVisible,
            thetaStart,
            thetaLength,
            sideVisble
        };


        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // helper variables

        var index = 0;
        var indexArray = [];
        var halfHeight = height / 2;
        var groupStart = 0;

        // generate geometry

        generateTorso();

        if (topVisible === true)
        {
            if (radiusTop > 0) generateCap(true);
        }
        if (bottomVisible === true)
        {
            if (radiusBottom > 0) generateCap(false);

        }

        if (sideVisble === true)
        {
            generateSide()
        }

        // build geometry

        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

        function generateTorso() {

            var x, y;
            var normal = new Vector3();
            var vertex = new Vector3();

            var groupCount = 0;

            // this will be used to calculate the normal
            var slope = (radiusBottom - radiusTop) / height;

            // generate vertices, normals and uvs

            for (y = 0; y <= heightSegments; y++)
            {

                var indexRow = [];

                var v = y / heightSegments;

                // calculate the radius of the current row

                var radius = v * (radiusBottom - radiusTop) + radiusTop;

                for (x = 0; x <= radialSegments; x++)
                {

                    var u = x / radialSegments;

                    var theta = u * thetaLength + thetaStart;

                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);

                    // vertex

                    vertex.x = radius * sinTheta;
                    vertex.y = - v * height + halfHeight;
                    vertex.z = radius * cosTheta;
                    vertices.push(vertex.x, vertex.y, vertex.z);

                    // normal

                    normal.set(sinTheta, slope, cosTheta).normalize();
                    normals.push(normal.x, normal.y, normal.z);

                    // uv

                    uvs.push(u, 1 - v);

                    // save index of vertex in respective row

                    indexRow.push(index++);

                }

                // now save vertices of the row in our index array

                indexArray.push(indexRow);

            }

            // generate indices

            for (x = 0; x < radialSegments; x++)
            {

                for (y = 0; y < heightSegments; y++)
                {

                    // we use the index array to access the correct indices

                    var a = indexArray[y][x];
                    var b = indexArray[y + 1][x];
                    var c = indexArray[y + 1][x + 1];
                    var d = indexArray[y][x + 1];

                    // faces

                    indices.push(a, b, d);
                    indices.push(b, c, d);

                    // update group counter

                    groupCount += 6;

                }

            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup(groupStart, groupCount, 0);

            // calculate new start value for groups

            groupStart += groupCount;

        }

        function generateCap(top) {

            var x, centerIndexStart, centerIndexEnd;

            var uv = new Vector2();
            var vertex = new Vector3();

            var groupCount = 0;

            var radius = (top === true) ? radiusTop : radiusBottom;
            var sign = (top === true) ? 1 : - 1;

            // save the index of the first center vertex
            centerIndexStart = index;

            // first we generate the center vertex data of the cap.
            // because the geometry needs one set of uvs per face,
            // we must generate a center vertex per face/segment

            for (x = 1; x <= radialSegments; x++)
            {

                // vertex

                vertices.push(0, halfHeight * sign, 0);

                // normal

                normals.push(0, sign, 0);

                // uv

                uvs.push(0.5, 0.5);

                // increase index

                index++;

            }

            // save the index of the last center vertex

            centerIndexEnd = index;

            // now we generate the surrounding vertices, normals and uvs

            for (x = 0; x <= radialSegments; x++)
            {

                var u = x / radialSegments;
                var theta = u * thetaLength + thetaStart;

                var cosTheta = Math.cos(theta);
                var sinTheta = Math.sin(theta);

                // vertex

                vertex.x = radius * sinTheta;
                vertex.y = halfHeight * sign;
                vertex.z = radius * cosTheta;
                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal

                normals.push(0, sign, 0);

                // uv

                uv.x = (cosTheta * 0.5) + 0.5;
                uv.y = (sinTheta * 0.5 * sign) + 0.5;
                uvs.push(uv.x, uv.y);

                // increase index

                index++;

            }

            // generate indices

            for (x = 0; x < radialSegments; x++)
            {

                var c = centerIndexStart + x;
                var i = centerIndexEnd + x;

                if (top === true)
                {

                    // face top

                    indices.push(i, i + 1, c);

                } else
                {

                    // face bottom

                    indices.push(i + 1, i, c);

                }

                groupCount += 3;

            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup(groupStart, groupCount, top === true ? 1 : 2);

            // calculate new start value for groups

            groupStart += groupCount;

        }

        function generateSide() {
            var x0t = Math.sin(thetaStart) * radiusTop;
            var x0b = Math.sin(thetaStart) * radiusBottom;
            var z0t = Math.cos(thetaStart) * radiusTop;
            var z0b = Math.cos(thetaStart) * radiusBottom;
            var x1t = Math.sin(thetaStart + thetaLength) * radiusTop;
            var x1b = Math.sin(thetaStart + thetaLength) * radiusBottom;
            var z1t = Math.cos(thetaStart + thetaLength) * radiusTop;
            var z1b = Math.cos(thetaStart + thetaLength) * radiusBottom;

            var centerBottom = new Vector3(0, -height / 2, 0)
            var centerUp = new Vector3(0, height / 2, 0)

            var startBottom = new Vector3(x0b, -height / 2, z0b)
            var startUp = new Vector3(x0t, height / 2, z0t)

            var endBottom = new Vector3(x1b, -height / 2, z1b)
            var endUp = new Vector3(x1t, height / 2, z1t);

            var normal0 = centerUp.clone().sub(centerBottom).cross(startUp.clone().sub(centerBottom)).normalize();
            var normal1 = centerUp.clone().sub(centerBottom).cross(endUp.clone().sub(centerBottom)).normalize();

            var startIndex = index;
            vertices.push(0, -height / 2, 0);
            vertices.push(0, height / 2, 0);
            vertices.push(x0t, height / 2, z0t);
            vertices.push(x0b, -height / 2, z0b);
            uvs.push(0, 0);
            uvs.push(0, 1);
            uvs.push(0.5, 1);
            uvs.push(0.5, 0);
            normals.push(normal0.x, normal0.y, normal0.z);
            normals.push(normal0.x, normal0.y, normal0.z);
            normals.push(normal0.x, normal0.y, normal0.z);
            normals.push(normal0.x, normal0.y, normal0.z);

            indices.push(startIndex, startIndex + 2, startIndex + 1);
            indices.push(startIndex, startIndex + 3, startIndex + 2);

            startIndex += 4;
            vertices.push(0, -height / 2, 0);
            vertices.push(0, height / 2, 0);
            vertices.push(x1t, height / 2, z1t);
            vertices.push(x1b, -height / 2, z1b);

            uvs.push(0, 0);
            uvs.push(0, 1);
            uvs.push(1, 1);
            uvs.push(1, 0);

            normals.push(normal1.x, normal1.y, normal1.z);
            normals.push(normal1.x, normal1.y, normal1.z);
            normals.push(normal1.x, normal1.y, normal1.z);
            normals.push(normal1.x, normal1.y, normal1.z);

            indices.push(startIndex, startIndex + 1, startIndex + 2)
            indices.push(startIndex, startIndex + 2, startIndex + 3)
            index += 8

        }

    }

}

export { CylinderGeo, CylinderBufferGeo };

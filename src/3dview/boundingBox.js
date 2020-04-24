import { Box3, Vector3 } from "three";

export function calcBxs(mesh) {
    var res = new Box3();
    mesh.traverse(m => {
        if (m.isMesh)
        {
            if (!m.geometry.boundingBox)
                m.geometry.computeBoundingBox();
            res.union(m.geometry.boundingBox);
        }
    });
    return res;
}

export function calcCameraPos(mesh) {
    var box = calcBxs(mesh);
    var center = new Vector3();
    box.getCenter(center);
    var size = new Vector3();
    box.getSize(size)
    var max = Math.max(size.x, size.y)
    var cam = mesh.position.clone().add(new Vector3(0, 0, -1).multiplyScalar(max * 3));
    return {
        center, cam
    }
}



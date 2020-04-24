import { Object3D, Mesh, FrontSide, BackSide } from "three";

/**
 * three 目前最好的透明解决方案
 * @param {*} geometry 
 * @param {*} material 
 */
export function transparentObject(geometry, material) {
    var obj = new Object3D();
    var mesh = new Mesh(geometry, material);
    mesh.material.side = BackSide; // back faces
    mesh.renderOrder = 0;
    obj.add(mesh);

    var mesh = new Mesh(geometry, material.clone());
    mesh.material.side = FrontSide; // front faces
    mesh.renderOrder = 1;
    obj.add(mesh);
    return obj
}
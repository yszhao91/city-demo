import { LoadingManager } from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader2"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
const manager = new LoadingManager();
export function loadObj(baseUrl, name) {
    var objLoader = new OBJLoader(manager)
    var mtlLoader = new MTLLoader(manager)
    mtlLoader
        .setPath('./models/obj/male02/indoor-obj/')
        .load('test.mtl', function (materials) {

            materials.preload();

            mtlLoader
                .setMaterials(materials)
                .setPath('./models/obj/male02/indoor-obj/')
                .load('test.obj', function (object) {

                }, onProgress, onError);

        });
}
import "./style/app.css";
import { Viewer } from "./viewer";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { AxesHelper, Mesh, BoxBufferGeometry, MeshPhongMaterial, AmbientLight, HemisphereLight, DirectionalLight } from "three";
// import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";

const body = document.body;

var viewer = new Viewer({ container: body });

viewer.run();

viewer.add(new AxesHelper(10000))
var box = new Mesh(new BoxBufferGeometry(10, 10, 10), new MeshPhongMaterial({ transparent: true, opacity: 0.1 }))
viewer.add(box);
viewer.add(new AmbientLight(0x444444));
var dirLight = new DirectionalLight();
dirLight.position.set(1, 10, 10)
viewer.add(dirLight);
var dirLight = new DirectionalLight();
dirLight.position.set(5, 20, -10)
viewer.add(dirLight);
var dirLight = new DirectionalLight();
dirLight.position.set(-15, 20, 10)
viewer.add(dirLight);

var objLoader = new OBJLoader();
var mtlLoader = new MTLLoader();
var onProgress = function (xhr) {

    if (xhr.lengthComputable) {

        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');

    }

};


mtlLoader
    .setPath('./assets/model/indoor-obj/')
    .load('test.mtl', function (materials) {
        materials.preload();
        objLoader.setMaterials(materials)
        objLoader.setPath('./assets/model/indoor-obj/')
        objLoader.load('test.obj', function (object) {
            object.scale.x = object.scale.y = object.scale.z = 100;
            viewer.add(object)
        }, onProgress);

    });
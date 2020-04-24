import { TextureLoader, LoadingManager, MeshStandardMaterial, Mesh, CubeTextureLoader } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"

const textureLoader = new TextureLoader();
const cubeTextureLoader = new CubeTextureLoader()

const loaderClass = {
    "gltf": GLTFLoader,
    "dae": ColladaLoader,
    "obj": OBJLoader,
    "stl": STLLoader
}


const manager = new LoadingManager();
export class Assets {
    static Texture(url, onLoad) {
        return textureLoader.load(url, onLoad);
    }

    static CubeTexture(url, onLoad, format = "png") {
        return cubeTextureLoader
            .setPath(url)
            .load(['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(e => `${e}.${format}`), onLoad);

    }

    static importModel(basicUrl, filename, onLoad, onProgress, onError) {

        var postfix = filename.substr(filename.lastIndexOf(".") + 1);
        var name = filename.substr(0, filename.lastIndexOf("."));
        if (!postfix)
            console.error("文件名有误")

        postfix = postfix.toLowerCase();
        switch (postfix)
        {
            case "obj":
                var mtlLoader = new MTLLoader();
                mtlLoader.setPath(basicUrl);
                mtlLoader.load(name + ".mtl", (materials) => {
                    var loader = new OBJLoader();
                    materials.preload();
                    loader.setMaterials(materials);
                    loader.setPath(basicUrl);
                    loader.load(filename, onLoad, onProgress, onError);
                })
                break;

            case "gltf":
            case "glb":
                var loader = new GLTFLoader();
                loader.setPath(basicUrl);
                loader.load(filename, onLoad, onProgress, onError);
                break;

            case "dae":
                var loader = new ColladaLoader();
                loader.setPath(basicUrl)
                loader.load(filename, onLoad, onProgress, onError);
                break;
            case "stl":
                var loader = new STLLoader();
                loader.setPath(basicUrl);
                loader.load(filename, function (geometry) {

                    var material = new MeshStandardMaterial();
                    var mesh = new Mesh(geometry, material);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    onLoad(mesh)
                }, onProgress, onError);
                break;

            default:
                break;
        }
    }
}
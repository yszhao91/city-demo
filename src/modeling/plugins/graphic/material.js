import { MeshStandardMaterial, MeshBasicMaterial, MeshPhongMaterial, MeshMatcapMaterial, RawShaderMaterial } from "three";
import { ShaderMaterial } from "babylonjs";



export const materials = {
    "standard": (info) => {
        info = { ...info };
        const material = new MeshStandardMaterial(info);
        return material;
    },
    "basic": (info) => {
        info = { ...info };
        const material = new MeshBasicMaterial(info);
        return material
    },
    "phong": (info) => {
        info = { ...info };
        const material = new MeshPhongMaterial(info);
        return material
    },
    "matcap": (info) => {
        info = { ...info };
        const material = new MeshMatcapMaterial(info);
        return material;
    },
    "shader": (info) => {
        info = { ...info };
        const material = new ShaderMaterial(info);
        return material;
    },
    "rawshader": (info) => {
        info = { ...info };
        const material = new RawShaderMaterial(info);
        return material;
    }

}
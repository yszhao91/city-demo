import { CylinderBufferGeo } from "./geometrics/CylinderGeo"
import { Mesh, MeshStandardMaterial, MeshBasicMaterial, MeshPhongMaterial, MeshMatcapMaterial, ShaderMaterial, RawShaderMaterial, Vector3, Texture, LinearFilter } from "three";
import { v3, extrudeToGeometryBuffer, trianglutionToGeometryBuffer, rotateByUnitVectors, translate, extrude } from "xtorcga";
/**
 *
 *var body = Body3d.generate({
 *    key: "",
 *    tall: 20,
 *    thickness: 30, ==0 是一个面， >0 是墙体 <0 是
 *    path: [v3(0, 0, 0), v3(0, 0, 200)],
 *    elevation: 0,
 *    bottom: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    },
 *    top: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    },
 *    left: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    },
 *    right: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    },
 *    front: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    },
 *    back: {
 *        visible: true,
 *        material: {
 *            key: "standard",
 *            color: 0xffffff
 *        }
 *    }
 *})
 *
 *viewer.add(body); 
 */
export const commonTexturePlugin = {
    "texture": (info) => {
        info = {
            offset: { u: 0, v: 0 },
            repeat: { u: 1, v: 1 },
            center: { u: 0, v: 0 },
            rotation: 0,
        }
        var texture = new Texture(image, mapping, wrapS, wrapT, LinearFilter, LinearFilter, format, type, anisotropy, encoding);
        return texture;
    },

    "map": (info) => {

    },
    "normal": (info) => {

    },
    "light": (info) => {

    }
};

export const commonMaterialPlugin = {
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

export const commonGeometryPlugin = {
    "cylinder": (info) => {
        info = {
            ...info,
            mesh: {

            },
            geometry: {
                "key": "cylinder",
                "top.visible": false,
                "side": 50,
                "top.radius": 10,
                "bottom.radius": 10,
                "tall": 10,
                "top.visible": false,
                "bottom.visible": false,
            },

        }
        var topRadius = info.top.radius || info.radius;
        var bottomRadius = info.bottom.radius || info.radius;
        var tall = info.tall;
        var segements = info.tall;
        var topVisible = info.top.visible;
        var bottomVisible = info.bottom.visible;
        var sideVisible = info.side.visible;
        var thetaStart = info.from;
        var thetaLength = info.to;


        var geometry = new CylinderBufferGeo(topRadius, bottomRadius, tall, radialSegments, heightSegments, topVisible, bottomVisible, thetaStart, thetaLength, sideVisible);

        return new Mesh(geometry)
    },

    "extrude": (info) => {
        return extrudeToGeometryBuffer(info.outline, info.path, info.options);
    }
}



export const commonModelPlugin = {
    "mesh": (info) => {
        var geometry = plugin.callPlugin(info.geometry.key, info.geometry)
        var material = plugin.callPlugin(info.material.key, info.material)
        var model = new Mesh(geometry, material)
        return model;
    },
    "basicMesh": (info) => {
        var arrayMeshs = [];
        if (info.thickness >= 0)
        {
            var p0 = new Vector3(info.thickness / 2, info.tall / 2, 0);
            var p1 = new Vector3(-info.thickness / 2, info.tall / 2, 0);
            var p2 = new Vector3(-info.thickness / 2, -info.tall / 2, 0);
            var p3 = new Vector3(info.thickness / 2, -info.tall / 2, 0);

            if (info.top.visible)
            {
                var geometry = plugin.callPlugin({ key: "extrude", outline: [p1, p0], path: info.path, options: { normal: v3(0, 0, 1) } })
                var material = plugin.callPlugin(info.top.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.left.visible)
            {
                var geometry = plugin.callPlugin({ key: "extrude", outline: [p2, p1], path: info.path, options: { normal: v3(0, 0, 1) } })
                var material = plugin.callPlugin(info.left.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.bottom.visible)
            {

                var geometry = plugin.callPlugin({ key: "extrude", outline: [p3, p2], path: info.path, options: { normal: v3(0, 0, 1) } })
                var material = plugin.callPlugin(info.bottom.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.right.visible)
            {
                var geometry = plugin.callPlugin({ key: "extrude", outline: [p0, p3], path: info.path, options: { normal: v3(0, 0, 1) } })
                var material = plugin.callPlugin(info.right.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.front.visible)
            {
                var geometry = trianglutionToGeometryBuffer([p3, p2, p1, p0], [], {})
                var material = plugin.callPlugin(info.front.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.back.visible)
            {
                var backPolygon = rotateByUnitVectors([p0, p1, p2, p3], v3(0, 0, 1), info.path.get(-1).direction, false)
                translate(backPolygon, info.path.get(-1))
                var geometry = trianglutionToGeometryBuffer(backPolygon, [], {})
                var material = plugin.callPlugin(info.front.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

        } else if (info.thickness < 0)
        {
            //地板
            if (info.top.visible)
            {
                var geometry = trianglutionToGeometryBuffer(info.path, [], {})
                var material = plugin.callPlugin(info.material.key, info.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.bottom.visible)
            {
                var geometry = trianglutionToGeometryBuffer(info.path.reverse(), [], {})
                info.path.reverse()
                var material = plugin.callPlugin(info.material.key, info.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.side.visible)
            {
                var geometry = plugin.callPlugin({ key: "extrude", outline: info.path, options: info.options })
                var material = plugin.callPlugin(info.material.key, info.side.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }
        }
        return arrayMeshs;
    }
}

export class PluginManager {
    constructor() {
        this.instance = null;

        this.material = commonGeometryPlugin;
        this.geometry = commonMaterialPlugin;
        this.model = commonModelPlugin;
        this.plugins = { ...commonGeometryPlugin, ...commonMaterialPlugin, ...commonModelPlugin };
    }

    static get Instance() {
        if (!this.instance)
        {
            this.instance = new PluginManager();
        }
        return this.instance;
    }

    callPlugin(info) {
        return this.plugins[info.key](info);
    }

    callPlugin1(key, info) {
        return this.plugins[key](info);
    }

    callPluginEx(key, name, info) {
        return this[key][name](info);
    }

    addPluginEx(pluginType, key, plugin) {
        this.plugins[key] = plugin;
        this[pluginType][key] = plugin;
    }

    removePluginEx(key) {
        this.plugins[key] = null;
        delete this.plugins[key];
        this[key][key] = null;
        delete this[key][key];
    }

    addPlugin(key, plugin) {
        this.plugins[key] = plugin;
    }

    removePlugin(key) {
        this[key] = null;
        delete this[key];
    }
}

export class Cache {
    constructor(size) {
        this.size = size;
        this.data = {};
    }

    static get Instance() {
        if (!this.instance)
        {
            this.instance = new Cache();
        }
        return this.instance;
    }
}

export const plugin = PluginManager.Instance;
export const cache = Cache.Instance;
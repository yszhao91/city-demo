import { Vector3, extrudeToGeometryBuffer, trianglutionToGeometryBuffer, rotateByUnitVectors, v3, translate } from "xtorcga";
import { pluginsInstance } from "../../PluginManager";
import { Mesh } from "three";


export const model = {
    "loadmodel": (info) => {
        //建好的模型导入

    },
    "extrude": (info) => {
        var arrayMeshs = [];
        var pathclosed = info["pathclosed"];
        var shapeclosed = info["shapeclosed"];
        if (info["top.visible"])
        {
            var geometry = trianglutionToGeometryBuffer(info.shape);
            var material = callPlugin(info.material);
            var mesh = new Mesh(geometry, material);
            meshArray.push(mesh);
        }
        if (info["bottom.visible"])
        {
            var geometry = trianglutionToGeometryBuffer(info.shape);
            var material = callPlugin(info.material);
            var mesh = new Mesh(geometry, material);
            meshArray.push(mesh);
        }
        if (info["side.visible"])
        {
            var geometry = extrudeToGeometryBuffer(info.shape, info.path, { close: pathclosed, close1: shapeclosed });
            var material = callPlugin(info.material);
            var mesh = new Mesh(geometry, material);
            meshArray.push(mesh);
        }
        return arrayMeshs;
    },
    "sixplane": (info) => {
        //六面体
        var arrayMeshs = [];
        if (info.thickness >= 0)
        {
            var p0 = new Vector3(info.thickness / 2, info.tall / 2, 0);
            var p1 = new Vector3(-info.thickness / 2, info.tall / 2, 0);
            var p2 = new Vector3(-info.thickness / 2, -info.tall / 2, 0);
            var p3 = new Vector3(info.thickness / 2, -info.tall / 2, 0);

            if (info.top.visible)
            {
                var geometry = extrudeToGeometryBuffer([p1, p0], info.path);
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.top.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.left.visible)
            {
                var geometry = extrudeToGeometryBuffer([p2, p1], info.path);
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.left.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.bottom.visible)
            {
                var geometry = extrudeToGeometryBuffer([p3, p2], info.path);
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.bottom.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.right.visible)
            {
                var geometry = extrudeToGeometryBuffer([p0, p3], info.path);
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.right.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.front.visible)
            {
                var geometry = trianglutionToGeometryBuffer([p3, p2, p1, p0], [], {})
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.front.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

            if (info.back.visible)
            {
                var backPolygon = rotateByUnitVectors([p0, p1, p2, p3], v3(0, 0, 1), info.path.get(-1).direction, false)
                translate(backPolygon, info.path.get(-1))
                var geometry = trianglutionToGeometryBuffer(backPolygon, [], {})
                var material = pluginsInstance.plugins["graphic"].callPlugin(info.front.material)
                var mesh = new Mesh(geometry, material);
                arrayMeshs.push(mesh);
            }

        } else if (info.thickness < 0)
        {
            //地板
            return modelPlugin.extrude(info)
        }
        return arrayMeshs;
    },
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
    "sphere": () => {

    },

    "box": () => {

    },

}
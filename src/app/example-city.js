import "../style/app.css";
import { Viewer } from "../3dview/viewer";
import { AxesHelper, AmbientLight, DirectionalLight, MeshBasicMaterial, MeshMatcapMaterial, Mesh, Group, Vector3, RepeatWrapping } from "three";
import { Assets } from "../3dview/Asset";
import { ShockWave } from "../effector/shockwave";

import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { get } from "../cloud/fetch";
import { toSVGData, parsePathNode } from "../3dview/svgPath";
import * as cga from "xtorcga"
// import * as cga from "../../../../github/xtorcga/src/index"
import { Body3d } from "../3dview/body";
import { v3 } from "xtorcga";
import { extrudeToGeometryBuffer } from "xtorcga";

const docbody = document.body;
const viewer = new Viewer({ container: docbody });
viewer.renderer.toneMappingExposure = 1;
viewer._camera.position.set(0, 0, 1000);
viewer._controls.update();

viewer.run();

viewer.add(new AxesHelper(10000))
viewer.backColor(0x000000)
viewer.add(new AmbientLight(0x888888));
var dirLight = new DirectionalLight();
dirLight.position.set(100, 10, -10)
viewer.add(dirLight);
var dirLight = new DirectionalLight();
dirLight.position.set(-100, 10, -10)
viewer.add(dirLight);
// var dirLight = new DirectionalLight();
// dirLight.position.set(-2, 20, 100)
viewer.add(dirLight);

function update(time) {
    if (mixer)
        mixer.update(time.delta);
}

viewer.addUpdates(update)
var mixer = null;

get("../../assets/data/城市应急场景.json").then(response => {
    if (response.ok)
    {
        return response.json()
    } else
    {

    }
}).then(data => {
    var paths = [data.d[25],
    data.d[26],
    data.d[27]];
    var strs = []
    for (let i = 0; i < paths.length; i++)
    {
        const node = paths[i];
        var pts = node.p.points.__a
        var sgs = node.p.segments.__a
        var str = toSVGData(sgs, pts)
        strs.push(str)
    }


    // var lineMaterial = new LineBasicMaterial({
    //     color: 0xff0000,
    // });
    var roadMaterial = new MeshBasicMaterial({
        transparent: true,
        depthWrite: false
    })


    var roadMap = Assets.Texture("../../assets/model/city/traffic_01.png");
    roadMap.wrapS = RepeatWrapping
    roadMap.wrapT = RepeatWrapping
    roadMap.rotation = Math.PI / 2;
    roadMap.offset.set(0.5, 0.5);
    var roadMap1 = Assets.Texture("../../assets/model/city/traffic_01.png");
    roadMap1.wrapS = RepeatWrapping
    roadMap1.wrapT = RepeatWrapping
    roadMap1.rotation = Math.PI / 2;
    roadMap1.offset.set(0.5, 0.5);
    var roadMap2 = Assets.Texture("../../assets/model/city/traffic_01.png");
    roadMap2.wrapS = RepeatWrapping
    roadMap2.wrapT = RepeatWrapping
    roadMap2.rotation = Math.PI / 2;
    roadMap2.offset.set(0.5, 0.5);

    var roadmats = [roadMaterial, roadMaterial.clone(), roadMaterial.clone()]
    roadmats[0].map = roadMap;
    roadmats[1].map = roadMap1;
    roadmats[2].map = roadMap2;

    var roadGroup = new Group();
    roadGroup.position.set(66.94476, 0, -235.22057);
    var roaddata = [{
        "position": {
            "x": 66.94476,
            "y": -235.22057
        },
        "thickness": 10
    },
    {
        "position": {
            "x": 7.04712,
            "y": -284.96567
        },
        "thickness": 14
    },
    {
        "position": {
            "x": -42.85882,
            "y": -603.58046
        },
        "thickness": 20
    }]

    for (let p = 0; p < strs.length; p++)
    {
        var path = parsePathNode(strs[p])
        var group = new Group();
        group.position.set(roaddata[p].position.x, 0, roaddata[p].position.y)

        for (var j = 0, jl = path.subPaths.length; j < jl; j++)
        {

            var subPath = path.subPaths[j];

            var points = subPath.getPoints();
            var v3ps = [];
            for (let k = 0; k < points.length; k++)
            {
                const p2o = points[k];
                v3ps.push(new Vector3(p2o.x, 0, p2o.y))
            }
            // carPath.splitByFromToDistance(0, 10);
            // var extrudeRes = cga.extrude();

            var geometry = extrudeToGeometryBuffer([cga.v3(-roaddata[p].thickness / 2, 0, 0), cga.v3(roaddata[p].thickness / 2, 0, 0)], v3ps, {
                normal: cga.v3(0, 0, 1),
                isClosed: true,
                sealStart: false,
                sealEnd: false,
                textureScale: new cga.Vector2(1 / roaddata[p].thickness, 1 / 2500)
            })

            var roadMesh = new Mesh(geometry, roadmats[p]);

            group.add(roadMesh);
            group.position.set(-104.29041, 0, -303.55284);
        }
        roadGroup.add(group);
        roadGroup.rotation.y = Math.PI / 2;
    }
    viewer.add(roadGroup)
    viewer.addUpdates(() => {
        roadmats[0].map.offset.x += 0.002
        roadmats[1].map.offset.x += 0.004
        roadmats[2].map.offset.x += 0.008
    })
}).catch(e => {
    console.error(e)
});



var matcapMaterial = new MeshMatcapMaterial({ color: 0xffffff });
matcapMaterial.matcap = Assets.Texture("../../assets/textures/matcaps/biaozhun.jpeg");
matcapMaterial.normalMap = Assets.Texture("../../assets/textures/normals/normal.jpg");
matcapMaterial.normalScale.set(0.4, 0.4);
matcapMaterial.skinning = true;
matcapMaterial.map
const amodels = ["ny1.obj", "ny2.obj", "ny3.obj", "ny4.obj", "ny5.obj", "ny6.obj", "ny7.obj", "ny8.obj"]

var nys = new Group();
window.nys = nys
nys.position.set(6691, 604.35216, 2154.6111);
console.log(nys.position)
viewer.add(nys);
for (let i = 0; i < amodels.length; i++)
{
    Assets.importModel("../../assets/model/city/",
        amodels[i], (model) => {
            nys.add(model)
        }
    );
}


var sw = new ShockWave();

viewer.enablePostProcessing = true;
var bloomPass = viewer.addPassEx("Bloom")

var msaa = new SMAAPass(viewer.width, viewer.height);
viewer.addPass(msaa);

var params = {
    exposure: 1,
    bloomStrength: 0.85,
    bloomThreshold: 0.01,
    bloomRadius: 0.4
};
var gui = new GUI();

gui.add(params, 'exposure', 0.1, 2).onChange(function (value) {

    viewer.renderer.toneMappingExposure = Math.pow(value, 4.0);

});

gui.add(params, 'bloomThreshold', 0.0, 1.0).step(0.01).onChange(function (value) {

    bloomPass.threshold = Number(value);

});

gui.add(params, 'bloomStrength', 0.0, 3.0).step(0.01).onChange(function (value) {

    bloomPass.strength = Number(value);

});

gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {

    bloomPass.radius = Number(value);

});

Assets.importModel("../../assets/model/city/",
    "white_house.obj", () => {
        // viewer.add(model)
    }
);
Assets.importModel("../../assets/model/city/",
    "triangle_01.obj", () => {
        // viewer.add(model)
    }
);

Assets.importModel("../../assets/model/city/",
    "multi_storied_01.obj", (model) => {
        // viewer.add(model)
        model.scale.set(50, 50, 50);
    }

);


// viewer.add(body.renderObject);


var sw = new ShockWave();
viewer.add(sw)

// var cylinerGeo = new CylinderBufferGeo(100, 100, 500, 50, 1, true, true, 0, Math.PI * 0.8, false)
// viewer.add(new Mesh(cylinerGeo, new MeshBasicMaterial({ color: 0x8008ff, })))

// var cylinerGeo = new CylinderBufferGeo(100, 100, 500, 50, 1, true, true, Math.PI * 0.8, Math.PI * 0.8, false)
// viewer.add(new Mesh(cylinerGeo, new MeshBasicMaterial({ color: 0xff080f, })))

// var cylinerGeo = new CylinderBufferGeo(100, 100, 500, 50, 1, true, true, Math.PI * 1.6, Math.PI * 0.4, false)
// viewer.add(new Mesh(cylinerGeo, new MeshBasicMaterial({ color: 0xffffff, })))

// viewer.enablePostProcessing = false;


var body = Body3d.generate({
    key: "",
    tall: 20,
    thickness: 30,
    path: [v3(0, 0, 0), v3(0, 0, 200)],
    elevation: 0,
    bottom: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    top: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    left: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    right: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    front: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    back: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    }
})

viewer.add(body);

var body = Body3d.generate({
    tall: 20,
    thickness: 30,
    path: [v3(0, 0, 0), v3(0, 0, 200), v3(100, 0, 700), v3(300, 0, 900)],
    elevation: 0,
    bottom: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    top: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    left: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    right: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    front: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    },
    back: {
        visible: true,
        material: {
            key: "standard",
            color: 0xffffff
        }
    }
})

// viewer.add(body);
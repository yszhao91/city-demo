import { CylinderBufferGeometry, CylinderGeometry, MeshBasicMaterial, MeshStandardMaterial } from "three";
import { Sequence } from "./sequence";
import { Assets } from "../3dview/Asset";
import { transparentObject } from "../app/transparent";

export class ShockWave extends Sequence {
    constructor(options) {
        super();
        options = {
            mapUrl: "../../assets/model/city/gradual_blue_01.png",
            ...options
        }
        var map = Assets.Texture(options.mapUrl);
        map.repeat.x = 2;
        var geo = new CylinderGeometry(10, 10, 30, 50, 1, true);
        geo.translate(0, 15, 0);

        var material = new MeshStandardMaterial({
            transparent: true,
            map,
            opacity: 1,
        });
        this.renderObject = transparentObject(geo, material);

        this.enableMove = true;
    }

    update(deltaTime) {
        super.update(deltaTime);
        deltaTime.delta = Math.min(1 / 30, deltaTime.delta)

        this.renderObject.scale.x += deltaTime.delta * 20;
        this.renderObject.scale.y += deltaTime.delta * 5;
        this.renderObject.scale.z += deltaTime.delta * 20;
        if (this.renderObject.scale.x > 20)
        {
            this.renderObject.scale.x = 1;
            this.renderObject.scale.y = 1;
            this.renderObject.scale.z = 1;

        }

        // this.renderObject.traverse(m => {
        //     if (m.isMesh)
        //     {
        //         // m.material.opacity -= 0.02
        //         if (this.renderObject.scale.x > 200)
        //         {
        //             m.material.opacity = 1
        //             this.renderObject.scale.x = 1;
        //             this.renderObject.scale.y = 1;
        //             this.renderObject.scale.z = 1;

        //         }

        //     }
        // });
    }
}

import { Sprite, ShaderLib, SpriteMaterial, CanvasTexture } from "three";
import { CanvasUI } from "./canvasui";

export class Label {
    constructor() {
        var cui = new CanvasUI()
        var spriteMaterial = new SpriteMaterial({ depthTest: false, map: new CanvasTexture(cui.el) })
        this.sprite = new Sprite(spriteMaterial)
        this.sprite.scale.set(0.1, 0.1);
        spriteMaterial.sizeAttenuation = false;
        this.sprite.scale.y /= 2;
        // this.sprite.renderOrder = -2;
    }

    appendTo(scene) {
        scene.add(this.sprite);
    }
}
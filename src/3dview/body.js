import { Object3D } from "three";
import { pluginsInstance } from "../modeling/PluginManager"

export class DataModel {
    constructor() {
        this, _datas = [];
    }

    add(...model) {
        this._datas.push(...model)
    }


}

/**
 * 表示一个物体
 */
export class Body3d extends Object3D {
    constructor(info) {
        super();
        this.tag = info.tag || "";
        this.renderObject = new Object3D();
        this.info = info;
        this.info.key = this.info.key || "sixplane";
        this.info.key = this.info.key.length === 0 ? "sixplane" : this.info.key;
        this.create(info);
        this.isBody = true;
    }

    static generate(info) {
        var body = new Body3d(info);
        return body;
    }

    set elevation(value) {
        this.info.elevation = value;
        this.renderObject.position.y = value;
    }

    create(info) {
        info.type = info.type || "graphic"
        this.renderObject.add(...[pluginsInstance.entry(info)].flat(Infinity));
    }

    add(...object) {
        super.add(...object)
        for (let i = 0; i < object.length.length; i++)
        {
            this.renderObject.add(...object.map(m => m.renderObject));
        }
    }

    remove(...object) {
        super.remove(...object)
        for (let i = 0; i < object.length.length; i++)
        {
            this.renderObject.remove(...object.map(m => m.renderObject));
        }
    }


    getObjectByNameTag(value) {
        return this.getObjectByProperty("tag", value)
    }

}
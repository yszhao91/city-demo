import { Plugin } from "./Plugin";
import { model } from "./plugins/graphic/model";
import { materials } from "./plugins/graphic/material";

export class ModelPlugin extends Plugin {
    constructor() {
        super();
        this.name = "model";
        this.plugins = { ...model, ...materials }
    }
}
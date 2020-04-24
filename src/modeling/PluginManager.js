import { ModelPlugin } from "./ModelPlugin";
import { Plugin } from "./Plugin";

export class PluginManager extends Plugin {
    constructor() {
        super();
        this.instance = null;
        this.plugins = {
            "graphic": new ModelPlugin(),
        };
    }


    static get Instance() {
        if (!this.instance)
        {
            this.instance = new PluginManager();
        }
        return this.instance;
    }

    /**
     * 插件消息统一入口
     * @param {Object} info 传入信息 
     */
    entry(info) {
        return this.plugins[info.type].entry(info);
    }



}

export const pluginsInstance = PluginManager.Instance;

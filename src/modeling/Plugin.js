export class Plugin {
    constructor() {
        this.name = "plugin";
        this.plugins = {};
    }

    entry(info) {
        return this.callPluginKey(info.key, info);
    }

    callPlugin(info) {
        return this.plugins[info.key](info);
    }

    callPluginKey(key, info) {
        if (this.plugins[key])
            return this.plugins[key](info);
        else
            console.error("没有相应的插件可调用")
    }

    callPluginEx(key, name, info) {
        return this[key][name](info);
    }

    addPluginEx(key, plugin, pluginType) {
        this.plugins[key] = plugin;
        if (!!pluginType && this[pluginType])
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


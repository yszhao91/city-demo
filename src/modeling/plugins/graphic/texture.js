export const texture = {
    "texture": (info) => {
        info = {
            offset: { u: 0, v: 0 },
            repeat: { u: 1, v: 1 },
            center: { u: 0, v: 0 },
            rotation: 0,
        }
        // var texture = new Texture(image, mapping, wrapS, wrapT, LinearFilter, LinearFilter, format, type, anisotropy, encoding);
        var texture = new Texture();
        return texture;
    },

    "map": (info) => {

    },

    "normal": (info) => {

    },

};
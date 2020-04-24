
export class Sequence {
    constructor() {
        this.isRuning = false;
        this.elpase = 0;
        this.start_end = {};
        this.renderObject = null;
        this.enableMotion = true;
        this.isSequence = true;
    }


    update(deltaTime) {
        this.elpase += deltaTime.delta;
        for (const key in this.start_end)
        {
            var start = this.start_end[key].start;
            var end = this.start_end[key].end;
            var interpolation = this.start_end[key].interpolation;
            var res = interpolation(start, end, this.elpase)
        }
    }

    addSeq(key, start, end, interpolation) {
        this.start_end[key] = { start, end, interpolation }

    }

    start() {

    }

    pause() {

    }

    stop() {

    }



}
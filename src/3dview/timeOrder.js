/**
 * 时序记录 获取运行时间和上一次运行的间隔时间
 */
export class TimeOrder {
    constructor(autoStart = true) {
        this.autoStart = autoStart;

        this.startTime = 0;
        this.oldTime = 0;
        this._elapsedTime = 0;
        this._deltaTime = 0;

        this.running = false;
        this.timer = performance || Data;

        this._time = { delta: 0, elapsed: 0 };

    }

    get deltaElapsed() {
        this._time.delta = this.delta;
        this._time.elapsed = this._elapsedTime;
        return this._time;
    }
    /**
     * 
     */
    get elapsed() {
        this.Delta;
        return this._elapsedTime;
    }

    get delta() {
        if (this.autoStart && !this.running)
        {
            //没有运行 如果允许启动
            this.start();
            return 0;
        }

        if (this.running)
        {
            var newTime = this.timer.now();

            this._deltaTime = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;

            this._elapsedTime += this._deltaTime;
        }

        return this._deltaTime;
    }

    start() {

        this.startTime = this.timer.now();
        this.oldTime = this.startTime;
        this._elapsedTime = 0;
        this.running = true;

    }

    stop() {
        this.getElapsedTime();
        this.running = false;
        this.autoStart = false;

    }

}



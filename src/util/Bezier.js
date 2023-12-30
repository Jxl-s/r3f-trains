export default class Bezier {
    /**
     * Initialize a bezier curve
     * @param {THREE.Vector2} p0 
     * @param {THREE.Vector2} p1 
     * @param {THREE.Vector2} p2 
     * @param {THREE.Vector2} p3 
     */
    constructor(p0, p1, p2, p3) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    /**
     * Get the point on the bezier curve at t
     * @param {number} t The t value, between 0 and 1
     * @returns {x, y} The point on the curve at t
     */
    get(t) {
        const { p0, p1, p2, p3 } = this;
        return {
            x: p0.x * (1 - t) ** 3 + 3 * p1.x * t * (1 - t) ** 2 + 3 * p2.x * t ** 2 * (1 - t) + p3.x * t ** 3,
            y: p0.y * (1 - t) ** 3 + 3 * p1.y * t * (1 - t) ** 2 + 3 * p2.y * t ** 2 * (1 - t) + p3.y * t ** 3
        }
    }

    /**
     * Get the derivative of the bezier curve at t
     * @param {number} t The t value, between 0 and 1
     * @returns {x, y} The derivative of the curve at t
     */
    getDt(t) {
        const { p0, p1, p2, p3 } = this;
        return {
            x: 3 * (p1.x - p0.x) * (1 - t) ** 2 + 6 * (p2.x - p1.x) * t * (1 - t) + 3 * (p3.x - p2.x) * t ** 2,
            y: 3 * (p1.y - p0.y) * (1 - t) ** 2 + 6 * (p2.y - p1.y) * t * (1 - t) + 3 * (p3.y - p2.y) * t ** 2
        }
    }
}
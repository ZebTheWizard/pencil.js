import test from "ava";
import Position from "@pencil.js/position";
import Path from "./path.js";

test.beforeEach((t) => {
    t.context = new Path([10, 20], [
        Path.lineTo([100, 100]),
        Path.arcTo([200, 200]),
    ], false);
});

test("constructor", (t) => {
    t.is(t.context.instructions.length, 2);
    t.false(t.context.isClosed);
    t.truthy(t.context.closing);
});

test("trace closed", (t) => {
    t.context.isClosed = true;
    const ctx = {
        moveTo: (...params) => t.deepEqual(params, [200, 200]),
        lineTo: () => t.pass(),
        bezierCurveTo: () => t.pass(),
    };
    t.plan(5);
    t.context.trace(ctx);
});

test("trace not closed", (t) => {
    const ctx = {
        moveTo: (...params) => t.deepEqual(params, [0, 0]),
        lineTo: () => t.pass(),
        bezierCurveTo: () => t.pass(),
    };
    t.plan(3);
    t.context.trace(ctx);
});

test("trace instructions string", (t) => {
    const path = new Path([10, 20], "C 40 10, 65 10, 95 80 S 150 150, 180 80");
    const ctx = {
        addPath: () => t.pass(),
    };
    global.Path2D = class Path2D {
        /**
         * @param {String} string -
         */
        constructor (string) {
            t.is(string, "M0 0 C 40 10, 65 10, 95 80 S 150 150, 180 80 Z");
        }
    };
    path.trace(ctx);
});

test("isHover", (t) => {
    t.context.trace = () => {};
    const ctx = new window.CanvasRenderingContext2D();
    ctx.isPointInPath = () => t.fail();
    ctx.isPointInStroke = () => true;
    t.true(t.context.isHover([0, 0], ctx));
});

test("toJSON", (t) => {
    t.throws(() => {
        JSON.stringify(t.context);
    });
});

test("from", (t) => {
    const definition = {
        instructions: [{}],
    };
    t.throws(() => {
        Path.from(definition);
    });
});

test("lineTo", (t) => {
    const ctx = {
        lineTo: (...args) => t.deepEqual(args, [100, 200]),
    };
    const instruction = Path.lineTo([100, 200]);
    instruction.execute(ctx);
});

test("moveTo", (t) => {
    const ctx = {
        moveTo: (...args) => t.deepEqual(args, [100, 200]),
    };
    const instruction = Path.moveTo([100, 200]);
    instruction.execute(ctx);
});

test("quarterTo halfTo arcTo bezierTo", (t) => {
    const ctx = {
        bezierCurveTo: (ctr1x, ctr1y, ctr2x, ctr2y, x, y) => t.true(x === 100 && y === 200),
    };
    t.plan(4);
    [
        Path.quarterTo([100, 200]),
        Path.halfTo([100, 200]),
        Path.arcTo([100, 200]),
        Path.bezierTo([100, 200], [1, 2], [10, 20]),
    ].forEach(instruction => instruction.execute(ctx, new Position()));
});

test("quadTo", (t) => {
    const ctx = {
        quadraticCurveTo: () => t.pass(),
    };
    const instruction = Path.quadTo([100, 200]);
    instruction.execute(ctx);
});

test("splineThrough", (t) => {
    const points = [
        [10, 20],
        [30, 40],
        [1, 2],
    ];
    let i = 0;
    const ctx = {
        bezierCurveTo: (ctr1x, ctr1y, ctr2x, ctr2y, x, y) => {
            t.is(x, points[i][0]);
            t.is(y, points[i][1]);
            i++;
        },
    };
    t.plan(6);
    const instruction = Path.splineThrough(points, 0.5);
    instruction.execute(ctx);
});

test("waveTo", (t) => {
    t.throws(() => Path.waveTo([0, 0], 3));
});

test("sinTo", (t) => {
    t.throws(() => Path.sinTo([0, 0], 3));
});

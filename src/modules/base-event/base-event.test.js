import test from "ava";
import BaseEvent from "./base-event.js";

test.beforeEach((t) => {
    t.context = new BaseEvent("name", null);
});

test("constructor", (t) => {
    t.is(t.context.target, null);
    t.is(t.context.name, "name");
    t.is(t.context.bubble, true);
});

test("stop", (t) => {
    t.context.stop();
    t.is(t.context.bubble, false);
});

test("getModifier", (t) => {
    t.is(t.context.getModifier(), null);
});

test("prevent", (t) => {
    t.context.event = {
        preventDefault () {
            t.pass();
        },
    };

    t.plan(2);
    t.is(t.context.prevent(), t.context);
});

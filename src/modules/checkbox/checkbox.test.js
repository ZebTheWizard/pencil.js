import test from "ava";
import Checkbox from "./checkbox.js";

test.beforeEach((t) => {
    t.context = new Checkbox([100, 100]);
});

test("constructor", (t) => {
    t.is(!!t.context.fill.options.shown, !!t.context.options.value);
});

test("get and set width and height", (t) => {
    t.is(t.context.width, 20);
    t.is(t.context.height, 20);

    t.context.width = 30;
    t.is(t.context.width, 30);
    t.is(t.context.height, 30);

    t.context.height = 40;
    t.is(t.context.width, 40);
    t.is(t.context.height, 40);
});

test("click and toggle", (t) => {
    t.context.value = true;
    t.context.click();
    t.false(t.context.value, "should toggle");
    t.context.click();
    t.true(t.context.value, "should toggle again");

    t.context.toggle();
    t.false(t.context.value, "invert value");
    t.context.toggle();
    t.true(t.context.value, "invert value again");

    t.context.toggle(true);
    t.true(t.context.value, "force to true");
    t.context.toggle(false);
    t.false(t.context.value, "force to false");
});

test("get and set value", (t) => {
    t.is(t.context.value, !!t.context.fill.options.shown);
    t.context.value = true;
    t.true(t.context.fill.options.shown);
    t.context.value = false;
    t.false(t.context.fill.options.shown);
});

test("defaultOptions", (t) => {
    const options = Checkbox.defaultOptions;
    t.is(options.size, 20);
});

test("MARGIN", (t) => {
    t.is(Checkbox.MARGIN, 0.2);
});

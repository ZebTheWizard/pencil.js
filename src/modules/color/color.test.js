import test from "ava";
import Color from ".";

test("Object constructor", (t) => {
    const origin = new Color(0.5, 0.4, 0.3, 0.2);
    const fromObject = new Color(origin);
    t.is(fromObject.red, 0.5);
    t.is(fromObject.green, 0.4);
    t.is(fromObject.blue, 0.3);
    t.is(fromObject.alpha, 0.2);
    t.false(origin === fromObject);
});

test("Object constructor default", (t) => {
    const defaultColor = new Color();
    t.is(defaultColor.red, 0);
    t.is(defaultColor.green, 0);
    t.is(defaultColor.blue, 0);
    t.is(defaultColor.alpha, 1);
});

test("Object constructor all 0", (t) => {
    const defaultColorHex = new Color("#000000", 0);
    t.is(defaultColorHex.red, 0);
    t.is(defaultColorHex.green, 0);
    t.is(defaultColorHex.blue, 0);
    t.is(defaultColorHex.alpha, 0);
    const defaultColorRGB = new Color(0, 0, 0, 0);
    t.is(defaultColorRGB.red, 0);
    t.is(defaultColorRGB.green, 0);
    t.is(defaultColorRGB.blue, 0);
    t.is(defaultColorRGB.alpha, 0);
});

test("hex constructor", (t) => {
    const fromHex = new Color(0x3300ff + 0.9);
    t.is(fromHex.red, 0.2);
    t.is(fromHex.green, 0);
    t.is(fromHex.blue, 1);
    t.is(fromHex.alpha, 1);
});

test("hex string constructor", (t) => {
    const fromHex = new Color("#3300FF");
    t.is(fromHex.red, 0.2);
    t.is(fromHex.green, 0);
    t.is(fromHex.blue, 1);
    t.is(fromHex.alpha, 1);
});

test("hex short string constructor", (t) => {
    const fromHex = new Color("#30f");
    t.is(fromHex.red, 0.2);
    t.is(fromHex.green, 0);
    t.is(fromHex.blue, 1);
    t.is(fromHex.alpha, 1);
});

test("name string constructor", (t) => {
    const fromName = new Color("rebeccapurple", 0.5);
    t.is(fromName.red, 0.4);
    t.is(fromName.green, 0.2);
    t.is(fromName.blue, 0.6);
    t.is(fromName.alpha, 0.5);
});

test("rgba constructor", (t) => {
    const fromRGBA = new Color(-6, 2, 0.5, 0.1);
    t.is(fromRGBA.red, 0);
    t.is(fromRGBA.green, 1);
    t.is(fromRGBA.blue, 0.5);
    t.is(fromRGBA.alpha, 0.1);
});

test("get and set channels", (t) => {
    const color = new Color(0.1, 0.2, 0.3, 0.4);

    t.is(color.red, 0.1);
    t.is(color.green, 0.2);
    t.is(color.blue, 0.3);
    t.is(color.alpha, 0.4);

    color.red = 0.9;
    color.green = 0.8;
    color.blue = 0.7;
    color.alpha = 0.6;

    t.is(color.red, 0.9);
    t.is(color.green, 0.8);
    t.is(color.blue, 0.7);
    t.is(color.alpha, 0.6);
});

test("clone", (t) => {
    const origin = new Color(0.1, 0.2, 0.3, 0.4);
    const clone = origin.clone();
    t.not(clone, origin);
    t.deepEqual(clone, origin);
});

test("get hex and rgb", (t) => {
    const color = new Color("#0066ff", 0.5);
    t.is(color.hex, "#0066ff80");
    t.is(color.rgb, "#0066ff80");
});

test("get name", (t) => {
    const color = new Color("#ff0000");
    t.is(color.name, "red");
    const colorApprox = new Color("#fe0000");
    t.is(colorApprox.name, "red");
});

test("grey", (t) => {
    const color = (new Color("blue")).grey();
    t.is(color.red, color.blue);
    t.is(color.red, color.green);
});

test("hue", (t) => {
    t.is((new Color(1, 0, 0)).hue(0).rgb, "#ff0000");
    t.is((new Color(1, 0, 0)).hue(0.25).rgb, "#80ff00");
    t.is((new Color(1, 0, 0)).hue(0.5).rgb, "#00ffff");
    t.is((new Color(1, 0, 0)).hue(0.75).rgb, "#8000ff");
    t.is((new Color(1, 0, 0)).hue(1).rgb, "#ff0000");
});

test("saturation", (t) => {
    t.is((new Color(1, 0, 0.2)).saturation(1).rgb, "#ff0033");
    t.is((new Color(1, 0, 0.2)).saturation(0.5).rgb, "#bf4059");
    t.is((new Color(1, 0, 0.2)).saturation(0.25).rgb, "#9f606c");
    t.is((new Color(1, 0, 0.2)).saturation(0).rgb, "#808080");
});

test("lightness", (t) => {
    t.is((new Color(1, 0, 0)).lightness(0).rgb, "#000000");
    t.is((new Color(1, 0, 0)).lightness(1).rgb, "#ffffff");
    t.is((new Color(1, 0, 0)).lightness(0.5).rgb, "#ff0000");
    t.is((new Color(1, 0, 0)).lightness(0.75).rgb, "#ff8080");
});

test("reverse", (t) => {
    t.is((new Color("#ff0000")).reverse().rgb, "#00ffff");
    t.is((new Color("#3311aa")).reverse().rgb, "#ccee55");
});

test("level", (t) => {
    t.is((new Color("#f08806")).level(1).rgb, "#808080");
    t.is((new Color("#f08806")).level(4).rgb, "#df9f20");
});

test("lerp", (t) => {
    t.is((new Color(1, 0, 0.2)).lerp(new Color(0, 0.8, 1, 0.6), 0).rgb, "#ff0033");
    t.is((new Color(1, 0, 0.2)).lerp(new Color(0, 0.8, 1, 0.6), 1).rgb, "#00ccff99");
});

test("toString", (t) => {
    const color = new Color(1, 0.5, 0);
    t.is(`${color}`, "#ff8000");
    const colorAlpha = new Color(1, 0.5, 0, 0.5);
    t.is(`${colorAlpha}`, "#ff800080");
});

test("toJSON", (t) => {
    const color = new Color(1, 0.1, 0, 0.5);
    t.deepEqual(color.toJSON(), [1, 0.1, 0, 0.5]);
});

test("from", (t) => {
    const color = Color.from(1, 0.1, 0, 0.5);
    t.is(color.red, 1);
    t.is(color.green, 0.1);
    t.is(color.blue, 0);
    t.is(color.alpha, 0.5);

    const reference = Color.from(color);
    t.true(reference === color);

    const other = Color.from(0xff0066);
    t.is(other.red, 1);
    t.is(other.green, 0);
    t.is(other.blue, 0.4);

    const fromStr = Color.from("fail");
    t.is(fromStr.red, 0);
    t.is(fromStr.green, 0);
    t.is(fromStr.blue, 0);
});

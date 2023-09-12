import test from "ava";
import NetworkEvent from "./network-event.js";

test("events", (t) => {
    t.is(typeof NetworkEvent.events.ready, "string");
    t.is(typeof NetworkEvent.events.error, "string");
});

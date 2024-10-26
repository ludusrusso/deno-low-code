import { assertEquals } from "jsr:@std/assert";
import { describe, test } from "jsr:@std/testing/bdd";
import { z } from "npm:zod";
import { VM } from "../vm/vm.ts";

describe("VM", () => {
  describe("function execute(x) { return x+1; }", () => {
    const vm = new VM(z.number(), "execute");
    const fn = `function execute(x) { return x+1; }`;

    const cases: { args: any[]; expected: any }[] = [
      { args: [10], expected: 11 },
      { args: [14], expected: 15 },
      { args: [-1], expected: 0 },
    ];

    for (const { args, expected } of cases) {
      test(`execute ${args} should return ${expected}`, async () => {
        const res = await vm.execute(fn, ...args);
        assertEquals(res, expected);
      });
    }
  });
});

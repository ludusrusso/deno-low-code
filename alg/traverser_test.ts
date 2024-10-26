import { assertEquals } from "jsr:@std/assert";
import { describe, test } from "jsr:@std/testing/bdd";
import { z } from "npm:zod";
import { execGraph } from "./traverser.ts";
import { Graph } from "./types.ts";

describe("Alg/Traverser", () => {
  const graph: Graph = {
    nodes: [
      {
        id: "start",
        code: `
          function execute() { 
            return { ctx: { a: 2 }, next: "next" }; 
          }`,
        targets: ["next"],
      },
      {
        id: "2",
        code: `
          function execute(prev: {a: number}) {  
            return { ctx: { a: 2 * prev.a, b: 'test' } }; 
          }`,
        targets: [],
      },
    ],
    edges: [
      {
        id: "start-2",
        source: "next",
        from: "start",
        to: "2",
      },
    ],
  };

  describe("execGraph", () => {
    test("should return the next node id", async () => {
      const schema = z.record(z.string(), z.any());
      const res = await execGraph(graph, schema, {});
      assertEquals(res, { a: 4, b: "test" });
    });
  });
});

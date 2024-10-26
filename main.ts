import { execGraph } from "./alg/traverser.ts";
import type { Graph } from "./alg/types.ts";
import { VM } from "./vm/vm.ts";
import { z } from "npm:zod";

const vm = new VM(z.number(), "execute");

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

// Example usage
if (import.meta.main) {
  const res = await execGraph(graph, z.record(z.string(), z.any()), {});
  console.log(res);
}

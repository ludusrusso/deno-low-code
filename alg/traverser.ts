import { z } from "npm:zod";
import { VM } from "../vm/mod.ts";
import { Graph, Node } from "./types.ts";

export function execGraph<Schema extends z.Schema, Ctx = z.output<Schema>>(
  graph: Graph,
  schema: Schema,
  initialCtx: z.input<Schema>
): Promise<Ctx> {
  const traverser = new GraphExecutorTraverser(graph, schema, initialCtx);
  return traverser.run();
}

class GraphExecutorTraverser<Schema extends z.Schema> {
  constructor(
    private readonly graph: Graph,
    private readonly schema: Schema,
    private context: z.input<Schema>
  ) {}

  async run(): Promise<z.output<Schema>> {
    const schema = z.object({ next: z.string().optional(), ctx: this.schema });
    const vm = new VM(schema);

    const start = this.graph.nodes.find((n) => n.id === "start");
    if (!start) {
      throw new Error("Start node not found");
    }

    let node = start;
    while (true) {
      const { next, ctx } = await vm.execute(node.code, this.context);
      this.context = { ...this.context, ...ctx };
      if (!next) break;

      node = await this.findNext(start, next);
    }

    return this.context;
  }

  private async findNext(node: Node, next: string) {
    const edge = this.graph.edges.find(
      (e) => e.from === node.id && e.source === next
    );

    if (!edge) {
      throw new Error(`Edge ${next} not found`);
    }

    const nextNode = this.graph.nodes.find((n) => n.id === edge.to);
    if (!nextNode) {
      throw new Error(`Next node ${edge.to} not found`);
    }

    return nextNode;
  }
}

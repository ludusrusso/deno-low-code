import { z } from "npm:zod";
import vm from "node:vm";
import ts from "npm:typescript";

export class VM<Schema extends z.Schema, Output = z.output<Schema>> {
  constructor(private parser: Schema, private fnName: string = "execute") {}

  async execute(code: string, ...args: any[]): Promise<Output> {
    const compiled = ts.transpile(code);
    const script = new vm.Script(compiled);
    const context = vm.createContext({});
    script.runInContext(context);

    const fn = context.execute;
    if (!fn || typeof fn !== "function") {
      throw new Error(`function "${this.fnName}" not found`);
    }

    const res = await fn(...args);

    const parsed = this.parser.safeParse(res);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  }
}

import { VM } from "./vm/vm.ts";
import { z } from "npm:zod";

const vm = new VM(z.number(), "execute");

// Example usage
if (import.meta.main) {
  const res = await vm.execute(
    `function execute(x) { 
      return x+1;
    }`,
    10
  );

  console.log(res);
}

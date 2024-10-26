# deno low code executor

[![Open Source Saturday](https://img.shields.io/badge/%E2%9D%A4%EF%B8%8F-open%20source%20saturday-F64060.svg)](https://www.meetup.com/it-IT/Open-Source-Saturday-Milano/)


## Usage

```ts
import { execGraph } from "./alg/traverser.ts";
import { Graph } from "./alg/types.ts";
import { z } from "npm:zod";

const graph: Graph = ...;
const schema = z.record(z.string(), z.any());
const res = await execGraph(graph, schema, {});
```

```bash
$ deno run --allow-run main.ts
# output { a: 4, b: 'test' }
```

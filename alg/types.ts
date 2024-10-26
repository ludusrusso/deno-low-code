export type Context = Record<string, any>;

export type Edge = {
  id: string;
  source: string;
  from: string;
  to: string;
};

export type Node = {
  id: string;
  code: string;
  targets: string[];
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

export type Item = {
  id: string;
  name: string;
  category: string;
  batches: Array<{ quantity: number; unit: string; expiry: string }>;
};

export type Items = Record<Item["id"], Item>;

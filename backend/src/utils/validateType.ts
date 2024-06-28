import { Context } from "hono";

type Types =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

type comparable = {
  key: string;
  type: Types;
  tryConvert?: (value: any) => any;
  isArray?: true;
};

export default (
  values: Record<string, string | File>,
  c: Context<any, string, {}>,
  comparables: comparable[]
) => {
  const data: Record<string, any> = {};

  for (const { key, type, tryConvert, isArray } of comparables) {
    const name = isArray ? `${key}[]` : key;
    const value = values[name];

    if (!value) {
      return c.text(`${key} is not provided.`, 400);
    }

    if (typeof value === type) {
      data[key] = value;
      continue;
    }

    if (isArray) {
      if (typeof data[key] === "undefined") data[key] = [];
      data[key] = [...(data[key] as string[]), value];
      continue;
    }

    if (tryConvert) {
      const convertedValue = tryConvert(value);

      if (convertedValue && typeof convertedValue === type) {
        data[key] = convertedValue;
        continue;
      }
    }

    return c.text(`${key} is not a ${type}`, 400);
  }

  return data;
};

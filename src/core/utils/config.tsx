import { RootState, useSelector } from "../store";
import { addConfigEntries } from "../config.slice";
import withSuffix from "./withSuffix";
import serviceArgs from "../storybook/serviceUrlArgs";

function config(key: string): string;

function config<T>(
  key: string,
  options: {
    transformer: "jsonParse";
  }
): T;

function config(
  key: string,
  options: {
    transformer: "stringToArray";
  }
): string[];

function config(
  key: string,
  options: {
    transformer: "stringToNumber";
  }
): number;

function config<T>(key: string): T;

function config<T>(): T | string | string[] {
  return [];
}

export type UseConfigFunction = typeof config;

export const useConfig = (): UseConfigFunction => {
  const { data } = useSelector((state: RootState) => state.config);

  return (
    key: string,
    options?: {
      transformer?: "jsonParse" | "stringToArray" | "stringToNumber";
    }
  ) => {
    if (typeof data[key] !== "string") {
      throw new Error(`Config entry "${key}" is not defined.`);
    }
    if (options?.transformer === "jsonParse") {
      return JSON.parse(data[key]);
    }
    if (options?.transformer === "stringToArray") {
      return data[key].split(",");
    }
    if (options?.transformer === "stringToNumber") {
      return Number(data[key]);
    }
    return data?.[key];
  };
};

export const withConfig = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return withSuffix(Component, "Config", addConfigEntries);
};

export default {};

if (typeof window === "object" && serviceArgs.developmentOptions === "true") {
  const extendedCovers = "cover.detail";
  const extendedFields = {
    description: {
      Type: {
        data: ["marc:001.a", "marc:001.c"],
        insert: "prepend"
      },
      Emnetal: {
        data: ["marc:088.a"],
        insert: "replace",
        url: "/search?q=${tag}"
      },
      "Skøn-/faglitteratur": {
        hidden: true
      },
      Emneord: {
        data: ["marc:631.a"],
        insert:"prepend",
        url:"/search?q=${tag}"
      }
    },
    detail: {
      Type: {
        data: ["marc:001.a", "marc:001.c"],
        insert: "prepend"
      },
      Stemmer: {
        data: ["marc:509.a"]
      },
      "Stemmer forkortet": {
        data: ["marc:509.b"]
      },
      Indhold: {
        data: ["marc:795.a","marc:530.a"],
        type: "list",
        insert:"fallback"
      }
    }
  };

  document.body.setAttribute("data-eonext-ext-covers", extendedCovers);
  document.body.setAttribute("data-eonext-ext-fields", JSON.stringify(extendedFields));
}

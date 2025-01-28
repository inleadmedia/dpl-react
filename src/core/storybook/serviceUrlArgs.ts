import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

export const argTypes = {
  [serviceUrlKeys.fbs]: {
    description: "Base url for the FBS API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://fbs-openplatform.dbc.dk"
      }
    }
  },
  [serviceUrlKeys.publizon]: {
    description: "Base url for the Publizon API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://pubhub-openplatform.dbc.dk"
      }
    }
  },
  [serviceUrlKeys.wayfinder]: {
    name: "Base url for the Wayfinder API (global inventory)",
    defaultValue: process.env.WAYFINDER_BASEURL,
    control: { type: "text" }
  },
  [serviceUrlKeys.dplCms]: {
    description: "Base url for the DPL CMS API",
    defaultValue: "https://dpl-cms.inlead.dev",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://dpl-cms.docker"
      }
    }
  },
  [serviceUrlKeys.cover]: {
    description: "Base url for the cover service",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: process.env.COVERS_BASEURL ?? "https://cover.dandigbib.org"
      }
    }
  },
  [serviceUrlKeys.materialList]: {
    description: "Base url for the material list service",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://prod.materiallist.dandigbib.org"
      }
    }
  },
  [serviceUrlKeys.fbi]: {
    description: "Base url for the FBI API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          process.env.GRAPHQL_API_BASEURL ??
          "https://temp.fbi-api.dbc.dk/next-present/graphql"
      }
    }
  },
  [serviceUrlKeys.fbiLocal]: {
    description: "Base url for the FBI API (local inventory)",
    defaultValue: "https://fbi-api.dbc.dk/opac/graphql",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          process.env.GRAPHQL_API_BASEURL ??
          "https://temp.fbi-api.dbc.dk/next/graphql"
      }
    }
  },
  [serviceUrlKeys.fbiGlobal]: {
    description: "Base url for the FBI API (global inventory)",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          process.env.GRAPHQL_API_BASEURL ??
          "https://temp.fbi-api.dbc.dk/next-present/graphql"
      }
    }
  }
};

const envOptions = {
  [serviceUrlKeys.fbs]:
    process.env.FBS_BASEURL ?? "https://fbs-openplatform.dbc.dk",
  [serviceUrlKeys.publizon]:
    process.env.PUBLIZON_BASEURL ?? "https://pubhub-openplatform.dbc.dk",
  [serviceUrlKeys.dplCms]: process.env.CMS_BASEURL ?? "https://dpl-cms.docker",
  [serviceUrlKeys.cover]:
    process.env.COVERS_BASEURL ?? "https://cover.dandigbib.org",
  [serviceUrlKeys.materialList]: "https://prod.materiallist.dandigbib.org",
  [serviceUrlKeys.fbi]:
    process.env.GRAPHQL_API_BASEURL ??
    "https://temp.fbi-api.dbc.dk/next-present/graphql",
  [serviceUrlKeys.fbiLocal]:
    process.env.GRAPHQL_API_BASEURL ??
    "https://temp.fbi-api.dbc.dk/next/graphql",
  [serviceUrlKeys.fbiGlobal]:
    process.env.GRAPHQL_API_BASEURL ??
    "https://temp.fbi-api.dbc.dk/next-present/graphql",
  developmentOptions: process.env.USE_DEVELOPMENT_OPTIONS
};

export default envOptions;

if (typeof window === "object" && process.env.USE_DEVELOPMENT_OPTIONS === "true") {
  const extendedCovers = "cover.detail";
  const extendedFields = {
    additionalDescription: {
      label: "Additional description",
      body: ["marc:504.a"],
      tags: [{
        label: "Custom tags",
        data: ["marc:001.a", "marc:001.c"],
        url:"/search?q=${tag}"
      }]
    },
    aliases: {
      Subject: ["Tags"],
      Spog: ["Language"]
    },
    description: {
      Subject: {
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
      Spog: {
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

  const complexSearch = {
    terms: [{ label: "Marc 088a", term: "localclassification" }]
  };

  document.body.setAttribute("data-eonext-ext-covers", extendedCovers);
  document.body.setAttribute("data-eonext-ext-fields", JSON.stringify(extendedFields));
  document.body.setAttribute("data-eonext-ext-complex-search", JSON.stringify(complexSearch));

  const translationControls = "google_translate, drupal_translate";
  //const translationControls = "drupal_translate";
  const translationLanguages = {
    da: {
      name: "Danish",
      path:"/da/frontpage"
    },
    kl: {
      name: "Greenlandic",
      path: "/kl/frontpage"
    }
  };

  document.body.setAttribute("data-eonext-translation-type", translationControls);
  document.body.setAttribute("data-eonext-translation-languages", JSON.stringify(translationLanguages));

  const showSearchBranchSelection = "true";
  const branchesConfig = [{
    branchId:"DK-830630",
    title:"Aalborg"
  },{
    branchId:"DK-830480",
    title:"Aarhus"
  }];
  const blacklistedSearchBranches = "DK-830480";

  document.body.setAttribute("data-show-search-branch-selection", showSearchBranchSelection);
  document.body.setAttribute("data-branches-config", JSON.stringify(branchesConfig));
  document.body.setAttribute("data-blacklisted-search-branches-config", blacklistedSearchBranches);
}

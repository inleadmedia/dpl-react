import lodash, { first } from "lodash";
import {
  CoverImageUrls,
  Cover as CoverType
} from "../../core/cover-service-api/model";
import { Manifestation } from "../../core/utils/types/entities";

type CoverServiceSizes = keyof CoverImageUrls;
type CoverData = CoverType[] | null | undefined;

const getUrl = (cover: CoverType, size: CoverServiceSizes) =>
  cover.imageUrls?.[size]?.url;

const coverDataRemoveEmptyCovers = ({
  coverData,
  size
}: {
  coverData: CoverData;
  size: CoverServiceSizes;
}) => {
  if (!coverData) {
    return [];
  }

  return coverData.filter((cover: CoverType) => {
    return getUrl(cover, size);
  });
};

export const getCoverUrl = ({
  coverData,
  bestRepresentation,
  size
}: {
  coverData: CoverType[] | null | undefined;
  bestRepresentation?: Manifestation;
  size: CoverServiceSizes;
}) => {
  // @ts-ignore-next-line
  let _customCoverField: string = document.querySelector('[data-eonext-ext-covers]')?.getAttribute("data-eonext-ext-covers") || "";
  if (_customCoverField) {
    let coverUrl = lodash.get(bestRepresentation, _customCoverField);
    if (coverUrl)
      return coverUrl;
  }

  if (!coverData) {
    return null;
  }

  // Make sure we only have covers in our data that has a url in the given size.
  const covers = coverDataRemoveEmptyCovers({ coverData, size });
  // Get the first cover which we can use as a fallback cover.
  const firstCover = first(covers);

  // If no best representation has been given use first cover if available.
  if (!bestRepresentation && firstCover && getUrl(firstCover, size)) {
    return getUrl(firstCover, size);
  }

  // See if we can find a cover that has same id as the best representation id.
  const bestRepresentationCover = first(
    covers.filter(
      (cover: CoverType) =>
        bestRepresentation && cover.id === bestRepresentation.pid
    )
  );

  // If we have a best representation cover in the given size use that.
  if (bestRepresentationCover && getUrl(bestRepresentationCover, size)) {
    return getUrl(bestRepresentationCover, size);
  }

  // If the best representation method failed we try the first cover.
  if (firstCover && getUrl(firstCover, size)) {
    return getUrl(firstCover, size);
  }

  // Everything else failed. We don't know what to do 🤷.
  return null;
};

export default {};

// ************** VITEST ***************
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const coverData = [
    {
      id: "1-somestring:2",
      imageUrls: {
        small: {
          url: "url1"
        },
        large: {
          url: null
        }
      }
    },
    {
      id: "3-somestring:4",
      imageUrls: {
        small: {
          url: "url2"
        }
      }
    },
    {
      id: "4-somestring:5",
      imageUrls: {
        small: {
          url: null
        }
      }
    }
  ];

  describe("Testing getCoverUrl function with no best representation given", () => {
    it("Should show first cover if cover is available in size given", () => {
      const url = getCoverUrl({
        coverData,
        size: "small"
      });
      expect(url).toBe("url1");
    });

    it("Should return null if the size is available but the url is null", () => {
      const url = getCoverUrl({
        coverData,
        size: "large"
      });
      expect(url).toBeNull();
    });

    it("Should return null if the size does not exist", () => {
      const url = getCoverUrl({
        coverData,
        size: "medium"
      });
      expect(url).toBe(null);
    });
    it("Should return null if there are no covvers in data", () => {
      const url = getCoverUrl({
        coverData: [],
        size: "small"
      });
      expect(url).toBeNull();
    });
  });

  describe("Testing getCoverUrl function with a best representation given", () => {
    it("Should show the best representation cover if size matches", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "3-somestring:4"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url2");
    });
    it("Should show the first cover if size matches the best representation cover but url is null", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "4-somestring:5"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url1");
    });
    it("Should show the first cover if size matches the best representation cover but url is null", () => {
      type GetCoverUrlParams = Parameters<typeof getCoverUrl>[0];
      const bestRepresentation = {
        genreAndForm: ["Book"],
        pid: "4-somestring:5"
      };

      const url = getCoverUrl({
        coverData,
        size: "small",
        bestRepresentation
      } as GetCoverUrlParams);
      expect(url).toBe("url1");
    });
  });
}

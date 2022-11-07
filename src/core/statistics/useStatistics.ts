// Useful resources for Mapp tracking:
// https://documentation.mapp.com/1.0/en/manual-track-request-25105181.html
// https://documentation.mapp.com/1.0/en/how-to-send-manual-tracking-requests-page-updates-7240681.html

export type CustomClickParameter = {
  [key: number]: number | { [key: number]: string };
};

export type EventData = {
  linkId: string;
  customClickParameter: CustomClickParameter;
};

// 1. page - when a page request is simulated
// 2. click - for measuring actions that don't cause page load;
// 3. link - clicking a link that triggers a new page load
// 4. pageupdate - information on the page changes without a new page load
type EventType = "page" | "click" | "link" | "pageupdate";

export function useStatistics(eventType: EventType) {
  // If the global wts object doesn't exist, it means we are in dev environment.
  // Here instead of actually tracking we just log the data to the console.
  if (!window.wts) {
    window.wts = {
      push(trackingProps: ["send", EventType, EventData]) {
        // eslint-disable-next-line no-console
        console.log(
          `Tracking: ${trackingProps[0]}, ${trackingProps[1]}, ${JSON.stringify(
            trackingProps[2]
          )}`
        );
      }
    };
  }

  return {
    track: (
      id: number,
      name: string,
      trackedData: string | number | string[]
    ) => {
      const eventData: EventData = {
        linkId: name,
        customClickParameter: {}
      };
      eventData.customClickParameter[id] = trackedData;
      window.wts.push(["send", eventType, eventData]);
    }
  };
}

export default {};

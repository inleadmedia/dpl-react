import React, { useEffect, useState } from "react";
import { withText } from "../../core/utils/text";
import "./demo-wayfinder.scss";
import getWayfinder from "../../components/find-on-shelf/getWayfinder";
import Wayfinder from "../../components/wayfinder/wayfinder";
import {
  HoldingDataInterface,
  WayfinderReaponse
} from "../../components/wayfinder/wayfinder-types";

const mockBranchIds = {
  branchId: "DK-733000",
  departmentId: "vok",
  locationId: "udlån",
  subLocationId: "kær"
};

const DemoWayfinder: React.FC = () => {
  const [wayfinderLink, setWayfinderLink] = useState<WayfinderReaponse>();
  const processWayfinderRequests = async (
    holdingsIds: HoldingDataInterface
  ) => {
    try {
      const wayfinderView = await getWayfinder(holdingsIds);

      if (wayfinderView) {
        setWayfinderLink(wayfinderView);
      }
    } catch (error) {
      console.error("Error fetching Wayfinder data:", error);
    }
  };

  useEffect(() => {
    if (mockBranchIds) {
      processWayfinderRequests(mockBranchIds);
    }
  }, [mockBranchIds]);

  return (
    <div className="demo-wayfinder">
      {wayfinderLink ? (
        <Wayfinder viewId={wayfinderLink.viewId} link={wayfinderLink.link} />
      ) : null}
    </div>
  );
};

export default withText(DemoWayfinder);
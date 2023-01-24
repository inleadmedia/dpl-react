import React, { FC } from "react";
import StatusCircleIcon from "./status-circle-icon";
import {
  getColors,
  daysBetweenTodayAndDate,
  daysBetweenDates
} from "../../../../core/utils/helpers/general";
import { useText } from "../../../../core/utils/text";
import { useConfig } from "../../../../core/utils/config";

interface StatusCircleProps {
  dueDate: string;
  loanDate: string;
}

const StatusCircle: FC<StatusCircleProps> = ({ loanDate, dueDate }) => {
  const t = useText();
  const config = useConfig();
  if (!dueDate) return null;
  const dangerThreshold = Number(config("dangerThresholdConfig"));
  const warningThreshold = Number(config("warningThresholdConfig"));
  const daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
  const daysBetweenLoanAndDue = daysBetweenDates(dueDate, loanDate);

  const percent = 100 - (daysBetweenTodayAndDue / daysBetweenLoanAndDue) * 100;
  const colors = getColors();

  let color = colors.default;
  if (daysBetweenTodayAndDue < dangerThreshold) {
    color = colors.danger;
  } else if (daysBetweenTodayAndDue <= warningThreshold) {
    color = colors.warning;
  }

  return (
    <StatusCircleIcon percent={percent} color={color as string}>
      <span className="counter__value color-secondary-gray">
        {/* I am not using string interpolation here because of styling */}
        {/* if somehow it is possible to break text in one div into two lines */}
        {/* where the first line has another font size AND is only the first "word" */}
        {/* then this should be changed to do that */}
        {daysBetweenTodayAndDue > 0 ? daysBetweenTodayAndDue : 0}{" "}
      </span>
      <span className="counter__label color-secondary-gray">
        {daysBetweenTodayAndDue === 1
          ? t("loanListMaterialDayText")
          : t("loanListMaterialDaysText")}
      </span>
    </StatusCircleIcon>
  );
};

export default StatusCircle;

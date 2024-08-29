import React, { FC } from "react";

export type OpeningHoursItemType = {
  term: string;
  description: string;
};

type OpeningHoursSidebarDetailsType = {
  openingHoursData: OpeningHoursItemType[];
  link: string;
};

const OpeningHoursSidebarDetails: FC<OpeningHoursSidebarDetailsType> = ({
  openingHoursData,
  link
}) => {
  return (
    <div className="opening-hours-sidebar-details__content">
      <dl className="opening-hours-sidebar-details__list">
        {openingHoursData.map(({ term, description }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="opening-hours-sidebar-details__item">
            <dt className="opening-hours-sidebar-details__term">{term}</dt>
            <dd className="opening-hours-sidebar-details__description">
              {description}
            </dd>
          </div>
        ))}
      </dl>
      <a href={link} className="opening-hours-sidebar__link">
        Se alle åbningstider
      </a>
    </div>
  );
};

export default OpeningHoursSidebarDetails;

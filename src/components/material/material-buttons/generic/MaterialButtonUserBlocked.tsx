import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

const MaterialButtonUserBlocked: FC = () => {
  const t = useText();
  return (
    <Button
      label={t("reserveText")}
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonUserBlocked;
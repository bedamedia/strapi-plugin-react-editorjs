import { TextInput } from "@strapi/design-system";
import * as React from "react";

import { useIntl } from "react-intl";

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, label, name, onChange, required, value } = props; // these are just some of the props passed by the content-manager

  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  return (
    <label>
      <TextInput
        placeholder={formatMessage({ id: label })}
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
    </label>
  );
});

export default Input;

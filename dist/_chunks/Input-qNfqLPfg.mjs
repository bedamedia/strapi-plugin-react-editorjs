import { jsx } from "react/jsx-runtime";
import { TextInput } from "@strapi/design-system";
import * as React from "react";
import { useIntl } from "react-intl";
const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, label, name, onChange, required, value } = props;
  const { formatMessage } = useIntl();
  const handleChange = (e) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value }
    });
  };
  return /* @__PURE__ */ jsx("label", { children: /* @__PURE__ */ jsx(
    TextInput,
    {
      placeholder: formatMessage({ id: label }),
      ref,
      name,
      disabled,
      value,
      required,
      onChange: handleChange
    }
  ) });
});
export {
  Input as default
};
//# sourceMappingURL=Input-qNfqLPfg.mjs.map

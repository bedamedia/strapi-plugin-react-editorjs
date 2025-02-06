import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import getRequiredTools from "./requiredTools";
import customTools from "../../config/customTools";
import MediaLibAdapter from "../medialib/adapter";
import MediaLibComponent from "../medialib/component";
import { changeFunc, getToggleFunc } from "../medialib/utils";
import { useAuth } from "@strapi/strapi/admin";
// import EditorJs from "react-editor-js";
import EditorJs from "@react-editor-js/client";

const getValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
};
const Editor = ({ onChange, name, value }) => {
  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const token =
    JSON.parse(localStorage.getItem("jwtToken")) ||
    JSON.parse(sessionStorage.getItem("jwtToken"));
  const editorCore = React.useRef(null);
  const imageSelectCbRef = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const mediaLibToggleFunc = useCallback(
    getToggleFunc({
      openStateSetter: setIsMediaLibOpen,
      indexStateSetter: setMediaLibBlockIndex,
    }),
    [],
  );

  // when image selected
  const handleMediaLibChange = useCallback(
    (data) => {
      // changeFunc({
      //   indexStateSetter: setMediaLibBlockIndex,
      //   data,
      //   index: mediaLibBlockIndex,
      //   editor: editorInstance,
      // });
      imageSelectCbRef.current(data);
      mediaLibToggleFunc();
    },
    [mediaLibBlockIndex, editorInstance],
  );

  const customImageTool = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc,
        onBlockClicked: (callItWhenFileSelected) => {
          mediaLibToggleFunc();
          imageSelectCbRef.current = callItWhenFileSelected;
        },
      },
    },
  };

  return (
    <>
      <div
        style={{
          border: `1px solid rgb(227, 233, 243)`,
          borderRadius: `2px`,
          marginTop: `4px`,
        }}
      >
        <EditorJs
          defaultValue={getValue(value)}
          onChange={async (...args) => {
            const savedData = await editorCore.current.save();
            // console.log("🚀 ~ onChange={ ~ savedData:", savedData);
            onChange({ target: { name, value: JSON.stringify(savedData) } });
          }}
          tools={{
            ...getRequiredTools({ token }),
            ...customTools,
            ...customImageTool,
          }}
          onInitialize={handleInitialize}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      />
    </>
  );
};

// Editor.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string,
// };

export default Editor;

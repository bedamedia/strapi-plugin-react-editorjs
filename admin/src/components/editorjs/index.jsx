import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import getRequiredTools from "./requiredTools";
import customTools from "../../config/customTools";
import MediaLibAdapter from "../medialib/adapter";
import MediaLibComponent from "../medialib/component";
import { changeFunc, getToggleFunc } from "../medialib/utils";
import { useAuth } from "@strapi/strapi/admin";
// import EditorJs from "react-editor-js";
import EditorJs from "@react-editor-js/client";
import { isEqual } from "lodash";
const getValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
};
const Editor = ({ locale, onChange, name, value }) => {
  const holder = `react-editor-js-${name}`;

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [didRerender, setDidReRender] = useState(false);
  const editorValueRef = React.useRef(value);

  const token =
    JSON.parse(localStorage.getItem("jwtToken")) ||
    JSON.parse(sessionStorage.getItem("jwtToken"));
  const editorCore = React.useRef(null);
  const imageSelectCbRef = React.useRef(null);

  const handleInitialize = React.useCallback(async (instance) => {
    editorCore.current = instance;
    await instance.isReady;

    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // NOTE: these updates should be applied only to strapi v5
    const editor = document.getElementById(holder);
    if (isDarkMode) editor.style.color = "black";

    const id = "strapi5-editorjs-override";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = `
          h1.ce-header { font-size: 3rem !important; }
          h2.ce-header { font-size: 2.5rem !important; }
          h3.ce-header { font-size: 2.25rem !important; }
          h4.ce-header { font-size: 2rem !important; }
          h5.ce-header { font-size: 1.75rem !important; }
          h6.ce-header { font-size: 1.65rem !important; }
          .ce-block { font-size: 1.5rem !important; }
        `;
      document.head.appendChild(style);
    }
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

  useEffect(() => {
    const changed = !isEqual(editorValueRef.current, value);
    console.log({ changed, isReady, shouldNotReRender: didRerender });
    if (isReady && !didRerender && changed) {
      console.log("🚀 ~ useEffect ~ setShouldReRender:");
      editorValueRef.current = value;
      editorCore.current.render(getValue(value));
      setDidReRender(true);
    }
  }, [value, isReady]);

  useEffect(() => {
    setDidReRender(false);
  }, [locale]);

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
          holder={holder}
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
          onReady={() => {
            setIsReady(true);
          }}
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStrapiApp } from "@strapi/strapi/admin";

export const prefixFileUrlWithBackendUrl = (fileURL) => {
  return !!fileURL && fileURL.startsWith("/")
    ? `${window.strapi.backendURL}${fileURL}`
    : fileURL;
};

const MediaLibComponent = ({ isOpen, onChange, onToggle }) => {
  const components = useStrapiApp("ImageDialog", (state) => state.components);

  const [data, setData] = useState(null);
  const MediaLibraryDialog = components["media-library"];

  const handleInputChange = (data) => {
    if (data) {
      setData(data);
    }
  };

  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      width: f.width,
      height: f.height,
      size: f.size,
      mime: f.mime,
      formats: f.formats,
      name: f.name,
    }));
    onChange(formattedFiles);
  };

  if (!components || !isOpen) return null;

  return (
    <MediaLibraryDialog
      multiple={false}
      // allowedTypes={["images"]}
      onClose={onToggle}
      onInputMediaChange={handleInputChange}
      onSelectAssets={handleSelectAssets}
    />
  );
};

MediaLibComponent.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

MediaLibComponent.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLibComponent;

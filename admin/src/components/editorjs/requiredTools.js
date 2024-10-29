import PluginId from "../../pluginId";
import axios from "axios";

// Plugins for Editor.js
import Image from "@editorjs/image";

const requiredTools = (options) => ({
  image: {
    class: Image,
    config: {
      field: "files.image",
      additionalRequestData: {
        data: JSON.stringify({}),
      },
      additionalRequestHeaders: {
        Authorization: `Bearer ${options.token}`,
      },
      endpoints: {
        byUrl: `/api/${PluginId}/image/byUrl`,
      },
      uploader: {
        async uploadByFile(file) {
          const formData = new FormData();
          formData.append("data", JSON.stringify({}));
          formData.append("files.image", file);

          const { data } = await axios.post(
            `/api/${PluginId}/image/byFile`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${options.token}`,
              },
            },
          );

          return data;
        },
      },
    },
  },
});

export default requiredTools;

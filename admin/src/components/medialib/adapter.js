export default class MediaLibAdapter {
  static get toolbox() {
    return {
      title: "Media Library",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 336 276"><path d="M291 150.242V79c0-18.778-15.222-34-34-34H79c-18.778 0-34 15.222-34 34v42.264l67.179-44.192 80.398 71.614 56.686-29.14L291 150.242zm-.345 51.622l-42.3-30.246-56.3 29.884-80.773-66.925L45 174.187V197c0 18.778 15.222 34 34 34h178c17.126 0 31.295-12.663 33.655-29.136zM79 0h178c43.63 0 79 35.37 79 79v118c0 43.63-35.37 79-79 79H79c-43.63 0-79-35.37-79-79V79C0 35.37 35.37 0 79 0z"/></svg>',
    };
  }

  constructor({ api, config, data }) {
    this.api = api;
    this.config = config || {};
    this.file = data?.file;
  }

  render() {
    const wraper = make("div", [this.api.styles.button], {
      style:
        "display:flex;align-items:center;flex-direction:column;justify-content:center;width:100%;height:100%;gap:8px",
    });
    wraper.style.overflow = "hidden";

    const imageWrapper = make("div", [], {
      style: "display:flex;justify-content:center;width:100%;height:100%",
    });

    const imageEl = make("IMG", this.api.styles["image-tool__image-picture"], {
      src: this.getPreviewImage(this.file),
    });

    if (!this.file) {
      imageEl.style.display = "none";
    } else {
      if (!this.isImage(this.file)) {
        imageEl.style.width = "40px";
        imageEl.style.height = "40px";
      } else {
        imageEl.style.width = "100px";
        imageEl.style.height = "100px";
      }
    }

    const filelinkAttributes =
      !this.file || this.isImage(this.file)
        ? {
            innerText: "",
            href: "",
          }
        : {
            innerText: this.file.name,
            href: this.file.url,
            target: "_blank",
          };
    const fileLinkEl = make("A", null, filelinkAttributes);
    if (!this.file) fileLinkEl.style.display = "none";
    const selectButton = make("BUTTON", [this.api.styles.button], {
      innerText: "Select image/file",
      style: "padding:10px 18px;font-size:14px",
      type: "button",
      display: "block",
    });
    wraper.appendChild(imageWrapper);
    imageWrapper.appendChild(imageEl);
    wraper.appendChild(fileLinkEl);
    wraper.appendChild(selectButton);

    selectButton.addEventListener("click", () => {
      const currentIndex = this.api.blocks.getCurrentBlockIndex();

      this.config.onBlockClicked((files) => {
        if (!files || !files.length) return;
        this.file = files[0];
        imageEl.src = this.getPreviewImage(files[0]);

        if (imageEl.style.display === "none") {
          imageEl.style.display = "block";
        }

        if (!this.isImage(this.file)) {
          fileLinkEl.style.display = "block";
          fileLinkEl.innerText = this.file?.name ?? "";
          fileLinkEl.href = this.file?.url ?? "";
          imageEl.style.width = "40px";
          imageEl.style.height = "40px";
        } else {
          fileLinkEl.style.display = "none";

          imageEl.style.width = "100px";
          imageEl.style.height = "100px";
        }
      });
    });

    return wraper;
  }

  save(...args) {
    return {
      file: this.file,
    };
  }

  getPreviewImage(file) {
    if (!file) return "";
    if (this.isImage(file)) return file.url;
    else return "/file.png";
  }

  isImage(file) {
    if (!file) return false;
    if (file.mime.includes("image")) return true;
    else return false;
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,

      /**
       * Tool's classes
       */
      wrapper: "image-tool",
      imageContainer: "image-tool__image",
      imagePreloader: "image-tool__image-preloader",
      imageEl: "image-tool__image-picture",
      caption: "image-tool__caption",
    };
  }
}

export function make(tagName, classNames, attributes) {
  const el = document.createElement(tagName);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else if (classNames !== null) {
    el.classList.add(classNames);
  }

  for (const attrName in attributes) {
    el[attrName] = attributes[attrName];
  }

  return el;
}

// https://editorjs.io/block-tunes-api/
class LinkBlockTune {
  constructor({ api, config, data }) {
    console.log("🚀 ~ LinkBlockTune:", { config, data });
    this.api = api;
  }

  static get isTune() {
    return true;
  }

  render() {
    return [
      //   {
      //   icon: "<svg>...</svg>",
      //   title: "Parent Item Title",
      //   children: {
      //     items: [
      //       {
      //         icon: "<svg>...</svg>",
      //         title: "Child Item Icon 1",
      //         onActivate: () => {},
      //       },
      //       {
      //         icon: "<svg>...</svg>",
      //         title: "Child Item Icon 2",
      //         onActivate: () => {},
      //       },
      //     ],
      //   },
      // },
      {
        icon: "<svg>...</svg>",
        title: "blank",
        toggle: true,
        onActivate: () => {
          console.log("tis", this.commandName);
          console.log(document.queryCommandState(this.commandName));
        },
      },
      {
        icon: "<svg>...</svg>",
        title: "author",
        toggle: true,
      },
    ];
  }
}

export default LinkBlockTune;

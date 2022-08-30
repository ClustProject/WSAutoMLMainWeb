import MetadataInputMacro from "./MetadataInputMacro";

const inputSourceUrl = "input#sourceUrl";

class WithUrlMetadataInputMacro extends MetadataInputMacro {
  url;

  constructor(page, url) {
    super(page);
    this.url = url;
  }

  async fillUrl() {
    await this.page.click(inputSourceUrl);
    await this.page.keyboard.type(this.url);
  }
}

export default WithUrlMetadataInputMacro;

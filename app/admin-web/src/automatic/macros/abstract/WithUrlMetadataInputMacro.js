import MetadataInputMacro from "./MetadataInputMacro";
import {INPUT_SOURCE_URL} from "../../common/selectors";

class WithUrlMetadataInputMacro extends MetadataInputMacro {
  url;

  constructor(page, url) {
    super(page);
    this.url = url;
  }

  async fillUrl() {
    await this.page.click(INPUT_SOURCE_URL);
    await this.page.keyboard.type(this.url);
  }
}

export default WithUrlMetadataInputMacro;

import MetadataInputMacro from "./MetadataInputMacro";
import {INPUT_SOURCE_URL} from "../../common/selectors";
import {sleep} from "../../common/functions";

class WithUrlMetadataInputMacro extends MetadataInputMacro {
  url;
  fileName;

  constructor(page, url, fileName) {
    super(page);
    this.url = url;
    this.fileName = fileName;
  }

  async fillUrl() {
    await this.page.click(INPUT_SOURCE_URL);
    await this.page.keyboard.type(this.url);
  }

  async run() {
    await this.clickUploadButton();
    await sleep(700);
    await this.fillUrl();
    await sleep(700);
    await this.clickLinkInputNextButton();
    await sleep(2000);
    await this.uploadFile(this.fileName);
    await sleep(2000);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default WithUrlMetadataInputMacro;

import WithUrlMetadataInputMacro from "../abstract/WithUrlMetadataInputMacro";

const FILE_NAME = "files/ETC_79_04_01_510483.csv";
const URL = "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset";

class Etc79WithUrlMetadataInputMacro extends WithUrlMetadataInputMacro {
  constructor(page) {
    super(page, URL)
  }

  async run() {
    await this.clickUploadButton();
    await this.fillUrl();
    await this.clickLinkInputNextButton();
    await this.uploadFile(FILE_NAME);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default Etc79WithUrlMetadataInputMacro;

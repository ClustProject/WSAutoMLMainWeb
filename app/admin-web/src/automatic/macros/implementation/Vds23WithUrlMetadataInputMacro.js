import WithUrlMetadataInputMacro from "../abstract/WithUrlMetadataInputMacro";

const FILE_NAME = "files/VDS_23_01_01_570513.csv";
const URL = "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=23&requestfrom=dataset";

class Vds23WithUrlMetadataInputMacro extends WithUrlMetadataInputMacro {
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

export default Vds23WithUrlMetadataInputMacro;

import NoUrlMetadataInputMacro from "../abstract/NoUrlMetadataInputMacro";
import { metaDataURL } from "../../common/constrants";

const UPLOAD_FILE_NAME = "files/VDS_38_01_01_210028.csv";

class Vds38NoUrlMetadataInputMacro extends NoUrlMetadataInputMacro {
  async run() {
    await this.page.goto(metaDataURL);

    await this.clickUploadButton();
    await this.clickLinkCheckBox();
    await this.clickLinkInputNextButton();

    await this.selectDropDown(1);
    await this.selectDropDown(1);
    await this.typeText("국내 교통");
    await this.typeText("구간 통행속도");
    await this.typeText("한국도로공사");
    await this.selectDropDown(1);
    await this.selectDropDown(2);
    await this.selectDropDown(3);
    await this.typeText("구간, 교통량, VDS, 콘존");
    await this.selectDropDown(2);
    await this.selectDropDown(1);
    await this.typeText(
      "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획 득한 자료"
    );
    await this.typeText(
      "집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드 (PK), 교통량"
    );
    await this.typeText("5분");
    await this.typeText("1일");
    await this.typeText("전국");
    await this.typeText("2021.01.01.~2021.01.31");

    await this.uploadFile(UPLOAD_FILE_NAME);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default Vds38NoUrlMetadataInputMacro;

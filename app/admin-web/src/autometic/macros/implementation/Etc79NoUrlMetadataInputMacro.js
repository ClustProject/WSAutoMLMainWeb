import NoUrlMetadataInputMacro from "../abstract/NoUrlMetadataInputMacro";
import {URL} from "../../common/constrants";

const UPLOAD_FILE_NAME = "./ETC_79_04_01_510483.csv";

class Etc79NoUrlMetadataInputMacro extends NoUrlMetadataInputMacro {

  async run() {
    await this.page.goto(URL);

    await this.clickUploadButton();
    await this.clickLinkCheckBox();
    await this.clickLinkInputNextButton();

    await this.selectDropDown(1);
    await this.selectDropDown(1);
    await this.typeText("국내 교통");
    await this.typeText("VDS존");
    await this.typeText("한국도로공사");
    await this.selectDropDown(1);
    await this.selectDropDown(2);
    await this.selectDropDown(3);
    await this.typeText("구간, 교통량, VDS, VDS존, 콘존");
    await this.selectDropDown(2);
    await this.selectDropDown(1);
    await this.typeText("한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획득한 자료");
    await this.typeText("VDS_ID, 지점이정, VDS존시작이정, VDS존종료이정, 노선번호, VDS존유형구 분코드, 노선구성순번, 기점종점방향구분코드, VDS존길이, 도로등급구분코드, 콘존ID");
    await this.typeText("1일");
    await this.typeText("1일");
    await this.typeText("전국");
    await this.typeText("2021.01.01.~2021.01.31");

    await this.uploadFile(UPLOAD_FILE_NAME);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default Etc79NoUrlMetadataInputMacro;

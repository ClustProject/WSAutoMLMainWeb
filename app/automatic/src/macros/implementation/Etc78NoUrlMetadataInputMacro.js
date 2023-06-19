import NoUrlMetadataInputMacro from "../abstract/NoUrlMetadataInputMacro";
import { metaDataURL } from "../../common/constrants";

const UPLOAD_FILE_NAME = "files/ETC_78_04_01_371837.csv";

class Etc78NoUrlMetadataInputMacro extends NoUrlMetadataInputMacro {
  async run() {
    await this.page.goto(metaDataURL);

    await this.clickUploadButton();
    await this.clickLinkCheckBox();
    await this.clickLinkInputNextButton();

    await this.selectDropDown(1);
    await this.selectDropDown(1);
    await this.typeText("국내 교통");
    await this.typeText("콘존");
    await this.typeText("한국도로공사");
    await this.selectDropDown(1);
    await this.selectDropDown(2);
    await this.selectDropDown(3);
    await this.typeText("구간, 콘존, 노드, 제한속도");
    await this.selectDropDown(2);
    await this.selectDropDown(1);
    await this.typeText("콘존에 대한 정보를 ETC 수집체계로부터 획득한 자료");
    await this.typeText(
      "콘존ID, 콘존길이, 기점종점방향구분코드, 시작노드ID, 종료노드ID, 차로수, 노 선번호, 제한속도, 노선구성순번, 콘존명, 버스전용차로유무, 도로등급구분코드"
    );
    await this.typeText("1일");
    await this.typeText("1일");
    await this.typeText("전국");
    await this.typeText("2021.01.01.");

    await this.uploadFile(UPLOAD_FILE_NAME);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default Etc78NoUrlMetadataInputMacro;

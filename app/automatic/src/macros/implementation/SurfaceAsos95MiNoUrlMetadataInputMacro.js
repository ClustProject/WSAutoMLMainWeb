import NoUrlMetadataInputMacro from "../abstract/NoUrlMetadataInputMacro";
import { metaDataURL } from "../../common/constrants";

const UPLOAD_FILE_NAME = "files/SURFACE_ASOS_95_MI_2022-01_2022-01_2022.csv";

class SurfaceAsos95MiNoUrlMetadataInputMacro extends NoUrlMetadataInputMacro {
  async run() {
    await this.page.goto(metaDataURL);

    await this.clickUploadButton();
    await this.clickLinkCheckBox();
    await this.clickLinkInputNextButton();

    await this.selectDropDown(1);
    await this.selectDropDown(1);
    await this.typeText("실외 대기");
    await this.typeText("종간기상관측(ASOS)종간기상관측(ASOS)");
    await this.typeText("기상청");
    await this.selectDropDown(1);
    await this.selectDropDown(2);
    await this.selectDropDown(3);
    await this.typeText("기온, 습도, 지면온도, 풍향, 풍속, 일조");
    await this.selectDropDown(2);
    await this.selectDropDown(1);
    await this.typeText(
      "종관기상관측이란 종관규모의 날씨를 파악하기 위하여 정해진 시각에 모든 관측 소에서 같은 시각에 실시하는 지상관측을 말합니다. 종관규모는 일기도에 표현되어 있는 보통의 고기압이나 저기압의 공간적 크기 및 수명을 말하며, 주로 매일의 날씨 현상을 뜻합니다."
    );
    await this.typeText(
      "기상강원지방기상청 춘천기상대에서 측정한 데이터로 철원지점 해발고도 155m 지점에서 측정된 자료"
    );
    await this.typeText("1분");
    await this.typeText("1일");
    await this.typeText("위도 : 38.14787 경도 : 127.3042");
    await this.typeText("2022.01.31~2022.01.31");

    await this.uploadFile(UPLOAD_FILE_NAME);
    await this.clickFinishButton();
    await this.waitDownloadComplete();
  }
}

export default SurfaceAsos95MiNoUrlMetadataInputMacro;

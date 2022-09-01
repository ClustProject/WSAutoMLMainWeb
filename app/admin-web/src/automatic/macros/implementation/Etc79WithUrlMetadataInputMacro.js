import WithUrlMetadataInputMacro from "../abstract/WithUrlMetadataInputMacro";

const FILE_NAME = "files/ETC_79_04_01_510483.csv";
const URL = "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset";

class Etc79WithUrlMetadataInputMacro extends WithUrlMetadataInputMacro {
  constructor(page) {
    super(page, URL, FILE_NAME);
  }
}

export default Etc79WithUrlMetadataInputMacro;

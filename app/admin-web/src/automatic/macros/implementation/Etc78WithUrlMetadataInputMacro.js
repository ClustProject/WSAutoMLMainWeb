import WithUrlMetadataInputMacro from "../abstract/WithUrlMetadataInputMacro";

const FILE_NAME = "files/ETC_78_04_01_371837.csv";
const URL = "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=78&requestfrom=dataset";

class Etc78WithUrlMetadataInputMacro extends WithUrlMetadataInputMacro {
  constructor(page) {
    super(page, URL, FILE_NAME);
  }

}

export default Etc78WithUrlMetadataInputMacro;

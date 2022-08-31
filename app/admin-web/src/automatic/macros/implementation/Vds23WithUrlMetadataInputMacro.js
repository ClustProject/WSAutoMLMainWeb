import WithUrlMetadataInputMacro from "../abstract/WithUrlMetadataInputMacro";

const FILE_NAME = "files/VDS_23_01_01_570513.csv";
const URL = "http://data.ex.co.kr/portal/fdwn/view?type=VDS&num=23&requestfrom=dataset";

class Vds23WithUrlMetadataInputMacro extends WithUrlMetadataInputMacro {
  constructor(page) {
    super(page, URL, FILE_NAME);
  }
}

export default Vds23WithUrlMetadataInputMacro;

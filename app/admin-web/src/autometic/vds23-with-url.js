import Vds23WithUrlMetadataInputMacro from './macros/implementation/Vds23WithUrlMetadataInputMacro';
import {runMacro} from "./common/functions";

(async () => {
  await runMacro(new Vds23WithUrlMetadataInputMacro());
})();

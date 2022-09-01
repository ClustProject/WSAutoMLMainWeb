import Vds38WithUrlMetadataInputMacro from './macros/implementation/Vds38WithUrlMetadataInputMacro';
import {runMacro} from "./common/functions";

(async () => {
  await runMacro(new Vds38WithUrlMetadataInputMacro());
})();

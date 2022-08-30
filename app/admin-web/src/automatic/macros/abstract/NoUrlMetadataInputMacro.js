import MetadataInputMacro from "./MetadataInputMacro";
import {INPUT_LINK_CHECK_BOX} from "../../common/selectors";

class NoUrlMetadataInputMacro extends MetadataInputMacro {
  constructor(page) {
    super(page);
  }

  async clickLinkCheckBox() {
    await this.page.click(INPUT_LINK_CHECK_BOX);
  }

  /**
   * n번째 드롭다운을 선택합니다.
   */
  async selectDropDown(n) {
    await this.page.keyboard.press("Tab");
    for (let i = 0; i < n; i++) {
      await this.page.keyboard.press("ArrowDown");
    }
    await this.page.keyboard.press("Enter");
  }

  async typeText(text) {
    await this.page.keyboard.press("Tab");
    await this.page.keyboard.type(text);
  }

}

export default NoUrlMetadataInputMacro;

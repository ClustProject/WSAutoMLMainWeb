import {FINISH_BUTTON, INPUT_FILE, LINK_INPUT_NEXT_BUTTON, UPLOAD_BUTTON} from "../../common/selectors";

class MetadataInputMacro {
  page;

  setPage(page) {
    this.page = page;
  }

  async clickUploadButton() {
    await this.page.waitForSelector(UPLOAD_BUTTON)
    await this.page.click(UPLOAD_BUTTON);
  }

  async clickLinkInputNextButton() {
    await this.page.click(LINK_INPUT_NEXT_BUTTON);
  }

  async uploadFile(uploadFileName) {
    await this.page.keyboard.press("Tab");
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(INPUT_FILE),
    ]);
    await fileChooser.accept([uploadFileName]);
  }

  async clickFinishButton() {
    await this.page.click(FINISH_BUTTON);
  }

  async waitDownloadComplete() {
    await this.page.waitForFunction(
      'document.querySelector("body").innerText.includes("100%")'
    );
  }

  async run() {
    throw new Error("하위 클래스에서 재정의해야 합니다.")
  }
}

export default MetadataInputMacro;

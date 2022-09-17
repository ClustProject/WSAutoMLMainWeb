import React, {useEffect} from "react";
import MainPageContainer from "../../components/containers/MainPageContainer";

const TITLE = "WS-AutoML | 메인";

export default function MainPage() {
  useEffect(() => {
    document.title = TITLE
  })

  return (
    <MainPageContainer/>
  );
}

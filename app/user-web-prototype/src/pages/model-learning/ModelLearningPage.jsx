import React, {useEffect} from "react";
import ModelLearningContainer from "../../components/containers/ModelLearningContainer";

const DOCUMENT_TITLE = "WS-AutoML | 모델 학습";

function ModelLearningPage() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE
  });

  return <ModelLearningContainer/>;
}

export default ModelLearningPage;

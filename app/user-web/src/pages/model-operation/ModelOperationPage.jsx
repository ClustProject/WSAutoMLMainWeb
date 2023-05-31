import React, { useEffect } from "react";
import ModelOperationContainer from "../../components/containers/ModelOperationContainer";

const DOCUMENT_TITLE = "WS-AutoML | 모델 운영";

function ModelOperationPage() {
  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  });

  return <ModelOperationContainer />;
}

export default ModelOperationPage;

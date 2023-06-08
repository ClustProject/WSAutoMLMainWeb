import React, { useEffect } from "react";
import MetadataDetailContainer from "../../components/containers/MetadataDetailContainer";

const TITLE = "WS-AutoML | 메타데이터 상세";

function MetadataDetailPage() {
  useEffect(() => {
    document.title = TITLE;
  });

  return <MetadataDetailContainer />;
}

export default MetadataDetailPage;

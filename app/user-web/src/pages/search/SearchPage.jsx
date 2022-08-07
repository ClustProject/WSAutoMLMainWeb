import React, {useEffect} from "react";
import SearchPageContainer from "../../components/containers/SearchPageContainer";

const TITLE = "AutoML | 검색";

export default function SearchPage() {
  useEffect(() => {
    document.title = TITLE
  }, [])

  return <SearchPageContainer/>;
}


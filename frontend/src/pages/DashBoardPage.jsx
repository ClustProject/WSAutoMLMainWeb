import React, {useEffect} from 'react';

import DashBoardContainer from '../components/containers/DashBoardContainer'

const TITLE = "AutoML - 대시보드";

export default function DashBoardPage() {

  useEffect(() => {
    document.title = TITLE
  }, []);

  return (
    <>
      <DashBoardContainer/>
    </>
  );
}

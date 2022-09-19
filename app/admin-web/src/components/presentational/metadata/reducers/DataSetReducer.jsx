import {CREATOR_CONTACT_POINT_NAME_MAP, LICENSE_RIGHTS_MAP} from "../constants";
import {INIT_DATASET_ARGS} from "../MetadataManagementContent";

export default function DataSetReducer(state, action) {
  const {type, payload} = action;

  if (type === "clear") {
    return {
      ...INIT_DATASET_ARGS
    };
  }

  //교통 하드 코딩
  if (type !== undefined && type.startsWith("ex/tcs")) {
    const dataExtcsCommonData = {
      publisher: "한국도로공사",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
    }

    if (type === "ex/tcs/34") {
      return {
        ...dataExtcsCommonData,
        title: "영업소별 교통량",
        keyword: "집계일자(PK), 집계시(1일 기준일 때 제외)(PK), 영업소코드(PK), 입출구구분코드(PK), TCS하이패스구분코드(PK), 고속도로운영기관구분코드, 영업형태구분코드, 1종교통량, 2종교통량, 3종교통량, 4종교통량, 5종교통량, 6종교통량, 총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
        type: "숫자",
      };
    }
    if (type === "ex/tcs/35") {
      return {
        ...dataExtcsCommonData,
        title: "영업소간 교통량",
        keyword: "집계일자(PK), 출발영업소코드(PK), 도착영업소코드(PK), 출발영업소명, 도착영업소명, 도착지방향1종교통량, 도착지방향2종교통량, 도착지방향3종교통량, 도착지방향4종교통량, 도착지방향5종교통량, 도착지방향6종교통량, 도착지방향총교통량, 출발지방향1종교통량, 출발지방향2종교통량, 출발지방향3종교통량, 출발지방향4종교통량, 출발지방향5종교통량, 출발지방향6종교통량, 출발지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/32") {
      return {
        ...dataExtcsCommonData,
        title: "권역별 교통량",
        keyword: "집계일자(PK), 집계시(1일 기준일 때 제외)(PK), TCS본부코드(PK), 입출구구분코드(PK), TCS하이패스구분코드(PK), 고속도로운영기관구분코드(PK), 영업형태구분코드(PK), 1종교통량, 2종교통량, 3종교통량, 4종교통량, 5종교통량, 6종교통량, 총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/31") {
      return {
        ...dataExtcsCommonData,
        title: "전국 교통량",
        keyword: "집계일자(PK), 집계시(1일 기준일 때 제외)(PK), 입출구구분코드(PK), TCS하이패스구분코드(PK), 고속도로운영기관구분코드(PK), 영업형태구분코드(PK), 1종교통량, 2종교통량, 3종교통량, 4종교통량, 5종교통량, 1종(경차)교통량, 총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/39") {
      return {
        ...dataExtcsCommonData,
        title: "전체 영업소간 교통량 매트릭스",
        keyword: "기준일자(PK), 출발영업소명(PK), 도착대수",
        description: "TCS 수집체계로부터 획득한 자료, 총349개 각 영업소 도착 대수(덕평복합 영업소 2014년 1월 21일 추가)",
      };
    }
    if (type === "ex/tcs/65") {
      return {
        ...dataExtcsCommonData,
        title: "입출구 교통량(차로별)",
        keyword: "입출구구분,TCS하이패스구분,차로ID,TCS본부명,지사명,영업소명,TCS차종구분명,TCS차종유형구분명,TCS본부코드,TCS지사코드,영업소코드,TCS차종구분코드,TCS차종유형구분코드,교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/64") {
      return {
        ...dataExtcsCommonData,
        title: "영업소간 교통량 (시간대별)",
        keyword: "집계일자,집계시,요일명,영업소,영업소코드,TCS차종구분명,TCS차종유형구분명,TCS차종구분코드,TCS차종유형구분코드,교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C7") {
      return {
        ...dataExtcsCommonData,
        title: "분기별 톨게이트 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/17") {
      return {
        ...dataExtcsCommonData,
        title: "TCS원시자료",
        keyword: "출구본부명,출구지사명,출구영업소코드,출구영업소명,처리일자,처리일시분초,TCS차종구분코드,TCS차종구분명,근무일자,근무번호,확인순번,TCS본부명,지사명,영업소코드,영업소명,발급일시,발급시분초",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/33") {
      return {
        ...dataExtcsCommonData,
        title: "수도권 교통량",
        keyword: "집계일자(PK), 집계시(1일 기준일 때 제외)(PK), 영업소코드(PK), 입출구구분코드(PK), TCS하이패스구분코드(PK), 1종교통량, 2종교통량, 3종교통량, 4종교통량, 5종교통량, 6종교통량, 총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    // 페이지 전환
    if (type === "ex/tcs/67") {
      return {
        ...dataExtcsCommonData,
        title: "구간단면 양방향 교통량",
        keyword: "기준일자,집계기준일,TCS차종구분명,TCS차종구분코드,TCS차종유형구분명,TCS차종유형구분코드,TCS노선번호,TCS본부코드,TCS지사코드,노선명,순번,구분,교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C5") {
      return {
        ...dataExtcsCommonData,
        title: "일별 지역간 교통량 매트릭스",
        keyword: "집계일자,출발권역명,수도권도착,강원도착,대전충남도착,전북도착,광주전남도착,대구경북도착,부산경남도착,충북도착",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/18") {
      return {
        ...dataExtcsCommonData,
        title: "TCS원시자료_하이패스",
        keyword: "입구본부코드,입구본부명,입구지사코드,입구지사명,입구영업소코드,입구영업소명,입구처리일자,입구처리시분초,입구처리시간,근무일자,입구처리차종구분코드,입출구구분,입구처리차종구분명,출구본부코드,출구본부명,출구지사코드,출구지사명,출구영업소코드,출구영업소명,출구처리시간,출구처리밀리초,출구처리차종구분코드,출구처리차종구분명",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B6") {
      return {
        ...dataExtcsCommonData,
        title: "수도권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B1") {
      return {
        ...dataExtcsCommonData,
        title: "강원권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B5") {
      return {
        ...dataExtcsCommonData,
        title: "부산경남권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B3") {
      return {
        ...dataExtcsCommonData,
        title: "대구경북권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/68") {
      return {
        ...dataExtcsCommonData,
        title: "연결로 교통량",
        keyword: "집계일자,요일명,노선번호,기점종점방향구분코드,집계시간단위구분명,집계시간구분,VDS_ID,VDS위치설명내용,지점이정,교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B4") {
      return {
        ...dataExtcsCommonData,
        title: "대전충청권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B2") {
      return {
        ...dataExtcsCommonData,
        title: "광주전남권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
// 페이지 전환
    if (type === "ex/tcs/B7") {
      return {
        ...dataExtcsCommonData,
        title: "전북권 톨게이트 진출입 일교통량",
        keyword: "집계일자,영업소코드,영업소명,입출구구분코드,입출구명,TCS하이패스구분코드,TCS하이패스명,고속도로운영기관구분코드,고속도로운영기관명,영업형태구분코드,영업형태명,1종교통량,2종교통량,3종교통량,4종교통량,5종교통량,6종교통량,총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C2") {
      return {
        ...dataExtcsCommonData,
        title: "수도권출발 지역간 월누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C4") {
      return {
        ...dataExtcsCommonData,
        title: "대전충청권출발 지역간 월누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C3") {
      return {
        ...dataExtcsCommonData,
        title: "부산경남권출발 지역간 월누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/66") {
      return {
        ...dataExtcsCommonData,
        title: "구간단면 단방향 교통량",
        keyword: "출발영업소코드,도착영업소코드,기준일자,집계기준일,TCS차종구분명,TCS차종구분코드,TCS차종유형구분명,TCS차종유형구분코드,TCS노선번호,TCS본부코드,TCS지사코드,노선명,순번1,순번2,입출구영업소명,교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/A2") {
      return {
        ...dataExtcsCommonData,
        title: "대전충청권출발 지역간 년누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/B9") {
      return {
        ...dataExtcsCommonData,
        title: "대구경북권출발 지역간 월누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/C0") {
      return {
        ...dataExtcsCommonData,
        title: "강원권출발 지역간 월누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/A5") {
      return {
        ...dataExtcsCommonData,
        title: "수도권출발 지역간 누계교통량",
        keyword: "집계일자,출발영업소코드,도착영업소코드,출발영업소명,도착영업소명,출발권역코드,도착권역코드,출발권역명,도착권역명,도착지방향1종교통량,도착지방향2종교통량,도착지방향3종교통량,도착지방향4종교통량,도착지방향5종교통량,도착지방향6종교통량,도착지방향총교통량",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }
    if (type === "ex/tcs/69") {
      return {
        ...dataExtcsCommonData,
        title: "JCT 합류전후 차량속도 및 교통량분포",
        keyword: "기준일자,요일명,기준시,지점이정,차로유형구분코드,교통량,콘존명,콘존길이,도로이정,평균속도,VDS_ID,지점이정,콘존명",
        description: "TCS 수집체계로부터 획득한 자료",
      };
    }


  }
  //교통 하드 코딩


  //기상 하드 코딩
  if (type !== undefined && type.startsWith("kma")) {
    const dataWeatherCommonData = {
      publisher: "기상청",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
    }

    if (type === "kma/grnd_Asos") {
      return {
        ...dataWeatherCommonData,
        title: "종관기상관측(ASOS)",
        keyword: "기온, 강수, 바람, 기압, 습도, 일사, 일조, 눈, 구름, 시정, 지면상태, 지면 · 초상온도, 일기현상, 증발량, 현상번호",
        description: "종관기상관측이란 종관규모의 날씨를 파악하기 위하여 정해진 시각에 모든 관측소서 같은 시각에 지상관측을 말합니다.<br/> 종관규모는 일기도에 표현되어 있는 봍옹의 고기압이나 저기압의 공간적 크기 및 수명을 말하며, 주로 매일의 날씨 현상을 뜻합니다.",
        type: "숫자",
      };
    }

    if (type === "kma/grnd_Aws") {
      return {
        ...dataWeatherCommonData,
        title: "방재기상관측(AWS)",
        keyword: "기온, 강수, 바람, 습도, 기압",
        description: "방재기상관측이란 지진, 태풍, 홍수, 가뭄 등 기상현상에 따른 자연재해를 막기 위해 실시하는 지상관측을 말합니다. 관측 공백 해소 및 국지적인 현상을 파악하기 위하여 전국 약 510여 지점에 자동기상관측장비(AWS)를 설치하여 자동으로 관측합니다.",
        type: "숫자",
      };
    }

    if (type === "kma/grnd_Agr") {
      return {
        ...dataWeatherCommonData,
        title: "농업기상관측(AAOS)",
        keyword: "기온, 풍속, 습도, 증발량, 지면·초상·지중온도, 토양수분, 복사, 조도, 일사, 일조, 지하수위",
        description: "농업기상관측이란 기상요소 중 농업과 밀접한 관계가 있는 기상현상에 대하여 행하는 관측을 말합니다. 작물의 생육과 생산 활동에 영향을 주는 토양 수분과 지중온도, 이와 관련된 복사와 증발량 등을 관측합니다.",
        type: "숫자",
      };
    }

    if (type === "kma/grnd_Nk") {
      return {
        ...dataWeatherCommonData,
        title: "북한기상관측",
        keyword: "기온, 강수, 바람, 기압, 습도, 구름, 시정",
        description: "북한이 세계기상기구(WMO, World Meteorogical Organization)의 기상통신망(GTS)을 통해 보낸 27개 지점의 관측 자료를 조회하고 다운로드 하실 수 있습니다.",
        type: "숫자",
      };
    }

    if (type === "kma/grnd_Awos") {
      return {
        ...dataWeatherCommonData,
        title: "공공기관 기상관측",
        keyword: "기온, 강수량, 풍향, 풍속, 습도, 기압, 일사, 일조",
        description: "국토교통부, 환경부, 산림청, 서울시, 부산시, 국립공원관리공단, 한국도로공사 등 기상청의 '기상관측표준화법'에 따라 기상관측업무를 수행하는 총 27개 공공기관의 기상관측자료를 서비스합니다. 해당 공공기관은 표준화된 관측환경 및 품질관리를 통해 자료를 관리하고 있습니다.",
        type: "숫자",
      };
    }

    if (type === "kma/season") {
      return {
        ...dataWeatherCommonData,
        title: "계절관측",
        keyword: "계절",
        description: "계절의 빠르고 늦음의 지역적인 차이 등을 합리적으로 관측 및 통계 분석하여 기후변화의 추이를 총괄적으로 파악하기위해 각 관측소에서 관측자가 식물, 동물, 기후계절 등을 관측한 자료입니다.",
        type: "숫자",
      };
    }

    if (type === "kma/season_Obs") {
      return {
        ...dataWeatherCommonData,
        title: "계절관측",
        keyword: "계절, 평년값",
        description: "계절의 변화와 기후변화 추세를 파악하기 위하여 ‘0’으로 끝나는 해의 최근 30년(1991~2020년) 간의 계절관측자료를 평균하여 산출한 자료입니다. 과거에는 계절관측을 수행하였으나 현재에는 중단된 지점도 관측기간이 10년 이상인 경우에는 계절평년값 제공지점에 포함됩니다.",
        type: "숫자",
      };
    }

    if (type === "kma/climate") {
      return {
        ...dataWeatherCommonData,
        title: "황사관측(PM10)",
        keyword: "미세먼지농도",
        description: "부유분진측정장비(PM10)를 이용하여 미세먼지 등 대기 중에 부유하는 에어로졸 중 직경이 10㎛ 이하인 입자의 농도를 관측한 자료로, 황사 관측의 참고자료로 활용되고 있습니다.",
        type: "숫자",
      };
    }

    if (type === "kma/lightning") {
      return {
        ...dataWeatherCommonData,
        title: "낙뢰관측",
        keyword: "낙뢰, 낙뢰강도",
        description: "낙뢰관측장비를 이용하여 탐지·분석된 낙뢰의 발생시각, 위치, 극정, 강도 등을 관측한 자료입니다.",
        type: "숫자",
      };
    }

  }
  //기상 하드 코딩

  if (type !== undefined && type.startsWith("data-ex-")) {
    const dataExCommonData = {
      publisher: "한국도로공사",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      type: "숫자",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
    }

    if (type === "data-ex-79") {
      return {
        ...dataExCommonData,
        title: "VDS존",
        keyword: "구간, 교통량, VDS, VDS존, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획득한 자료",
      };
    }

    if (type === "data-ex-78") {
      return {
        ...dataExCommonData,
        title: "콘존",
        keyword: "구간, 콘존, 노드, 제한속도",
        description: "콘존에 대한 정보를 ETC 수집체계로부터 획득한 자료",
      }
    }

    if (type === "data-ex-38") {
      return {
        ...dataExCommonData,
        title: "구간 통행속도",
        keyword: "구간, 교통량, VDS, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획 득한 자료",
      }
    }

    if (type === "data-ex-23") {
      return {
        ...dataExCommonData,
        title: "구간 통행속도",
        keyword: "통행속도, VDS, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 통행속도를 VDS 수집체계로부터 획득한 자료",
      }
    }
  }

  if (type === "data-kma-36") {
    return {
      title: "종간기상관측(ASOS)",
      publisher: "기상청",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      type: "숫자",
      keyword: "기온, 습도, 지면온도, 풍향, 풍속, 일조",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
      description: "종관기상관측이란 종관규모의 날씨를 파악하기 위하여 정해진 시각에 모든 관측 소에서 같은 시각에 실시하는 지상관측을 말합니다. 종관규모는 일기도에 표현되어 있는 보통의 고기압이나 저기압의 공간적 크기 및 수명을 말하며, 주로 매일의 날씨 현상을 뜻합니다.",
    }
  }

  if (type === "data.go.kr") {
    return {
      ...state,
      title: payload.name,
      description: payload.description,
      publisher: payload.creator.name,
      keyword: payload.keywords.reduce((acc, cur) => `${acc},${cur}`)
    };
  }

  if (payload.name === "creator") {
    return {
      ...state,
      [payload.name]: payload.value,
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP[payload.value]
    }
  }

  if (payload.name === "license") {
    return {
      ...state,
      [payload.name]: payload.value,
      rightses: LICENSE_RIGHTS_MAP[payload.value]
    }
  }

  return {
    ...state,
    [payload.name]: payload.value
  };
}

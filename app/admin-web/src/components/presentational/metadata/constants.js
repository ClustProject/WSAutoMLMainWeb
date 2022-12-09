const defaultWidth = 110;

const COLUMNS = [
  {
    field: 'id',
    headerName: '아이디',
    width: defaultWidth,
  },
  {
    field: 'category',
    headerName: '카테고리',
    width: defaultWidth,
  },
  {
    field: 'theme',
    headerName: '주제',
    width: defaultWidth,
  },
  {
    field: 'themeTaxonomy',
    headerName: '주제 분류',
    width: 150,
  },
  {
    field: 'dataSetTitle',
    headerName: '제목',
    width: defaultWidth,
  },
  {
    field: 'publisher',
    headerName: '제공 기관',
    width: defaultWidth,
  },
  {
    field: 'creator',
    headerName: '생성 기관',
    width: 200,
  },
  {
    field: 'name',
    headerName: '구축기관 담당자 이름',
    width: 180,
  },
  {
    field: 'email',
    headerName: '구축기관 담당자 이메일',
    width: 180,
  },
  {
    field: 'type',
    headerName: '유형',
    width: defaultWidth,
  },
  {
    field: 'keyword',
    headerName: '키워드',
    width: 500,
  },
  {
    field: 'license',
    headerName: '라이센스',
    width: defaultWidth,
  },
  {
    field: 'rights',
    headerName: '권한',
    width: defaultWidth,
  },
  {
    field: 'dataSetDescription',
    headerName: '데이터셋 설명',
    width: defaultWidth,
  },
  {
    field: 'distributionTitle',
    headerName: '배포 파일 제목',
    width: 300,
  },
  {
    field: 'distributionDescription',
    headerName: '배포 파일 설명',
    width: 700,
  },
  {
    field: 'downloadUrl',
    headerName: '다운로드 URL',
    width: 500,
  },
  {
    field: 'temporalResolution',
    headerName: '시간 단위',
    width: defaultWidth,
  },
  {
    field: 'accurualPeriodicity',
    headerName: '제공 주기',
    width: defaultWidth,
  },
  {
    field: 'spatial',
    headerName: '공간 정보',
    width: defaultWidth,
  },
  {
    field: 'temporal',
    headerName: '시간 정보',
    width: defaultWidth,
  },
];

/**
 * 연관된 카테고리와 테마 정보들을 가지고 있는 변수
 *
 * 선택한 카테고리에 따라 테마들이 다르게 나오도록 처리해야 한다.
 */
const CATEGORY_THEME_MAP = {
  "대기 환경": [
    "공기질"
  ],
  "농장": [
    "농장 환경"
  ],
  "공장": [
    "공장모터",
    "건설장비",
  ],
  "생체": [
    "작업자",
    "음성",
    "움직임",
    "생체 데이터",
  ],
  "생활/영상": [
    "활동영상"
  ],
  "에너지": [
    "태양광",
    "실외대기",
  ],
  "환경": [
    "방문객"
  ],
  "도시": [
    "국내교통"
  ],
  "오픈데이터": [
    "교통",
    "캘린더"
  ],
}

/**
 * 구축 기관과 담당자 이름에 대한 정보를 가지고 있는 변수
 *
 * 구축 기관과 담당자 이름만 서버를 통해 전송하면 알맞은 연락처 정보를 서버에서 저장합니다.
 */
const CREATOR_CONTACT_POINT_NAME_MAP = {
  "위세아이텍": [
    "최태동",
    "김정연"
  ],
  "KETI": [
    "문재원",
    "오승택"
  ],
  "케이웨더(주)": [
    "이인혜"
  ],
  "광운대": [
    "김대현"
  ],
  "고려대": [
    "이정호",
    "이지윤"
  ],
  "달리웍스(주)": [
    "이순호"
  ],
}

const LICENSE_RIGHTS_MAP = {
  "CLUST": [
    "CLUST Consortium",
    "All"
  ],
  "PUBLIC": [
    "All"
  ]
}

const TYPES = [
  "비디오",
  "텍스트",
  "숫자",
  "이미지"
]

const DEFAULT_PAGE_COUNT = 0;
const DISPLAY_COUNT = 5;

export {
  COLUMNS,
  CATEGORY_THEME_MAP,
  CREATOR_CONTACT_POINT_NAME_MAP,
  LICENSE_RIGHTS_MAP,
  TYPES,
  DEFAULT_PAGE_COUNT,
  DISPLAY_COUNT
}

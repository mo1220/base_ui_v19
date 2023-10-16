// export const MENU_ARR: { menu: Array<any> } = require('../../assets/menu.json');
// export const TOPO_JSON: { topo: Array<any> } = require('../features/dashboard/widget-components/map/geo-json/municipalities-topo-simple.json');
export const MENU = [
  {
    "name": "데이터 설계",
    "path": "/data-config/data-set",
    // "children": [],
    "children": [
      {
        "name": "데이터 관리",
        "path": "/data-config/data-set",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [
          {
            "name": "데이터 관리",
            "path": "/data-config/data-set",
            "role": [ 1 ],
            "api": [ 1 ],
            "children": [
              {
                "name": "데이터 관리",
                "path": "/data-config/data-set",
                "role": [ 1 ],
                "api": [ 1 ],
                "children": [],
                "en": "Data Management",
                "kr": "데이터 관리"
              },
              {
                "name": "로그소스 템플릿 관리",
                "path": "/data-config/log-source",
                "role": [ 1 ],
                "api": [ 1 ],
                "children": [],
                "en": "Log Source Template",
                "kr": "로그소스 관리"
              }
            ],
            "en": "Data Management",
            "kr": "데이터 관리"
          },
          {
            "name": "로그소스 템플릿 관리",
            "path": "/data-config/log-source",
            "role": [ 1 ],
            "api": [ 1 ],
            "children": [],
            "en": "Log Source Template",
            "kr": "로그소스 관리"
          }
        ],
        "en": "Data Management",
        "kr": "데이터 관리",
      },
      {
        "name": "로그소스 템플릿 관리",
        "path": "/data-config/log-source",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [],
        "en": "Log Source Template",
        "kr": "로그소스 관리"
      }
    ],
    "icon": "source",
    "en": "Data Config",
    "kr": "데이터 설계",
    "role": [ 1, 12 ],
    "api": [ 1 ]
  },
  {
    "name": "시각화",
    "path": "/dashboard/config/widget",
    "children": [
      {
        "name": "차트",
        "path": '/dashboard/config/widget',
        "role": [ 1, 39 ],
        "api": [ 1, 39 ],
        "children": [],
        "en": "Widget config",
        "kr": "차트",
        "widget_name": "차트",
        "description": "차트"
      },
      {
        "name": "대시보드",
        "path": '/dashboard/config/dashboard',
        "role": [ 18, 1, 33, 39 ],
        "api": [ 1, 39 ],
        "children": [],
        "en": "Dashboard Setting",
        "kr": "대시보드",
        "widget_name": "내부자",
        "description": ""
      }
    ],
    "dashboard": false,
    "en": "Collect Status",
    "kr": "시각화",
    "icon": "dashboard",
    "description": "시각화",
    "role": [ 2, 10, 12, 1, 33, 39 ],
    "api": [ 1, 39 ]
  },
  {
    "name": "데이터 분석",
    "path": "/data-analysis/easy",
    "children": [
      {
        "name": "AI 분석모델",
        "path": "/data-analysis/easy",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [],
        "en": "Easy Analysis",
        "kr": "AI 분석모델"
      },
      {
        "name": "AI 분석모델 현황",
        "path": "/data-analysis/easy-model",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [],
        "en": "Easy Analysis",
        "kr": "AI 분석모델 현황"
      },
      // {
      //   "name": "AI 분석모델 갱신",
      //   "path": "/data-analysis/scheduler",
      //   "role": [ 1 ],
      //   "api": [ 1 ],
      //   "children": [],
      //   "en": "Easy Analysis Scheduler",
      //   "kr": "AI 분석모델 갱신"
      // },
      {
        "name": "AI 분석이력",
        "path": "/data-analysis/easy-history",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [],
        "en": "Easy Analysis Histories",
        "kr": "AI 분석이력"
      },
      // {
      //   "name": "배포된 모델",
      //   "path": "/data-analysis/deployment",
      //   "role": [ 1 ],
      //   "api": [ 1 ],
      //   "children": [],
      //   "en": "Easy Analysis Deployment",
      //   "kr": "배포된 모델"
      // },
      {
        "name": "고급분석",
        "path": "/data-analysis/advanced",
        "role": [ 1 ],
        "api": [ 1 ],
        "children": [],
        "en": "Advanced analysis",
        "kr": "고급분석"
      }
    ],
    "icon": "manage_search",
    "en": "Data Analysis",
    "kr": "데이터 분석",
    "role": [ 1, 12 ],
    "api": [ 1 ]
  },
  // {
  //   "name": "데이터 검색",
  //   "path": "/search",
  //   "children": [],
  //   "role": [ 1 ],
  //   "api": [ 1 ],
  //   "icon": "find_in_page",
  //   "en": "Data Search",
  //   "kr": "데이터 검색"
  // },
  {
    "name": "Report",
    "path": "report",
    "children": [
      {
        "name": "Report Template",
        "path": "/report/template",
        "children": [],
        "en": "Report Template",
        "kr": "보고서 템플릿 생성",
        "role": [ 1, 10, 12 ],
        "api": [ 1, 10 ]
      },
      {
        "name": "Report History",
        "path": "/report/list",
        "children": [],
        "en": "Report History",
        "kr": "보고서 생성 및 현황",
        "role": [ 1, 2, 10, 12 ],
        "api": [ 1, 2, 10 ]
      }
      // {
      //   "name": "Define Report",
      //   "path": "/report/reserve",
      //   "children": [],
      //   "dashboard": false,
      //   "en": "Define Report",
      //   "kr": "보고서 갱신 관리",
      //   "role": [ 1, 2, 10, 12 ],
      //   "api": [ 1, 2, 10 ]
      // }
    ],
    "dashboard": false,
    "en": "Report",
    "kr": "보고서",
    "icon": "assignment",
    "role": [ 1, 2, 10, 12 ],
    "api": [ 1 ]
  },
  {
    "name": "Schedule",
    "path": "/schedule/config",
    "children": [
      // {
      //   "name": "Schedule",
      //   "path": "/schedule/config",
      //   "children": [],
      //   "en": "Schedule",
      //   "kr": "스케줄 관리",
      //   "role": [ 1, 10, 12 ],
      //   "api": [ 1, 10 ]
      // }
    ],
    "dashboard": false,
    "en": "Schedule",
    "kr": "스케줄 현황",
    "icon": "edit_calendar",
    "role": [ 1, 2, 10, 12 ],
    "api": [ 1 ]
  },
  {
    "name": "Portal",
    "path": "/portal/list",
    "children": [
      // {
      //   "name": "Schedule",
      //   "path": "/schedule/config",
      //   "children": [],
      //   "en": "Schedule",
      //   "kr": "스케줄 관리",
      //   "role": [ 1, 10, 12 ],
      //   "api": [ 1, 10 ]
      // }
    ],
    "dashboard": false,
    "en": "Portal",
    "kr": "나의 리소스 현황",
    "icon": "inventory_2",
    "role": [ 1, 2, 10, 12 ],
    "api": [ 1 ]
  }
];
export const QUICK_MENU = [
  {
    icon: 'storage',
    name: '데이터설계',
    link: '/data-config/data-set'
  },
  {
    icon: 'donut_small',
    name: '차트',
    link: '/dashboard/config/widget'
  },
  {
    icon: 'psychology',
    name: 'AI분석모델',
    link: '/data-analysis/easy'
  },
  {
    icon: 'dvr',
    name: 'AI분석모델 현황',
    link: '/data-analysis/easy-model'
  },
  {
    icon: "inventory_2",
    name: "나의 리소스 현황",
    link: "/portal/list"
  }
]

export const STYLE_GUIDE_MENU = [
  {
    name: 'Typography',
    icon: 'text_fields',
    link: '/typography',
    desc: `Datatree UI Noto Sans를 기반으로 한 Typography`
  },
  {
    name: 'Form',
    icon: 'edit_note',
    link: '/form',
    children: [
      {
        name: 'Auto Complete',
        link: '/form/autoComplete',
        desc: `검색어 자동완성, 검색어 추천`
      },
      {
        name: 'Calendar',
        link: '/form/calendar',
        desc: `<b>날짜</b> 혹은 <b>시간</b> 선택을 위한 <span class="highlight-pink">date-picekr, date-range-picker, timepicker</span>`
      },
      {
        name: 'Checkbox',
        link: '/form/checkbox',
        desc: `<b>테마, 사이즈별, 그룹화</b> 등이 포함된 표준 Checkbox`
      },
      {
        name: 'Chips',
        link: '/form/chips',
        desc: `String Array를 관리하기 위한 Chips`//<br> input이 없는 경우 mat-chip-set을, input이 있는 경우 mat-chip-grid를 사용함`
      },
      {
        name: 'Color Picker',
        link: '/form/colorPicker',
        desc: `Color Picker 설명 <span></span>`
      },
      {
        name: 'Dropdown',
        link: '/form/dropdown',
        desc: `Dropdown 설명 <span></span>`
      },
      {
        name: 'Editor',
        link: '/form/editor',
        desc: `Html, Code 사용 Editor HTML Editor Quill, Code Ace Editor`
      },
      {
        name: 'Input',
        link: '/form/input',
        desc: `기본 입력용 Input <br>
               <span class="color-pink"><b>[group 순서]</b> <span class="highlight-pink">.form-group</span> > <span class="highlight-pink">label</span> + <span class="highlight-pink">input.form-control.form-control-sm</span> + clear-btn + valid-feedback <br></span>
               <span class="color-purple"><b>[간격 지정 예시]</b> margin-bottom : <span class="highlight-purple">mb-1</span> (1~5) / margin-right : <span class="highlight-purple">me-1</span> (1~5) / padding-x : <span class="highlight-purple">px-1</span> (1~5) / padding-left : <span class="highlight-purple">ps-1</span> (1~5)<br>
                * 1 : 0.25rem <br>
                * 2 : 0.5rem <br>
                * 3 : 1rem <br>
                * 4 : 1.5rem <br>
                * 5 : 3rem
                </span>`
      },

      {
        name: 'InputMask',
        link: '/form/inputMask',
        desc: `InputMask 구성 요소는 숫자, 날짜, 통화 및 전화와 같은 특정 형식으로 입력을 입력하는 데 사용됩니다.`
      },
      {
        name: 'InputNumber',
        link: '/form/inputNumber',
        desc: `InputNumber는 숫자 입력을 제공하는 입력 구성 요소입니다.`
      },
      {
        name: 'KeyFilter',
        link: '/form/keyFilter',
        desc: `KeyFilter는 정규식을 기반으로 사용자 입력을 제한하기 위한 Input의 기본 제공 기능입니다`
      },
      {
        name: 'Knob',
        link: '/form/knob',
        desc: `Knob 설명 <span></span>`
      },
      {
        name: 'Select',
        link: '/form/select',
        desc: `옵션 중 select할 수 있는 ng-select <span></span>`
      },
      {
        name: 'Radio',
        link: '/form/radio',
        desc: `Radio 설명 <span></span>`
      },
      {
        name: 'Rating',
        link: '/form/rating',
        desc: `Rating 설명 <span></span>`
      },
      {
        name: 'Slider',
        link: '/form/slider',
        desc: `Slider 설명
                <div class="msg warning">Tick 개수가 많아지면 느려지는 현상이 있어 주의가 필요<br />Tick 개수가 커지면 Material Slider로 구현</div>`
      }
    ]
  },
  {
    name: 'Button',
    icon: 'left_click',
    link: '/button',
    children: [
      {
        name: 'Button',
        link: '/button/button',
        desc: `<b>테마, 사이즈별, 아이콘, 라벨</b> 등이 포함된 표준 Button`
      },
      {
        name: 'SplitButton',
        link: '/button/splitButton',
        desc: `<b>Menu</b>와 <b>Button</b>이 혼합된 표준 Split Button`
      },
      {
        name: 'Speed Dial',
        link: '/button/speedDial',
        desc: `Speed Dial 설명 <span></span>`
      }
    ]
  },
  {
    name: 'Data',
    icon: 'database',
    link: '/data',
    children: [
      {
        name: 'Table',
        link: '/data/table',
        desc: `Table 설명 <span></span>`
      },
      {
        name: 'Paginator',
        link: '/data/paginator',
        desc: `Paginator 설명 <span></span>`
      },
      {
        name: 'Tree',
        link: '/data/tree',
        desc: `Tree 설명 <span></span>`
      }
    ]
  },
  {
    name: 'Panel',
    icon: 'top_panel_open',
    link: '/panel',
    children: [
      {
        name: 'Accordion',
        link: '/panel/accordion',
        desc: `Accordion 설명 <span></span>`
      },
      {
        name: 'Card',
        link: '/panel/card',
        desc: `Card 설명 <span></span>`
      },
      // {
      //   name: 'Divider',
      //   link: '/panel/divider',
      //   desc: `Divider 설명 <span></span>`
      // },
      {
        name: 'Splitter',
        link: '/panel/splitter',
        desc: `<a href="https://xieziyu.github.io/angular2-draggable/#/resizable/demo" target="_blank">angular2-draggable</a> 이용하여 Resize 구현 해당 문서 참고`
      },
      {
        name: 'Gridster',
        link: '/panel/gridster',
        desc: `Gridster 설명 <span></span>`
      }
    ]
  },
  {
    name: 'File',
    icon: 'save',
    link: '/file',
    children: [
      {
        name: 'Upload',
        link: '/file/upload',
        desc: `Upload 설명 <span></span>`
      }
    ]
  },
  {
    name: 'Menu',
    icon: 'menu',
    link: '/menu',
    children: [
      {
        name: 'Breadcrumb',
        link: '/menu/breadcrumb',
        desc: `이동 경로는 페이지 계층 구조에 대한 상황별 정보를 제공합니다.`
      },
      {
        name: 'ContextMenu',
        link: '/menu/contextMenu',
        desc: `솔루션 내 오른쪽 클릭(ContextMenu) <div class="msg warning">사이트에 따라 우클릭을 강제로 막는 경우도 있음</div>`
      },
      {
        name: 'GNB',
        link: '/menu/gnb',
        desc: `Global Navigation <span></span>`
      },
      {
        name: 'LNB',
        link: '/menu/lnb',
        desc: `Local Navigation 설명 <span></span>`
      },
      {
        name: 'Steps',
        link: '/menu/steps',
        desc: `Steps 설명 <span></span>`
      },
      {
        name: 'TabMenu',
        link: '/menu/tabMenu',
        desc: `TabMenu 설명 <span></span>`
      }
    ]
  },
  {
    name: 'Messages',
    icon: 'forum',
    link: '/messages',
    children: [
      {
        name: 'LetterAvatar',
        link: '/messages/letterAvatar',
        desc: `입력받은 글자를 아바타로 생성`
      },
      {
        name: 'Messages',
        link: '/messages/messages',
        desc: `솔루션내 알림을 표시하는 상태나 상황에 따른 Message`
      },
      // {
      //   name: 'Toast',
      //   link: '/messages/toast',
      //   desc: `Toast 설명 <span></span>`
      // }
    ]
  },
  {
    name: 'Menu Depth1',
    icon: 'account_tree',
    link: '/menu',
    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
    children: [
      {
        name: 'Menu Depth1-1',
        link: '/menu/depth1',
        desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
        children: [
          {
            name: 'Menu Depth1-1-1',
            link: '/menu/depth1/depth1-1',
            desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
            children: [
              {
                name: 'Menu Depth1-1-1',
                link: '/menu/depth1/depth1-1/depth1-1-1',
                desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
                children: [
                  {
                    name: 'Menu Depth1-1-1-1',
                    link: '/menu/depth1/depth1-1/depth1-1-1/depth1-1-1-1',
                    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Menu Depth1-2',
        link: '/menu/depth2',
        desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
        children: [
          {
            name: 'Menu Depth1-2-1',
            link: '/menu/depth2/depth2-1',
            desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
            children: [
              {
                name: 'Menu Depth1-2-1',
                link: '/menu/depth2/depth2-1/depth1-1-1',
                desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
                children: [
                  {
                    name: 'Menu Depth1-2-1-1',
                    link: '/menu/depth2/depth2-1/depth1-1-1/depth1-1-1-1',
                    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'Menu Depth1-3',
        link: '/menu/depth3',
        desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
        children: [
          {
            name: 'Menu Depth1-3-1',
            link: '/menu/depth3/depth1-1',
            desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
            children: [
              {
                name: 'Menu Depth1-3-1',
                link: '/menu/depth3/depth1-1/depth1-1-1',
                desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
                children: [
                  {
                    name: 'Menu Depth1-3-1-1',
                    link: '/menu/depth3/depth3-1/depth3-1-1/depth3-1-1-1',
                    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`
                  }
                ]
              },
              {
                name: 'Menu Depth1-3-2',
                link: '/menu/depth3/depth3-2/depth1-1-1',
                desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`,
                children: [
                  {
                    name: 'Menu Depth1-3-2-1',
                    link: '/menu/depth3/depth3-2/depth3-2-1/depth3-2-1-1',
                    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`
                  },
                  {
                    name: 'Menu Depth1-3-2-2',
                    link: '/menu/depth3/depth3-1/depth3-2-2/depth3-2-2-2',
                    desc: `솔루현내 알림을 표시하는 상태나 상황에 따른 Message`
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  /*{
    name: 'Drag&Drop',
    icon: 'drag_pan',
    link: 'dragDrop',
    children: [
      {
        name: 'Drag & Drop',
        link: 'dragDrop/dragDrop',
        desc: `Drag & Drop 설명 <span></span>`
      }
    ]
  },*/
  /*{
    name: 'Misc',
    icon: 'sync_saved_locally',
    link: 'misc',
    children: [
      {
        name: 'Avatar',
        link: 'misc/avatar',
        desc: `Avatar 설명 <span></span>`
      },
      {
        name: 'Badge',
        link: 'misc/badge',
        desc: `Badge 설명 <span></span>`
      },
      {
        name: 'BlockUI',
        link: 'misc/blockUI',
        desc: `BlockUI 설명 <span></span>`
      },
      {
        name: 'Chip',
        link: 'misc/chip',
        desc: `Chip 설명 <span></span>`
      },
      {
        name: 'Inplace',
        link: 'misc/inplace',
        desc: `Inplace 설명 <span></span>`
      },
      {
        name: 'ScrollTop',
        link: 'misc/scrollTop',
        desc: `ScrollTop 설명 <span></span>`
      },
      {
        name: 'Skeleton',
        link: 'misc/skeleton',
        desc: `Skeleton 설명 <span></span>`
      },
      {
        name: 'ProgressBar',
        link: 'misc/progressBar',
        desc: `ProgressBar 설명 <span></span>`
      },
      {
        name: 'ProgressSpinner',
        link: 'misc/progressSpinner',
        desc: `ProgressSpinner 설명 <span></span>`
      },
      {
        name: 'Tag',
        link: 'misc/tag',
        desc: `Tag 설명 <span></span>`
      },
    ]
  },*/
];

export interface menuType {
  title: string;
  anchor: string;
  desc?: string;
}


export const BREADCRUMB_SAMPLE = [{"name":"Menu","menu":[{"name":"Typography","icon":"text_fields","link":"/typography","desc":"Datatree UI Noto Sans를 기반으로 한 Typography"},{"name":"Form","icon":"edit_note","link":"/form","children":[{"name":"Auto Complete","link":"/form/autoComplete","desc":"검색어 자동완성, 검색어 추천"},{"name":"Calendar","link":"/form/calendar","desc":"<b>날짜</b> 혹은 <b>시간</b> 선택을 위한 Calendar"},{"name":"Checkbox","link":"/form/checkbox","desc":"<b>테마, 사이즈별, 그룹화</b> 등이 포함된 표준 Checkbox"},{"name":"Chips","link":"/form/chips","desc":"<b>키워드, 목록</b> 등 String Array를 관리하기 위한 Chip Group"},{"name":"Color Picker","link":"/form/colorPicker","desc":"Color Picker 설명 <span></span>"},{"name":"Dropdown","link":"/form/dropdown","desc":"Dropdown 설명 <span></span>"},{"name":"Editor","link":"/form/editor","desc":"Editor 설명 <span></span>"},{"name":"Input","link":"/form/input","desc":"Input 설명 <span></span>"},{"name":"Knob","link":"/form/knob","desc":"Knob 설명 <span></span>"},{"name":"Select","link":"/form/select","desc":"Select 설명 <span></span>"},{"name":"Radio","link":"/form/radio","desc":"Radio 설명 <span></span>"},{"name":"Rating","link":"/form/rating","desc":"Rating 설명 <span></span>"},{"name":"Slider","link":"/form/slider","desc":"Slider 설명 <span></span>"}]},{"name":"Button","icon":"left_click","link":"/button","children":[{"name":"Button","link":"/button/button","desc":"<b>테마, 사이즈별, 아이콘, 라벨</b> 등이 포함된 표준 Button"},{"name":"SplitButton","link":"/button/splitButton","desc":"<b>Menu</b>와 <b>Button</b>이 혼합된 표준 Split Button"},{"name":"Speed Dial","link":"/button/speedDial","desc":"Speed Dial 설명 <span></span>"}]},{"name":"Data","icon":"database","link":"/data","children":[{"name":"Table","link":"/data/table","desc":"Table 설명 <span></span>"},{"name":"Paginator","link":"/data/paginator","desc":"Paginator 설명 <span></span>"},{"name":"Tree","link":"/data/tree","desc":"Tree 설명 <span></span>"}]},{"name":"Panel","icon":"top_panel_open","link":"/panel","children":[{"name":"Accordion","link":"/panel/accordion","desc":"Accordion 설명 <span></span>"},{"name":"Card","link":"/panel/card","desc":"Card 설명 <span></span>"},{"name":"Divider","link":"/panel/divider","desc":"Divider 설명 <span></span>"},{"name":"Splitter","link":"/panel/splitter","desc":"Splitter 설명 <span></span>"}]},{"name":"File","icon":"save","link":"/file","children":[{"name":"Upload","link":"/file/upload","desc":"Upload 설명 <span></span>"}]},{"name":"Menu","icon":"menu","link":"/menu","children":[{"name":"Breadcrumb","link":"/menu/breadcrumb","desc":"이동 경로는 페이지 계층 구조에 대한 상황별 정보를 제공합니다."},{"name":"ContextMenu","link":"/menu/contextMenu","desc":"ContextMenu 설명 <span></span>"},{"name":"Gnb","link":"/menu/gnb","desc":"Global Navigation <span></span>"},{"name":"Lnb","link":"/menu/lnb","desc":"Local Navigation 설명 <span></span>"},{"name":"Menu","link":"/menu/menu","desc":"Menu 설명 <span></span>"},{"name":"Steps","link":"/menu/steps","desc":"Steps 설명 <span></span>"},{"name":"TabMenu","link":"/menu/tabMenu","desc":"TabMenu 설명 <span></span>"}]},{"name":"Messages","icon":"forum","link":"/messages","children":[{"name":"Messages","link":"/messages/messages","desc":"Messages 설명 <span></span>"},{"name":"Toast","link":"/messages/toast","desc":"Toast 설명 <span></span>"}]}],"index":6},{"name":"Breadcrumb","menu":[{"name":"Breadcrumb","link":"/menu/breadcrumb","desc":"이동 경로는 페이지 계층 구조에 대한 상황별 정보를 제공합니다."},{"name":"ContextMenu","link":"/menu/contextMenu","desc":"ContextMenu 설명 <span></span>"},{"name":"Gnb","link":"/menu/gnb","desc":"Global Navigation <span></span>"},{"name":"Lnb","link":"/menu/lnb","desc":"Local Navigation 설명 <span></span>"},{"name":"Menu","link":"/menu/menu","desc":"Menu 설명 <span></span>"},{"name":"Steps","link":"/menu/steps","desc":"Steps 설명 <span></span>"},{"name":"TabMenu","link":"/menu/tabMenu","desc":"TabMenu 설명 <span></span>"}],"index":0}];

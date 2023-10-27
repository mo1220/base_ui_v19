import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { map, take, pluck } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  findPath(tree: any, target: any) {
    // 경로를 저장할 배열
    let path: any = [];
    // 재귀적으로 탐색하는 함수
    function search(node: any) {
      // 노드가 없으면 탐색 종료
      if (!node) return false;
      // 현재 노드가 목표 노드이면 경로 반환
      if (node._id === target) {
        path.push(node.name);
        return true;
      }
      // 현재 노드가 목표 노드가 아니면 자식 노드를 탐색
      if (node.children) {
        path.push(node.name);
        for (let child of node.children) {
          if (search(child)) {
            return true;
          }
        }
        path.pop();
      }
      return false;
    }
    // 트리를 루트 노드부터 탐색
    search(tree);
    // 경로를 뒤집어서 시작점부터 끝점까지 반환
    if(path) return path.join(' > '); // .reverse()
  }

  /**
   * Key 찾기
   * @param 찾을 대상 Object
   * @param string|array
   * @returns [path,path,...]
   */
  // deepFindKey(obj, find){
  //   var findPaths = [];
  //   var isArr = Object.prototype.toString.call( find ) === '[object Array]' ;
  //   _.deepMapValues(obj,function(val,path){
  //     if( isArr ){
  //       if( _.indexOf(find,path[path.length-1]) > -1 ){
  //         findPaths.push(path)
  //       }
  //     }else if( find == path[path.length-1] ){
  //       findPaths.push(path)
  //     }
  //   });
  //   return findPaths;
  // }

  /**
   * Value 찾기
   * @param 찾을 대상 Object
   * @param string|array
   * @returns [path,path,...]
   */
  // deepFindValue(obj, find){
  //   var findPaths = [];
  //   var isArr = Object.prototype.toString.call( find ) === '[object Array]' ;
  //   _.deepMapValues(obj,function(val,path){
  //     if( isArr ){
  //       if( _.indexOf(find,val) > -1 ){
  //         findPaths.push(path)
  //       }
  //     }else if( find == val ){
  //       findPaths.push(path)
  //     }
  //   });
  //   return findPaths;
  // }

  /**
   * Key + Value 찾기
   * @param 찾을 대상 Object
   * @param object
   * @returns [path,path,...]
   *
   * ex) deep_find(obj, {
   *     keyName1 : [ 'findValue1, findValue2 ],
   *     keyName2 : 'findValue3'
   *    })
   *
   */
  // deepFind(obj, findObj){
  //   var findPaths = [];
  //   _.deepMapValues(obj,function(val,path){
  //     //console.log(val,path)
  //     var lastPath = path[path.length-1];
  //     _.forEach(findObj,function(v,k){
  //       if( Object.prototype.toString.call( v ) === '[object Array]'){
  //         if( k == lastPath && _.indexOf(v,val) > -1 ){
  //           findPaths.push(path)
  //         }
  //       }else{
  //         if( k == lastPath && v == val ){
  //           findPaths.push(path)
  //         }
  //       }
  //     })
  //   });
  //   return findPaths;
  // }
  // deepFindReturn(obj,findObj){
  //   var res = this.deepFind(obj,findObj);
  //   return res.map(function(path){
  //     return _.get(obj,path.slice(0,-1));
  //   })
  // }

  // deepRemove(obj, path){
  //   if( path.length > 0 && Object.prototype.toString.call( path[0] ) === '[object Array]' ) { //2중 배열인 경우 삭제 대상이 복수
  //     //역순으로 지우지 않으면 index 가 꼬여서 잘못된 데이터가 삭제될 수 있어 역순으로 변경
  //     path.map(function(o){
  //       return o.map(function(s) {
  //         return isNaN(s) ? s.replace(/\./g, '!#!') : s;
  //       }).join('.')
  //     })
  //       .sort()
  //       .reverse()
  //       .map(function(o){
  //         return o.split('.').map(function(s){
  //           return isNaN(s) ? s.replace(/!#!/g,'.') : Number(s)
  //         })
  //       })
  //       .forEach(function(p){
  //         this.deepRemove(obj, p);
  //       })
  //   } else {
  //     var lastPath = path.pop();
  //     var pobj = _.get(obj,path);
  //     if( Object.prototype.toString.call( pobj ) === '[object Array]' ){ //array
  //       pobj.splice(lastPath,1)
  //     }else{ //object
  //       delete pobj[lastPath];
  //       //pobj[path.slice(-1,1)] = undefined; //performance issue
  //     }
  //     _.set(obj, path,pobj);
  //   }
  // }

  /**
   * [[data],[data]] 를 입력받아 받은 key로 합집합으로 하나의 배열을 리턴
   */
  deepDuplicate(data: any, key: any) {
    const result: any = [];
    data.map(function(dataitem: any) {
      dataitem.map(function(item: any) {
        let ck = true;
        result.map(function(o: any) {
          if (o[key] == item[key]) {
            ck = false;
          }
        });
        if (ck) {
          result.push(item);
        }
      });
    });
    return result;
  }

  /**
   * @function searchTree Tree 형태 찾기
   * @params node: Tree Data, key: 찾을대상 Key, value: 값
   * */
  searchTree(node: any, key: any, value: any){
    if(node[key] == value){
      return node;
    } else if (node.children && node.children.length > 0){
      let result: any = null;
      for(let i = 0; result == null && i < node.children.length; i++){
        result = this.searchTree(node.children[i], key, value);
      }
      return result;
    }
    return null;
  }

  /*
   * State 값만 return 받아오기
   * */
  getState(store: any, selector?: any) {
    let _state: any;
    let state$: any;

    if (typeof selector === 'string' && /\./g.test(selector)) {
      state$ = store.pipe(pluck(...selector.split('.')));
    } else if (typeof selector === 'string') {
      state$ = store.pipe(map((state: any) => state[selector]));
    } else if (typeof selector === 'function') {
      state$ = store.pipe(map(state => selector(state)));
    } else {
      state$ = store;
    }
    state$.pipe(take(1)).subscribe((o: any) => (_state = o));
    return _state;
  }

  /*
   * Pagination Service
   * */
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  /*
  * Tree 구조 Find
  * */
  findTree(datas: any, key: any, value: any) {
    let result;
    let res: any;
    const findData = (d: any) => {
      for (let i = 0; i < d.length; i++) {
        if(d[i][key] === value) {
          res = d[i];
          break;
        }
      }
      if(res === undefined) {
        for (let i = 0; i < d.length; i++) {
          res = findData(d[i].children);
        }
      }
      return res;
    }
    result = findData(datas);
    return result;
  }


  /**
   * @function getArrayDataType 필드 타입구하기
   * @params data: Data, field_list: Field List Arr, first_data_row_idx: Data 첫시작 Index, last_data_row_idx: 마지막 Index
   * */
  getArrayDataType(data: any, field_list: any, first_data_row_idx: any, last_data_row_idx: any){
    const vm = this;
    let tmp: any = {};
    let type = -1;
    let i = 0;
    const len = data.length;
    if(len < last_data_row_idx){
      last_data_row_idx = len;
    }
    if(last_data_row_idx > 100) last_data_row_idx = 100;

    field_list.forEach(function(field: any, idx: any){
      for( i = first_data_row_idx; i < last_data_row_idx; i++){
        if(data[i][field]) {
          type = vm.getDataType(data[i][field]);
          if(tmp[field] == undefined){
            tmp[field] = type;
          }else{
            if(tmp[field] != type){
              tmp[field] = 2;
              break;
            }else{
              tmp[field] = type;
            }
          }
          if(type == 2){//STRING
            break;
          }
        }
      }
    });
    field_list.forEach(function(field: any){
      // @ts-ignore
      switch(tmp[field]){
        case 0:
          // @ts-ignore
          tmp[field] = "series"; // 숫자
          break;
        case 1:
          // @ts-ignore
          tmp[field] = 'category'; // "time"; TODO 시간이 잘 안 먹힘
          break;
        case 3:
          // @ts-ignore
          tmp[field] = "excluded"; // 제외
          break;
        default:
          // @ts-ignore
          tmp[field] = "category"; //
          break;
      }
    });
    return tmp;
  }

  getDataType(data: any): number {
    // const moment = require('moment-timezone');
    const formats = [
      moment.ISO_8601,
      "YYYY년MM월DD일HH시mm분ss초",
      "YYYY년MM월DD일 HH시mm분ss초",
      "YYYY년 MM월 DD일",
      "YYYY/MM/DD",
      "YYYY/MM/DD HH/mm/ss",
      "YYYY/MM/DD HH:mm:ss"
    ];
    if(typeof(data) == 'number'){
      return 0;//"NUMBER";
    } else {
      if (isNaN(_.toNumber(data)) == false) {//숫자
        return 0;//"NUMBER";
      } else if(moment(data, formats, true).isValid()) {
        return 1;//"DATE";
      } else {
        if(isNaN(_.toNumber(data.replace(/,/g,''))) == false){ // 숫자
          return 0;//"NUMBER";
        }
        if(data.replace(/[*]/g,'') == ''){ // 예외
          return 3; //"NUMBER";
        }
        return 2;//"STRING"
      }
    }
  }

  /**
  * @function inputCategories
   * @param categories: 카테고리 값, inputs: 입력값
  * */
  inputCategories(categories: any, inputs: any): Array<any> {
    const cate_groups = _.groupBy(inputs, 'category');
    const cateParams = _.reduce(categories, (r, v) => {
      if(cate_groups[v.key]) { // 값이 있을때
        const val = _.map(_.sortBy(cate_groups[v.key], 'idx'), d1 => {
          const children = [ v.children ];
          const dt = { ...d1 };
          delete dt.category;
          delete dt.idx;
          const p: any = {};
          _.forEach(dt, (v2, k2) => {
            const key = Number(k2.replace('lv', '')) - 1;
            const next_children = children[key].length > 0 ? _.find(children[key], d3 => d3.value === v2).children : [];
            children.push(next_children);
            p[k2 + '_items'] = children[key];
          });
          return { ...dt, ...p };
        });
        // @ts-ignore
        r.push({ category: v.key, value: v.multi_input ? val : val[0] });
      } else { // 값이 없을때
        const lv = new Array(v.max_level);
        const val = _.reduce(lv, (r1: any,v1,k1) => {
          r1['lv' + (k1 + 1)] = null;
          r1['lv' + (k1 + 1) + '_items'] = k1 === 0 ? [ ...v.children ] : [];
          return r1;
        }, {});
        const param = v.multi_input ? [{ ...val }] : { ...val };
        // @ts-ignore
        r.push({ category: v.key, value: param });
      }
      return r;
    }, []);
    return cateParams;
  }


  /**
   * @function listToTree 보고서 폴더
   * @param list: Flat 한 Array
   * @param idKey: id에 키값
   * @param parentKey: parent id에 키값
   * @param rootId: root에 Id값
   * */
  listToTree(
    list: any[] = [],
    idKey: string = 'id',
    parentKey: string = 'parent_id',
    rootId: string = 'root'
  ): Array<any> {
    let map: any = {}, node: any, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i][idKey]] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = {
        ...list[i],
        object_pre_name: list[i].object_name,
        object_name: list[i].object_name.replace(/^(\s*\d*\.\s*)/, '')
      };
      if (node[parentKey] !== rootId) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node[parentKey]]].children.push(node);
      } else {
        // @ts-ignore
        roots.push(node);
      }
    }
    return roots;
  }

  treePath(
    list: any[] = [],
    idKey: string = 'id',
    value: string = '',
    returnKey: string = ''
  ) {
    const treePath = function(struct: any, cmp: any) {
      if (struct[idKey] === cmp) {
        return [];
      } else if (struct.children.length > 0) {
        for (let i = 0; i < struct.children.length; i++) {
          let path: any = treePath(struct.children[i], cmp);
          if (path !== null) {
            path.unshift(struct.children[i][returnKey]);
            return path;
          }
        }
      }
      return null;
    };

    let res = [];
    for (let i = 0; i < list.length; i++) {
      let path = treePath(list[i], value);
      if (path !== null) {
        path.unshift(list[i][returnKey]);
        res = _.cloneDeep(path);
      }
    }
    return res;
  }
}

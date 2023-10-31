export interface TreeNodeType {
  name: string; // 폴더 이름
  parentId: any; // 부모 폴더 Id
  children?: Array<TreeNodeType>; // 자식 폴더
  _id: any;
  id?: any; // angular-tree 에서 자동으로 생성되는 id
}

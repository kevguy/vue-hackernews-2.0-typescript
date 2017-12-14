interface List {
  top: Array<number>;
  new: Array<number>;
  show: Array<number>;
  ask: Array<number>;
  job: Array<number>;
  [key: string]: Array<number>;
}

interface State {
  activeType: string | null;
  itemsPerPage: number;
  items: any;
  users: any;
  lists: List;
}

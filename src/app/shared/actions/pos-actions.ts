import {PosStateModel} from '../models/pos';

export class AddPosAction {
  static readonly type = '[Add POS] Add Pos on state';
  pos: PosStateModel;
  constructor(pos: PosStateModel) {
    this.pos = pos;
  }
}

export class RemovePosAction {
  static readonly type = '[Remove POS] Remove Pos on state';
  pos: PosStateModel;
  constructor(pos: PosStateModel) {
    this.pos = pos;
  }
}

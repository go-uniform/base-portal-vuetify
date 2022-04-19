import {ISection} from '@/services/base/global.interfaces';

export interface ISectionColumnDefinition {
  cols?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;

  childCols?: number;
  childXl?: number;
  childLg?: number;
  childMd?: number;
  childSm?: number;
  childXs?: number;
}

export class Section implements ISection {
  title: string;
  fieldKeys: string[];

  constructor(title: string, fieldKeys: string[], columns?: ISectionColumnDefinition) {
    this.title = title;
    this.fieldKeys = fieldKeys;
    if (columns) {
      this.cols = columns.cols;
      this.xl = columns.xl;
      this.lg = columns.lg;
      this.md = columns.md;
      this.sm = columns.sm;
      this.xs = columns.xs;

      this.childCols = columns.childCols;
      this.childXl = columns.childXl;
      this.childLg = columns.childLg;
      this.childMd = columns.childMd;
      this.childSm = columns.childSm;
      this.childXs = columns.childXs;
    }
  }

  cols?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;

  childCols?: number;
  childXl?: number;
  childLg?: number;
  childMd?: number;
  childSm?: number;
  childXs?: number;


  getCols(): number {
    return this.cols || 12;
  }

  getXl(): number {
    return this.xl || this.lg || this.md || this.sm || this.xs || this.cols || 12;
  }

  getLg(): number {
    return this.lg || this.md || this.sm || this.xs || this.cols || 12;
  }

  getMd(): number {
    return this.md || this.sm || this.xs || this.cols || 12;
  }

  getSm(): number {
    return this.sm || this.xs || this.cols || 12;
  }

  getXs(): number {
    return this.xs || this.cols || 12;
  }


  getChildCols(): number {
    return this.childCols || 12;
  }

  getChildXl(): number {
    return this.childXl || this.childLg || this.childMd || this.childSm || this.childXs || this.childCols || 12;
  }

  getChildLg(): number {
    return this.childLg || this.childMd || this.childSm || this.childXs || this.childCols || 12;
  }

  getChildMd(): number {
    return this.childMd || this.childSm || this.childXs || this.childCols || 12;
  }

  getChildSm(): number {
    return this.childSm || this.childXs || this.childCols || 12;
  }

  getChildXs(): number {
    return this.childXs || this.childCols || 12;
  }
}

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface TextStyle {
  fontSize: number;
  color: string;
  outline: boolean;
  shadow: boolean;
  bold: boolean;
}

export interface MemeText {
  id: string;
  text: string;
  style: TextStyle;
  position: {
    x: number;
    y: number;
  };
}

export interface SearchHistoryItem {
  term: string;
  timestamp: number;
}
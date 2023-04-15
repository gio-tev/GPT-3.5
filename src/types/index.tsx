export type FlatListItemPropTypes = {
  item: {role: string; content: string};
  index: number;
  currentResponse: string;
  data: {role: string; content: string}[];
};

export type InputPropTypes = {
  inputValue: string;
  handleInput: (text: string) => void;
  handleSubmit: () => void;
};

export type MessageTypes = {
  role: string;
  content: string;
}[];

export class Note {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  color: string;

  constructor(id: string, title: string, content: string, date: Date, color: string = "slate") {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_at = date;
    this.color = color;
  }
}

export class User {
  id: string;
  username: string;
  created_at: Date;
  selected_color: string;
  notes: Note[];

  constructor(
    id: string,
    username: string,
    created_at: Date,
    selected_color: string,
    notes: Note[]
  ) {
    this.id = id;
    this.username = username;
    this.notes = notes;
    this.created_at = created_at;
    this.selected_color = selected_color;
  }
}

class Color {
  id!: string;
  name!: string;
  hex!: string;

  constructor(id: string, name: string, hex: string) {
    this.id = id;
    this.name = name;
    this.hex = hex;
  }
}

export let noteColors = new Map<string, Color>([
  ["slate", new Color("slate", "Slate", "#e2e8f0")],
  ["rose", new Color("rose", "Rose", "#fecdd3")],
  ["red", new Color("red", "Red", "#fecaca")],
  ["orange", new Color("red", "Orange", "#fed7aa")],
  ["yellow", new Color("red", "Yellow", "#fef08a")],
  ["lime", new Color("lime", "Lime", "#d9f99d")],
  ["green", new Color("green", "Green", "#bbf7d0")],
  ["teal", new Color("teal", "Teal", "#99f6e4")],
  ["cyan", new Color("cyan", "Cyan", "#a5f3fc")],
  ["blue", new Color("blue", "Blue", "#bfdbfe")],
  ["indigo", new Color("indigo", "Indigo", "#c7d2fe")],
  ["violet", new Color("violet", "Violet", "#ddd6fe")],
  ["purple", new Color("purple", "Purple", "#e9d5ff")],
  ["pink", new Color("pink", "Pink", "#fbcfe8")]
]);

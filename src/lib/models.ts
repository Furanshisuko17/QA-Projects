export class Note {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  color: Color;

  constructor(
    id: string,
    title: string,
    description: string,
    date: Date,
    color: Color = noteColors.get("slate")!
  ) {
    this.id = id;
    this.title = title;
    this.content = description;
    this.created_at = date;
    this.color = color;
  }
}

export class User {
  id: string;
  username: string;
  notes: Note[];
  created_at: Date;

  constructor(id: string, username: string, notes: Note[], created_at: Date) {
    this.id = id;
    this.username = username;
    this.notes = notes;
    this.created_at = created_at;
  }
}

class Color {
  id: string;
  name: string;
  hex: string;

  constructor(id: string, name: string, hex: string) {
    this.id = id;
    this.name = name;
    this.hex = hex;
  }
}

export let noteColors = new Map<string, Color>([
  ["slate", new Color("slate", "Slate", "#cbd5e1")],
  ["rose", new Color("rose", "Rose", "#fb7185")],
  ["red", new Color("red", "Red", "#f87171")],
  ["orange", new Color("red", "Orange", "#fb923c")],
  ["yellow", new Color("red", "Yellow", "#facc15")],
  ["lime", new Color("lime", "Lime", "#a3e635")],
  ["green", new Color("green", "Green", "#4ade80")],
  ["teal", new Color("teal", "Teal", "#99f6e4")],
  ["cyan", new Color("cyan", "Cyan", "#22d3ee")],
  ["blue", new Color("blue", "Blue", "#60a5fa")],
  ["indigo", new Color("indigo", "Indigo", "#818cf8")],
  ["violet", new Color("violet", "Violet", "#a78bfa")],
  ["purple", new Color("purple", "Purple", "#c084fc")],
  ["pink", new Color("pink", "Pink", "#f472b6")]
]);

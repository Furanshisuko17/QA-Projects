export class Note {
  id: string;
  title: string;
  description: string;
  date: Date;

  constructor(id: string, title: string, description: string, date: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

export class User {
  id: string;
  username: string;
  notes: Note[];

  constructor(id: string, username: string, notes: Note[]) {
    this.id = id;
    this.username = username;
    this.notes = notes;
  }
}

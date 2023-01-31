function ShowAddNote(){
    document.querySelector('.Notes').style.display = 'block';
}


class Note {
    constructor(title, describe, noteColor) {
      this.title = title;
      this.describe = describe;
      this.noteColor = noteColor;
    }
}



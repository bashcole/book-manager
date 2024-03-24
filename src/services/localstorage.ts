import { v4 as uuidv4 } from 'uuid';
import {Note} from "@/interfaces/note.ts";


const initializeNotes = (): void => {
    if (!localStorage.getItem('notes')) {
        localStorage.setItem('notes', JSON.stringify([]));
    }
};

export const addNote = (book_title: string, book_author: string, content: string): void => {
    initializeNotes();
    const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
    const newNote: Note = { id: uuidv4(), book_title, book_author, content, last_updated: Date.now() };

    // insert at the bottom
    // notes.push(newNote);

    // insert at the top
    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
};

export const getAllNotes = (): Note[] => {
    initializeNotes();
    return JSON.parse(localStorage.getItem('notes') || '[]');
};

export const removeNote = (id: string): void => {
    const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
    const filteredNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
};

export const updateNote = (id: string, newNoteContent: string): void => {
    const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]');
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex].content = newNoteContent;
        notes[noteIndex].last_updated = Date.now();
        localStorage.setItem('notes', JSON.stringify(notes));
    }
};

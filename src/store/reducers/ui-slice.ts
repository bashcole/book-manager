import {createSlice} from '@reduxjs/toolkit';
import {Note} from "@/interfaces/note.ts";
import {Book} from "@/interfaces/book.ts";

export type UiState = {
    searchTerm: string,
    isLoading: boolean;
    isAddNoteModalOpen: boolean,
    isConfirmDeleteNoteModalOpen: boolean,
    isEditNoteModalOpen: boolean,
    selectedNote?: Note,
    selectedBook?: Book,
    notes?: Note[],
}

const initialState: UiState = {
    searchTerm: '',
    isLoading: false,
    isAddNoteModalOpen: false,
    isConfirmDeleteNoteModalOpen: false,
    isEditNoteModalOpen: false,
    selectedNote: undefined,
    selectedBook: undefined,
    notes: undefined,
};

const UISlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        openAddNoteModal: (state) => {
            state.isAddNoteModalOpen = true;
        },
        closeDeleteConfirmNoteModal: (state) => {
            state.isConfirmDeleteNoteModalOpen = false;
        },
        openDeleteConfirmNoteModal: (state) => {
            state.isConfirmDeleteNoteModalOpen = true;
        },
        closeAddNoteModal: (state) => {
            state.isAddNoteModalOpen = false;
            state.selectedBook = undefined;
        },
        openEditNoteModal: (state) => {
            state.isEditNoteModalOpen = true;
        },
        closeEditNoteModal: (state) => {
            state.isEditNoteModalOpen = false;
            state.selectedNote = undefined;
        },
        setSelectBookToAdd: (state, action) => {
            state.selectedBook = action.payload;
            state.isAddNoteModalOpen = true;
        },
        setSelectNoteToEdit: (state, action) => {
            state.selectedNote = action.payload;
            state.isEditNoteModalOpen = true;
        },
        setSelectNoteToDelete: (state, action) => {
            state.selectedNote = action.payload;
            state.isConfirmDeleteNoteModalOpen = true;
        },
    },
})

export const uiActions = UISlice.actions;
export default UISlice.reducer
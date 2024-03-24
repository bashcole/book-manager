import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStore} from "@/store";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {AnimatePresence, motion} from "framer-motion";
import {getAllNotes} from "@/services/localstorage.ts";
import ConfirmDeleteNoteModal from "@/compotents/Modal/variants/ConfirmDeleteNoteModal.tsx";
import NoteItem from "@/compotents/Sections/MyBooks/NoteItem.tsx";
import EditNoteModal from "@/compotents/Modal/variants/EditNoteModal.tsx";
import {Note} from "@/interfaces/note.ts";

function MyBooks() {
    const dispatch = useDispatch();
    const notes = useSelector<IRootStore, Note[] | undefined>(state => state.ui.notes);

    const isConfirmDeleteNoteModalOpen = useSelector<IRootStore, boolean>(state => state.ui.isConfirmDeleteNoteModalOpen)
    const isEditNoteModalOpen = useSelector<IRootStore, boolean>(state => state.ui.isEditNoteModalOpen)

    useEffect(() => {
        dispatch(uiActions.setNotes(getAllNotes()));
    }, [dispatch]);

    const onCloseDeleteConfirm = () => {
        dispatch(uiActions.closeDeleteConfirmNoteModal());
    }

    const onCloseEditNote = () => {
        dispatch(uiActions.closeEditNoteModal());
    }

    return (
        <>
            <ConfirmDeleteNoteModal isOpen={isConfirmDeleteNoteModalOpen} onClose={onCloseDeleteConfirm}/>
            <EditNoteModal isOpen={isEditNoteModalOpen} onClose={onCloseEditNote}/>
            <div className="text-2xl font-bold text-gray-900">My Books</div>
            <div className="flex flex-col gap-4 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {notes && notes.length > 0 ? (
                        notes.map((note) => (
                            <motion.div
                                layout
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{type: "spring", stiffness: 100}}
                                key={note.id}
                            >
                                <NoteItem note={note}/>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center text-gray-700">
                            No notes added yet.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default MyBooks;

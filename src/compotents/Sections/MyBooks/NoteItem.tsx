import {TrashIcon} from "@heroicons/react/24/solid";
import {uiActions} from "@/store/reducers/ui-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "@/store";
import React, {useEffect} from "react";
import {motion, useAnimation} from 'framer-motion';
import {Note} from "@/interfaces/note.ts";

function NoteItem({note}: { note: Note }) {

    const controls = useAnimation();
    const dispatch = useDispatch();
    const selectedNote = useSelector<IRootStore, Note | undefined>((state) => state.ui.selectedNote);

    const isSelected = note.id === selectedNote?.id;

    const handleClick = () => {
        dispatch(uiActions.setSelectNoteToEdit(note));
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, note: Note) => {
        event.stopPropagation();
        dispatch(uiActions.setSelectNoteToDelete(note));
    }

    const itemClassName = `cursor-pointer bg-white w-full rounded-xl p-6 border-4 relative ${
        isSelected ? "border-blue-500" : "border-transparent"
    }`;

    useEffect(() => {
        const sequence = async () => {
            await controls.start({scale: 1.05, opacity: 0.7, transition: {duration: 0.2}});
            await controls.start({scale: 1, opacity: 1, transition: {duration: 0.2}});
        };

        sequence().then(r => console.log(r));
    }, [note.last_updated, controls]);

    return (
        <motion.div
            animate={controls} className={itemClassName} onClick={handleClick}>
            <div className="text-lg font-bold text-gray-900 mb-4">{note.book_title}</div>
            <div className="flex flex-col gap-3">
                <div>
                    <div className="text-md text-gray-500 font-bold mb-1">Author:</div>
                    <div className="text-md text-gray-700">{note.book_author}</div>
                </div>
                <div>
                    <div className="text-md text-gray-500 font-bold mb-1">Notes:</div>
                    <div className="text-md text-gray-700">{note.content}</div>
                </div>
            </div>


            <div className="absolute top-0 right-0 pr-4 pt-4 flex items-center">
                <button
                    onClick={(event) => handleDelete(event, note)}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-400 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
        </motion.div>
    )
}

export default NoteItem

import React, {forwardRef, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon?: React.ReactNode;
    onSubmit?: () => void;
    body: React.ReactNode;
    footer: React.ReactNode;
};

type ConditionalFormWrapperProps = {
    onSubmit?: () => void;
    children: React.ReactNode;
}

const ConditionalFormWrapper = forwardRef<HTMLFormElement, ConditionalFormWrapperProps>(
    ({onSubmit, children}, ref) => {

        return onSubmit ? (
            <form ref={ref} onSubmit={onSubmit}>{children}</form>
        ) : (
            // @ts-ignore
            <div ref={ref}>{children}</div>
        );
    }
);

function Modal({isOpen, onClose, onSubmit, title, icon, body, footer}: ModalProps) {

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={onClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <ConditionalFormWrapper onSubmit={onSubmit}>

                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {icon}
                                        <div
                                            className={`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ${icon ? '' : 'flex-1'}`}>
                                            <Dialog.Title as="h3"
                                                          className="text-xl leading-6 font-medium text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {body}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {footer}

                            </ConditionalFormWrapper>

                        </div>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Modal

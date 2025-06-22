// components/FAQEditor.js
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';

// A leaner, reusable toolbar for each FAQ's answer editor
const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    const [_, setForceUpdate] = useState(0);
    useEffect(() => {
        if (editor) {
            const updateHandler = () => setForceUpdate(c => c + 1);
            editor.on('transaction', updateHandler);
            return () => editor.off('transaction', updateHandler);
        }
    }, [editor]);

    return (
        <div className="flex align-middle gap-x-0.5 border-b border-stone-200 p-2 dark:bg-neutral-800 dark:border-neutral-700">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`btn-toolbar ${editor.isActive('bold') ? 'active' : ''}`}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path d="M15 20a4 4 0 0 0 0-8H6v8Z" /></svg>
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`btn-toolbar ${editor.isActive('underline') ? 'active' : ''}`}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" x2="20" y1="20" y2="20" /></svg>
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`btn-toolbar ${editor.isActive('bulletList') ? 'active' : ''}`}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`btn-toolbar ${editor.isActive('orderedList') ? 'active' : ''}`}>
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6" /><line x1="10" x2="21" y1="12" y2="12" /><line x1="10" x2="21" y1="18" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></svg>
            </button>
        </div>
    );
};

const AnswerEditor = ({ content, onContentChange }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);
    const [isEditorReady, setIsEditorReady] = useState(false);

    useEffect(() => {
        if (!editorRef.current) return;

        const editor = new Editor({
            element: editorRef.current,
            extensions: [
                StarterKit,
                Placeholder.configure({ placeholder: 'Write the answer here...' }),
                Paragraph.configure({
                    HTMLAttributes: { class: 'text-base text-stone-800 dark:text-stone-200' }
                }),
                Bold.configure({ HTMLAttributes: { class: 'font-bold' } }),
                Underline,
                Link.configure({
                    HTMLAttributes: { class: 'inline-flex items-center gap-x-1 text-green-600 decoration-2 hover:underline font-medium dark:text-green-500' }
                }),
                BulletList.configure({
                    HTMLAttributes: { class: 'list-disc list-inside text-stone-800 dark:text-white' }
                }),
                OrderedList.configure({
                    HTMLAttributes: { class: 'list-decimal list-inside text-stone-800 dark:text-white' }
                }),
                ListItem.configure({ HTMLAttributes: { class: 'marker:text-base' } }),
                Blockquote.configure({
                    HTMLAttributes: { class: 'relative border-s-4 ps-4 sm:ps-6 border-stone-300 dark:border-neutral-700 text-stone-800 dark:text-white' }
                })
            ],
            onUpdate: ({ editor }) => {
                onContentChange(editor.getHTML());
            },
            content: content || '',
        });

        editorInstance.current = editor;
        setIsEditorReady(true);

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (editorInstance.current && content !== editorInstance.current.getHTML()) {
            editorInstance.current.commands.setContent(content, false);
        }
    }, [content]);

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            <EditorToolbar editor={isEditorReady ? editorInstance.current : null} />
            <div className="overflow-auto tiptap-editor-field" ref={editorRef}></div>
        </div>
    );
};

export default function FAQEditor({ faqs, setFaqs }) {

    const addFaq = () => {
        setFaqs([
            ...faqs,
            { id: `new-${Date.now()}`, question: '', answer: '', isOpen: true }
        ]);
    };

    const deleteFaq = (id) => {
        setFaqs(faqs.filter(faq => faq.id !== id));
    };

    // MODIFIED: This function now uses the "functional update" form for setFaqs.
    // This is the fix for the state-clearing bug.
    const handleFaqChange = (id, field, value) => {
        setFaqs(currentFaqs =>
            currentFaqs.map(faq =>
                faq.id === id ? { ...faq, [field]: value } : faq
            )
        );
    };

    const toggleFaq = (id) => {
        setFaqs(faqs.map(faq => faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq));
    };

    return (
        <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
            <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
                <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
                    Frequently Asked Questions
                </h2>
            </div>
            <div className="p-5 space-y-6">
                {faqs.map((faq, index) => (
                    <div key={faq.id} className="border border-stone-200 rounded-lg dark:border-neutral-700 overflow-hidden">
                        <div
                            className="p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleFaq(faq.id)}
                        >
                            <h3 className="font-semibold text-stone-700 dark:text-neutral-300">Question {index + 1}</h3>
                            <div className="flex items-center gap-x-4">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteFaq(faq.id);
                                    }}
                                    className="text-sm font-medium text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                                <svg
                                    className={`w-5 h-5 text-stone-600 dark:text-neutral-400 transition-transform duration-300 ${faq.isOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                        <div
                            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${faq.isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
                        >
                            <div className="px-4 pb-4 space-y-3">
                                <input
                                    type="text"
                                    placeholder="Enter the question"
                                    // MODIFIED: Increased font size for a bigger input box
                                    className="py-3 px-3 block w-full border border-stone-200 rounded-lg text-base focus:border-green-500 focus:ring-green-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                                    value={faq.question}
                                    onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <AnswerEditor
                                    content={faq.answer}
                                    onContentChange={(newAnswer) => handleFaqChange(faq.id, 'answer', newAnswer)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFaq}
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    + Add FAQ
                </button>
            </div>
            <style jsx>{`
                .btn-toolbar {
                    width: 2rem;
                    height: 2rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 9999px;
                    border: 1px solid transparent;
                    color: #374151; /* stone-800 */
                }
                .btn-toolbar:hover {
                    background-color: #f5f5f4; /* stone-100 */
                }
                .btn-toolbar.active {
                    background-color: #f5f5f4; /* stone-100 */
                }
                .icon {
                    width: 1rem;
                    height: 1rem;
                    flex-shrink: 0;
                }
                .dark .btn-toolbar {
                    color: #ffffff;
                }
                .dark .btn-toolbar:hover {
                    background-color: #404040; /* neutral-700 */
                }
                .dark .btn-toolbar.active {
                    background-color: #404040; /* neutral-700 */
                }
                .tiptap-editor-field .ProseMirror {
                    padding: 0.5rem;
                    /* MODIFIED: Increased min-height for a much larger editor */
                    min-height: 20rem; /* 320px */
                }
                .tiptap-editor-field .ProseMirror:focus {
                    outline: none;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                  content: attr(data-placeholder);
                  float: left;
                  color: #a8a29e; /* stone-400 */
                  pointer-events: none;
                  height: 0;
                }
                .dark .ProseMirror p.is-editor-empty:first-child::before {
                    color: #a3a3a3; /* neutral-400 */
                }
            `}</style>
        </div>
    );
}
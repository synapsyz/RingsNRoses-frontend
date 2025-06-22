// components/FAQEditor.js
'use client';

import React, { useEffect, useRef } from 'react';
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

// The Tiptap editor component for a single FAQ answer
const AnswerEditor = ({ content, onContentChange }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current && !editorInstance.current) {
            const editor = new Editor({
                element: editorRef.current,
                extensions: [
                    StarterKit,
                    Placeholder.configure({ placeholder: 'Write the answer here...' }),
                    Paragraph, Bold, Underline, BulletList, OrderedList, ListItem, Blockquote, Link
                ],
                content: content,
                onUpdate: ({ editor }) => {
                    onContentChange(editor.getHTML());
                },
            });
            editorInstance.current = editor;
        }

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once per component instance

    // Update content if it changes from props
    useEffect(() => {
      if (editorInstance.current && content !== editorInstance.current.getHTML()) {
        editorInstance.current.commands.setContent(content);
      }
    }, [content]);

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            <EditorToolbar editor={editorInstance.current} />
            <div className="h-40 overflow-auto tiptap-editor-field" ref={editorRef}></div>
        </div>
    );
};


export default function FAQEditor({ faqs, setFaqs }) {
    
    const addFaq = () => {
        setFaqs([
            ...faqs,
            { id: `new-${Date.now()}`, question: '', answer: '' }
        ]);
    };

    const deleteFaq = (id) => {
        setFaqs(faqs.filter(faq => faq.id !== id));
    };

    const handleFaqChange = (id, field, value) => {
        setFaqs(faqs.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
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
                    <div key={faq.id} className="p-4 border border-stone-200 rounded-lg space-y-3 dark:border-neutral-700">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-stone-700 dark:text-neutral-300">Question {index + 1}</h3>
                            <button
                                type="button"
                                onClick={() => deleteFaq(faq.id)}
                                className="text-sm font-medium text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter the question"
                            className="py-2 px-3 block w-full border border-stone-200 rounded-lg text-sm focus:border-green-500 focus:ring-green-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                        />
                        <AnswerEditor
                            content={faq.answer}
                            onContentChange={(newAnswer) => handleFaqChange(faq.id, 'answer', newAnswer)}
                        />
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
            {/* Simple CSS for toolbar buttons */}
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
            `}</style>
        </div>
    );
}
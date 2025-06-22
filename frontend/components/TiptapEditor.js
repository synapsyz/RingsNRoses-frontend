import React, { useRef, useEffect } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import { Link as TiptapLink } from '@tiptap/extension-link';

const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="sticky top-0 bg-white flex align-middle gap-x-0.5 border-b border-stone-200 p-2 dark:bg-neutral-800 dark:border-neutral-700">
            {/* Bold */}
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('bold') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path d="M15 20a4 4 0 0 0 0-8H6v8Z" /></svg>
            </button>
            {/* Italic */}
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('italic') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="10" y1="4" y2="4" /><line x1="14" x2="5" y1="20" y2="20" /><line x1="15" x2="9" y1="4" y2="20" /></svg>
            </button>
            {/* Underline */}
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('underline') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" x2="20" y1="20" y2="20" /></svg>
            </button>
            {/* Link */}
            <button type="button" onClick={() => { const url = window.prompt('Enter URL'); editor.chain().focus().setLink({ href: url }).run();}} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('link') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </button>
            {/* Ordered List */}
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('orderedList') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6" /><line x1="10" x2="21" y1="12" y2="12" /><line x1="10" x2="21" y1="18" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></svg>
            </button>
            {/* Bullet List */}
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('bulletList') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
            </button>
            {/* Blockquote */}
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100 ${editor.isActive('blockquote') ? 'bg-stone-100' : ''}`}>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6H3" /><path d="M21 12H8" /><path d="M21 18H8" /><path d="M3 12v6" /></svg>
            </button>
        </div>
    );
};

const TiptapEditor = ({ content, onUpdate, placeholder }) => {
    const editorRef = useRef(null);
    const editorInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current && !editorInstance.current) {
            const editor = new Editor({
                element: editorRef.current,
                extensions: [
                    StarterKit,
                    Placeholder.configure({ placeholder }),
                    Paragraph,
                    Bold,
                    Underline,
                    TiptapLink,
                    BulletList,
                    OrderedList,
                    ListItem,
                    Blockquote,
                ],
                content: content,
                onUpdate: ({ editor }) => {
                    onUpdate(editor.getHTML());
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
    }, []);

    useEffect(() => {
        if (editorInstance.current && content !== editorInstance.current.getHTML()) {
            editorInstance.current.commands.setContent(content);
        }
    }, [content]);

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
            <EditorToolbar editor={editorInstance.current} />
            <div className="h-40 overflow-auto" ref={editorRef}></div>
        </div>
    );
};

export default TiptapEditor;
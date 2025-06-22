import React, { useEffect, useRef, useId } from 'react';

/**
 * A React component that wraps the Preline UI (v2.x) Tiptap editor.
 * FIX: This version correctly handles asynchronously loaded content.
 * It will populate the editor with the 'content' prop when it arrives,
 * but only once, to ensure the editor remains fully editable by the user.
 *
 * @param {object} props
 * @param {string} props.label - The label to display above the editor.
 * @param {string} props.content - The initial HTML content for the editor.
 * @param {(html: string) => void} props.onUpdate - Callback function that fires when the editor content changes.
 */
const PrelineTiptapEditor = ({ label, content, onUpdate }) => {
  const editorRef = useRef(null);
  const contentRef = useRef(null);
  const isInitialized = useRef(false);
  // Ref to track if we have successfully loaded the initial async content.
  const isContentLoaded = useRef(false);

  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  const uniqueId = useId();
  const editorId = `hs-editor-${uniqueId}`;

  // This effect now handles initialization and async content loading.
  useEffect(() => {
    const editorEl = editorRef.current;
    const contentEl = contentRef.current;
    if (!editorEl || !contentEl) return;

    // The main setup function
    const setup = () => {
      // Prevent re-initializing the editor itself
      if (isInitialized.current) return;
      isInitialized.current = true;
      
      new window.HSEditor(editorEl);
      
      const handleInput = (e) => {
        if (onUpdateRef.current) {
          onUpdateRef.current(e.target.innerHTML);
        }
      };
      contentEl.addEventListener('input', handleInput);
    };

    // This is the key change: We only set the content if the `content` prop
    // has a value AND we haven't set it before.
    if (content && !isContentLoaded.current) {
      contentEl.innerHTML = content;
      isContentLoaded.current = true;
    }

    // Wait for the Preline JS to be available on the window object, then set up.
    const intervalId = setInterval(() => {
      if (window.HSEditor) {
        clearInterval(intervalId);
        setup();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [content]); // Depend on 'content' to receive the async data.

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-stone-800 dark:text-neutral-200">
        {label}
      </label>
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div id={editorId} ref={editorRef}>
          {/* Toolbar */}
          <div className="sticky top-0 bg-white flex align-middle gap-x-0.5 border-b border-stone-200 p-2 dark:bg-neutral-800 dark:border-neutral-700">
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-bold>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-italic>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-underline>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-strike>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-link>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-ol>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-ul>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-blockquote>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6H3"/><path d="M21 12H8"/><path d="M21 18H8"/><path d="M3 12v6"/></svg>
            </button>
            <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-stone-800 hover:bg-stone-100" type="button" data-hs-editor-code>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            </button>
          </div>
          {/* Field */}
          <div className="h-40 overflow-auto p-4" ref={contentRef} data-hs-editor-field></div>
        </div>
      </div>
    </div>
  );
};

export default PrelineTiptapEditor;
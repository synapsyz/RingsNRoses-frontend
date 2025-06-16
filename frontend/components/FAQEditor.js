// components/FAQEditor.js
'use client';

import { useState, useEffect, useRef } from 'react';
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
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';

export default function FAQEditor() {
  const [steps, setSteps] = useState([]);
  const [currentEditingStep, setCurrentEditingStep] = useState(null);
  const [lastOpenedStep, setLastOpenedStep] = useState(null);
  const [conditionText, setConditionText] = useState('');
  const [options, setOptions] = useState([{ label: "", step: "1" }]);
  const [showModal, setShowModal] = useState(false);
  
  const tiptapEditors = useRef({});

  // Initialize the first step on component mount
  

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      number: steps.length + 1,
      isOpen: true,
      question: "",
      answer: "",
      conditions: []
    };

    setSteps(prevSteps => {
      // Close all other steps when adding a new one
      const updatedSteps = prevSteps.map(step => ({
        ...step,
        isOpen: false
      }));
      return [...updatedSteps, newStep];
    });
    setLastOpenedStep(newStep.number);
  };

  const toggleStep = (stepNumber) => {
    setSteps(prevSteps => 
      prevSteps.map(step => ({
        ...step,
        isOpen: step.number === stepNumber ? !step.isOpen : false
      }))
    );
    setLastOpenedStep(prev => prev === stepNumber ? null : stepNumber);
  };

  const deleteStep = (event, stepId) => {
    event.stopPropagation();
    
    // Destroy the Tiptap editor instance
    if (tiptapEditors.current[stepId]) {
      tiptapEditors.current[stepId].destroy();
      delete tiptapEditors.current[stepId];
    }

    setSteps(prevSteps => {
      const newSteps = prevSteps.filter(step => step.id !== stepId);
      
      // Renumber the remaining steps
      return newSteps.map((step, index) => ({
        ...step,
        number: index + 1
      }));
    });

    // If the deleted step was the last opened, reset lastOpenedStep
    const deletedStepNumber = steps.find(step => step.id === stepId)?.number;
    if (lastOpenedStep === deletedStepNumber) {
      setLastOpenedStep(null);
    }
  };

  const openModal = (stepId) => {
    setCurrentEditingStep(stepId);
    setConditionText("");
    setOptions([{ label: "", step: "1" }]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addOption = () => {
    setOptions([...options, { label: "", step: "1" }]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const saveCondition = () => {
    if (!currentEditingStep) return;

    const condition = conditionText.trim();
    const validOptions = options
      .map(opt => {
        const label = opt.label.trim();
        const step = opt.step;
        return label ? { label, step } : null;
      })
      .filter(Boolean);

    if (condition && validOptions.length > 0) {
      setSteps(prevSteps => 
        prevSteps.map(step => 
          step.id === currentEditingStep
            ? { 
                ...step, 
                conditions: [
                  ...step.conditions, 
                  { 
                    condition, 
                    options: validOptions 
                  }
                ] 
              }
            : step
        )
      );
    }
    closeModal();
  };

  // Initialize Tiptap editors when steps change
  useEffect(() => {
    if (steps.length > 0) {
      const lastStep = steps[steps.length - 1];
      if (!tiptapEditors.current[lastStep.id]) {
        const editorField = document.getElementById(`tiptap-editor-field-${lastStep.id}`);
        
        if (editorField) {
          const newEditor = new Editor({
            element: editorField,
            editorProps: {
              attributes: {
                class: 'relative min-h-40 p-3 tiptap'
              }
            },
            extensions: [
              StarterKit.configure({
                history: false
              }),
              Placeholder.configure({
                placeholder: 'Add Answer here....',
                emptyNodeClass: 'before:text-gray-500'
              }),
              Paragraph.configure({
                HTMLAttributes: {
                  class: 'text-inherit text-gray-800'
                }
              }),
              Bold.configure({
                HTMLAttributes: {
                  class: 'font-bold'
                }
              }),
              Underline,
              Link.configure({
                HTMLAttributes: {
                  class: 'inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium'
                }
              }),
              BulletList.configure({
                HTMLAttributes: {
                  class: 'list-disc list-inside text-gray-800'
                }
              }),
              OrderedList.configure({
                HTMLAttributes: {
                  class: 'list-decimal list-inside text-gray-800'
                }
              }),
              ListItem.configure({
                HTMLAttributes: {
                  class: 'marker:text-sm'
                }
              }),
              Blockquote.configure({
                HTMLAttributes: {
                  class: 'relative border-s-4 ps-4 sm:ps-6'
                }
              }),
              Strike,
              Code
            ]
          });

          tiptapEditors.current[lastStep.id] = newEditor;

          // Attach event listeners for Tiptap editor buttons
          const editorToolbar = document.getElementById(`hs-editor-tiptap-${lastStep.id}`);
          if (editorToolbar) {
            editorToolbar.querySelector('[data-hs-editor-bold]')?.addEventListener('click', () => newEditor.chain().focus().toggleBold().run());
            editorToolbar.querySelector('[data-hs-editor-italic]')?.addEventListener('click', () => newEditor.chain().focus().toggleItalic().run());
            editorToolbar.querySelector('[data-hs-editor-underline]')?.addEventListener('click', () => newEditor.chain().focus().toggleUnderline().run());
            editorToolbar.querySelector('[data-hs-editor-strike]')?.addEventListener('click', () => newEditor.chain().focus().toggleStrike().run());
            editorToolbar.querySelector('[data-hs-editor-link]')?.addEventListener('click', () => {
              const url = window.prompt('URL');
              if (url) newEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            });
            editorToolbar.querySelector('[data-hs-editor-ol]')?.addEventListener('click', () => newEditor.chain().focus().toggleOrderedList().run());
            editorToolbar.querySelector('[data-hs-editor-ul]')?.addEventListener('click', () => newEditor.chain().focus().toggleBulletList().run());
            editorToolbar.querySelector('[data-hs-editor-blockquote]')?.addEventListener('click', () => newEditor.chain().focus().toggleBlockquote().run());
            editorToolbar.querySelector('[data-hs-editor-code]')?.addEventListener('click', () => newEditor.chain().focus().toggleCode().run());
          }
        }
      }
    }
  }, [steps]);

  const handleQuestionChange = (stepId, value) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, question: value } : step
      )
    );
  };

  return (
        <div className="flex flex-col bg-white border border-stone-200 overflow-hidden rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 mt-6">
  <div className="py-3 px-5 flex justify-between items-center gap-x-5 border-b border-stone-200 dark:border-neutral-700">
    <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
      FAQs
    </h2>
  </div>
  <div className="p-4">
    

          <div id="steps-container" className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="border border-gray-300 rounded-2xl shadow transition-all step-card bg-white">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 step-header rounded-xl hover:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => toggleStep(step.number)}
                >
                  <h2 className="font-semibold text-lg text-gray-700 step-title">Question {step.number}</h2>
                  <div className="flex gap-2">
                    <button 
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={(e) => deleteStep(e, step.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className={`step-content ${step.isOpen ? '' : 'hidden'} p-6 space-y-4 transition-all duration-300 ease-in-out`}>
                  <input 
                    type="text" 
                    placeholder="Ask your Question here" 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={step.question}
                    onChange={(e) => handleQuestionChange(step.id, e.target.value)}
                  />

                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div id={`hs-editor-tiptap-${step.id}`}>
                      <div className="sticky top-0 bg-white flex align-middle gap-x-0.5 border-b border-gray-200 p-2">
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-bold>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>
                            <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-italic>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" x2="10" y1="4" y2="4"></line>
                            <line x1="14" x2="5" y1="20" y2="20"></line>
                            <line x1="15" x2="9" y1="4" y2="20"></line>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-underline>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
                            <line x1="4" x2="20" y1="20" y2="20"></line>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-strike>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
                            <path d="M14 12a4 4 0 0 1 0 8H6"></path>
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-link>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-ol>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="10" x2="21" y1="6" y2="6"></line>
                            <line x1="10" x2="21" y1="12" y2="12"></line>
                            <line x1="10" x2="21" y1="18" y2="18"></line>
                            <path d="M4 6h1v4"></path>
                            <path d="M4 10h2"></path>
                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-ul>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" x2="21" y1="6" y2="6"></line>
                            <line x1="8" x2="21" y1="12" y2="12"></line>
                            <line x1="8" x2="21" y1="18" y2="18"></line>
                            <line x1="3" x2="3.01" y1="6" y2="6"></line>
                            <line x1="3" x2="3.01" y1="12" y2="12"></line>
                            <line x1="3" x2="3.01" y1="18" y2="18"></line>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-blockquote>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 6H3"></path>
                            <path d="M21 12H8"></path>
                            <path d="M21 18H8"></path>
                            <path d="M3 12v6"></path>
                          </svg>
                        </button>
                        <button className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" type="button" data-hs-editor-code>
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 16 4-4-4-4"></path>
                            <path d="m6 8-4 4 4 4"></path>
                            <path d="m14.5 4-5 16"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="h-40 overflow-auto tiptap-editor-field" id={`tiptap-editor-field-${step.id}`}></div>
                    </div>
                  </div>
                  <div className="added-conditions text-sm text-gray-600">
                    {step.conditions.map((cond, idx) => (
                      <div key={idx} className="mt-2">
                        <strong>{cond.condition}:</strong><br/>
                        {cond.options.map((opt, optIdx) => (
                          <div key={optIdx}>- {opt.label} → Question {opt.step}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            id="add-step-btn" 
            className="mt-4 px-3 py-1 border border-gray-200 bg-white text-black rounded-xl bg-gray-200 transition duration-200 ease-in-out"
            onClick={addStep}
          >
            + Add Question
          </button>
      </div>

      {/* Condition Modal */}
      {showModal && (
        <div id="condition-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Condition</h2>
            <input 
              id="condition-text" 
              type="text" 
              placeholder="Enter condition" 
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={conditionText}
              onChange={(e) => setConditionText(e.target.value)}
            />
            <div id="options-container" className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-150 ease-in-out">
                  <input 
                    type="text" 
                    placeholder="Option label" 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                  />
                  <select 
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={option.step}
                    onChange={(e) => handleOptionChange(index, 'step', e.target.value)}
                  >
                    {steps.map((step) => (
                      <option key={step.id} value={step.number}>Go to Question {step.number}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="remove-option-btn text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => removeOption(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={addOption} 
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              + Add Option
            </button>
            <div className="flex justify-end gap-4 mt-6">
              <button 
                onClick={closeModal} 
                className="px-4 py-2 text-gray-500 hover:text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={saveCondition} 
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

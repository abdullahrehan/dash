import React, { useState ,useEffect,useContext,useRef,memo } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,Modifier,getDefaultKeyBinding ,KeyBindingUtil,ContentState,RichUtils,convertFromRaw,readOnly } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Context from '../HooksFiles/Context'
import axios from 'axios'
// import Editor from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
import '../../css/editor.css'

const initialstate= EditorState.createEmpty()

  const Editors = ({emptyEditor,NotesData,setNotesData}) => {

    const [file,setfile]=useState('')
    const {state,dispatch}=useContext(Context)
    // const [NotesData,setNotesData]=useState(initialstate);
    const editorRef=useRef()

    const previewNotes=state.notes!==null?true:false
    const imagePlugin = createImagePlugin();

    function uploadImageCallBack(file) {
 
         return new Promise(
            (resolve, reject) => {
               
      const form=new FormData();
      const folder=state.currentFolder
      form.append('image', file);
      form.append('folder', folder);
              console.log(folder)
      axios.post("/notesImages",form)
 

          }
        );
      }
    function insertCharacter(characterToInsert, editorState) {
      const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();
    
      const newContent = Modifier.replaceText(
        currentContent,
        currentSelection,
        characterToInsert
      );
    
      const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    
      return  newEditorState;
    }
    const removeSelectedBlocksStyle = (editorState)  => {
      const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
      if (newContentState) {
          return EditorState.push(editorState, newContentState, 'change-block-type');
      }
      return editorState;
  }
   
   const getResetEditorState = (editorState) => {
      const blocks = editorState
          .getCurrentContent()
          .getBlockMap()
          .toList();
      const updatedSelection = editorState.getSelection().merge({
          anchorKey: blocks.first().get('key'),
          anchorOffset: 0,
          focusKey: blocks.last().get('key'),
          focusOffset: blocks.last().getLength(),
      });
      const newContentState = Modifier.removeRange(
          editorState.getCurrentContent(),
          updatedSelection,
          'forward'
      );
  
      const newState = EditorState.push(editorState, newContentState, 'update-state');
      return removeSelectedBlocksStyle(newState)
  }

const g=()=>{
  const da=getResetEditorState(NotesData)
  setNotesData(da)         
  setNotesData(initialstate) 
}

const a=()=>{
  
   
  

    const data2=EditorState.createWithContent(convertFromRaw(JSON.parse(state.notes.body)))
 
 const data=insertCharacter(data2, NotesData)
 
  setNotesData(data2) 
 
  console.log(NotesData)
}

useEffect(() => { 
  if(emptyEditor){
    g()
  }

}, [emptyEditor])

    useEffect(() => { 
      if(state.notes!==null){
      
        a()
      }
 
    }, [state.notes])
   
    const styleMap = {
      'STRIKETHROUGH': {
        width: '53%',
        left: '6%',
      },
    };
    if(previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="53%"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="6%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="87%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="12%"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="2%"
  document.getElementsByClassName('DraftEditor-root')[0].style.cursor="pointer"
  
}
else if(!previewNotes && document.getElementsByClassName('rdw-editor-main')[0]!==undefined){
  document.getElementsByClassName('rdw-editor-main')[0].style.width="40%"
  document.getElementsByClassName('rdw-editor-main')[0].style.left="1%"
  document.getElementsByClassName('rdw-editor-main')[0].style.height="71%"
  document.getElementsByClassName('rdw-editor-main')[0].style.top="18%"
  document.getElementsByClassName('DraftEditor-root')[0].style.paddingTop="0%"
 
}
    return (
    <>
    <Editor
    plugins={[imagePlugin]}
      editorState={NotesData}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
      }}
      onEditorStateChange={setNotesData}
      readOnly={state.notes!==null ? state.editNotes : false}
      ref={editorRef}
      customStyleMap={styleMap}

/> 
    </>
  )
}

  
export default memo(Editors)
 
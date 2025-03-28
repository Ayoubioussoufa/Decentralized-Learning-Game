import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, language = 'solidity' }) => {
  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <Editor
      height="400px"
      defaultLanguage={language}
      defaultValue={value}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor; 
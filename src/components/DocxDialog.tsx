"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { renderAsync } from "docx-preview";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { DocumentViewer } from "react-documents";

export default function DocxDialog() {
  const [open, setOpen] = useState(false);
  const [docxFile, setDocxFile] = useState(null);
  const containerRef = useRef(null);
  const docs = [
    {
      uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDocxFile(null); // Reset the file when closing the dialog
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      setDocxFile(file);
    } else {
      alert("Please upload a valid .docx file.");
    }
  };

  useEffect(() => {
    if (docxFile && containerRef.current) {
      const reader = new FileReader();
      reader.onloadend = function (event) {
        const arrayBuffer = event?.target?.result;
        // renderAsync(arrayBuffer, containerRef.current!, null);
      };
      reader.readAsArrayBuffer(docxFile);
    }
  }, [docxFile]);

  return (
    <div>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="docx-upload"
      />
      <label htmlFor="docx-upload">
        <Button variant="contained" color="primary" component="span">
          Upload DOCX
        </Button>
      </label>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
        disabled={!docxFile}
      >
        Preview DOCX
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>DOCX Preview</DialogTitle>
        <DialogContent>
          {/* <div
            ref={containerRef}
            style={{ width: '100%', minHeight: '600px', border: '1px solid #ccc' }}
          /> */}
          {/* <DocViewer  pluginRenderers={DocViewerRenderers}
                     documents={docs} /> */}
          {/* <DocumentViewer
                queryParams="hl=Nl"
                url={"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
                // viewerUrl={selectedViewer.viewerUrl}
                // viewer={selectedViewer.name}
                // overrideLocalhost="https://react-doc-viewer.firebaseapp.com/"
                >
            </DocumentViewer> */}
          <iframe
            src="http://localhost:3000/public/wniosek.docx&embedded=true"
            width="600"
            height="800"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
}

declare module 'pdfjs-dist' {
  interface PDFDocumentProxy {
    numPages: number;
    getPage: (pageNo: number) => Promise<PDFPageProxy>;
  }

  interface PDFPageProxy {
    getTextContent: () => Promise<PDFPageContent>;
  }

  interface PDFPageContent {
    items: Array<{ str: string }>;
  }

  interface PDFDocumentLoadingTask {
    promise: Promise<PDFDocumentProxy>;
  }

  interface GlobalWorkerOptions {
    workerSrc: string;
  }

  export const GlobalWorkerOptions: GlobalWorkerOptions;
  
  export function getDocument(data: { data: ArrayBuffer }): PDFDocumentLoadingTask;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const workerSrc: string;
  export default workerSrc;
} 
import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular Html To Pdf ';

  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef;

  public downloadAsPDF() {
    const pages = document.querySelector('.all-pages') as HTMLElement;
    this.exportAllToPDF(pages);
  }
  // this.pdfOptions.value.pageFormat  // better to create pdfOptions object to hold all configuration related to pdf so that can be reused.
  exportAllToPDF(pages: HTMLElement) {
    const doc = new jsPDF({
      unit: 'px', // if 'pt' then format can be used as 'a4','a3'
      format: [595, 842],
      orientation: 'p',
      compress: true,
      floatPrecision: 'smart',
      putOnlyUsedFonts: true,
      // encryption: {   // used to add encription
      //   userPassword: 'pwd',
      //   ownerPassword: 'pwd',
      // },
    });
    // console.log(doc.internal.pageSize.getHeight());// doc.internal.pageSize.getWidth() to get the pdg width and height.
    doc.html(pages, {
      margin: [72, 72],
      autoPaging: 'text',
      html2canvas: {
        allowTaint: true,
        letterRendering: true,
        logging: false,
        scale: 0.8,
      },
      callback: (doc: jsPDF) => {
        // doc.addPage();  // add new page
        // doc.cellAddPage();
        // console.log(doc.getPageInfo(1)); // gives page info
        //doc.autoPrint({ variant: 'non-conform' }); // Makes the PDF automatically open the print-Dialog when opened in a PDF-viewer.

        // console.log(doc.getNumberOfPages());  // used to get the number of pages
        // doc.deletePage(3)  // used to delete specific page

        // doc.viewerPreferences({
        //   FitWindow: true,
        //   PrintArea: 'CropBox',
        //   NumCopies: 10,
        // }); // Set the ViewerPreferences of the generated PDF
        // -------------------- set header and image ----------
        for (let i = 1; i <= doc.getNumberOfPages(); i++) {
          doc.setPage(i);
          doc.text(
            `Angular HTML to PDF converter using jsPDF`,
            40 - 20,
            60 - 30,
          );
          doc.text(
            `page ${String(i)} of ${String(doc.getNumberOfPages())}`,
            310 - 20,
            830 - 30,
          );
          doc.addImage({
            // add image in specified position
            imageData:
              'https://media.gettyimages.com/id/1331491686/vector/element-design.jpg?s=612x612&w=gi&k=20&c=T251aOWYAaYrnHHSRVRZcrloq3wZRgsJ46DR0Qt_sVs=',
            x: 520,
            y: 0,
            width: 50,
            height: 34,
            alias: 'a' + i,
            compression: 'FAST',
          });
        }
        // doc.save('pdf-file');
        //console.log(doc);
        doc.output('dataurlnewwindow');
      },
    });
  }

  print() {
    window.print();
  }
}

/*
References -- 

https://artskydj.github.io/jsPDF/docs/jsPDF.html  // official doc for jspdf

https://medium.com/@berkayyyulguel/angular-convert-html-to-pdf-via-jspdf-8c63c8c61ad9  // example to convert html to pdf 

https://phppot.com/javascript/jspdf-html-example/     // example of jspdf

https://www.geeksforgeeks.org/how-to-generate-pdf-file-using-jspdf-library/    // how to create pdf with js


https://shamaahlawat.medium.com/page-split-using-jspdf-and-html2canvas-in-react-js-while-downloading-pdf-6c75da960019    // page split using react and more jspdf method usage example

*/

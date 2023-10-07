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
      unit: 'px',
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
            60 - 30
          );
          doc.text(
            `page ${String(i)} of ${String(doc.getNumberOfPages())}`,
            310 - 20,
            830 - 30
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
        doc.output('dataurlnewwindow');
      },
    });
  }

  print() {
    window.print();
  }
}

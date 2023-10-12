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
 We can also use pdfmake

 Example code : 
 
    public export(): void {
    const docDefinition = {
      header: {
        columns: [
          {
            text: new Date().toLocaleString(),
            margin: [30, 15, 0, 0],
            fontSize: 6,
          },
          {
            text: 'Company Financial Services',
            alignment: 'left',
            margin: [30, 15, 0, 0],
            fontSize: 6,
          },
          {},
        ],
      },
      // footer: {
      //   columns: ['Left part', { text: 'Right part', alignment: 'right' }],
      // },
      content: [
        {
          columns: [
            { text: 'Payment Confirmation', style: 'header' },
            {
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAhFBMVEX///8AcuEAZ98Ab+AAa+AAbeAAad9Tk+cAbuC+1fUFeOLS4/no8/0AZd8AaODv9v1to+vk7/z1+v7d6vqBru3F2vemxfKHsu5Zl+iYvfDU5PnM3/g9iea20PWNte5Rk+gwhOVIjuepx/NjnOl2p+wlfuS30fUAX96cvvAde+M1huWoxfIDNGHbAAAHKElEQVR4nO2d65aiOhBGJQlpVAKId6VVtJ3ROe//fgfvqSQocS3EjrV/NsEJ38qlqlKVabUQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEGQ30E6nG6ybcfrbPNkN2+6N68kDWVimzdHOYlYEFDP8yj1GWGT79q6+W7kQoZWfi/8IfwgmEzA/UVaY1/fiCX49k7V1wbC90wwMq2zt2/D1zOyDSkzinaAb/v19vgteEa2hSgV7TBVxQcscU/IlpB7qhUI9yeqvWxJ9EC1QrdR7f1uGGvZpndn6EW3Yf09bxRb2WZVVCsWOMcNEVvZtqqxZsafvKDvDWIp245XUq2Ypm77WpayaWONRYIxwTXjl2av6H1j2Mm2VgYb88bzwo8Nhz9MFU50X9L/hrCTbQVHmxhcn8QbxS7xk3o73ixWsvXgNgrdgYViBbM6u900VrLBORrt4NMf6KgSlzcFK9k2gdRWX/SV0eayi2Ul215uTLQ1/xsMxmBTV5/fACvZ5KWNGtoC2eiqlg6/BzayxbJs/o/eIAc/Vj1U/PuwkQ1spGynNxgA443X1OV3wEa2viwbNwQjFwxl0wGjja/1BlA2lw23p9c2k33xAz2smrr8DljtpLL/ZLIvgO8VuOzMW8kGZNE3yhi4V047pVaygUnI/6iPp3BHcPlAwUo24AZo9m4Ko0rC5fNSK9nAnuAxZRZmAZDN5R3BMt4G3QAykJ9NYACEjWvsdeMosg3bJZxO8Nowpsaz60Scb5X8BtFr7JteAJTN42X8PeVwdWBzKrLdcDZrL1ZCOWVwOv6hyVYKP8n2Rz0mpYyTiDPtV9webLaytfLgcdtDc6dXNnvZwvIULQm6bfarasdWtla7SjYDc3uKPiFba/dYN8eP5FvPyNYaPdCNEtfzjZ6SrTWM7u0LzHPZqzrzjGytOFfNtNtQEy4HPq48JVvh1Hci04tUrJxf1o48KVurtV4JxcgNmMjbjXzE61lWlC3SC2Rm41UUMRYU+IWvwLKp62bHjaUgMtERyRdlB/wCY1ZpPByNk8lkkizWXcfTTiHxrKB/otfrnUuvIGlB0/1EnKQ3/16P1t/DiutUf3hsPv+cZU2nu8gOYaADEWHL0QMt5uMVuTbn+XT2ml6+F+HCIwwksBUGRbmbFI6L5uAAkJHO7tPWwDiJDCEhKnKzpxQmxNScs/FHCTfVU+TPNiwxZBaVN/cY/YD6vjNxdqf8jGinAnebe8LtU4QbM/9upJsvYfN+cD8wzrY2Jfe/lpnRK5d1+LJq7gXeB+hW4XQgWsjNH3uxgetHCa1qNXtiZtXcY86vb4MqNXvByqq5WiDjHn218D1gJGJcMeLo37MM/WpVuMUbbttvE7grUpKNZnEaz8e+L/1xewk/fmmbKPUZ8/WJyxZ3/9lfjjJ62PYa004nZ+OMRvvrjNNKvhnPB9Ppzz/dxWAuD7cBzO0Gpdrj4/yNOtIylUDngPKLExqO1UMZp5MpgQx+Dh8mzOMeyKOHY8pfSfZZ31OSkVYv6H5DdOGGoD72oGitYXRHmFiZpSKstetNApKUIy2HWY1+jGFOs+ILdOHCZyqTcQRQIHrNQO13z8xmXYkZzEHV6zngyucP1OfOIJv8t8/cwNOsM6IDV0KubZXQBqS5+twZ5EnHr0fDiTGYRv/BetKl/nMgRZXuX/klrwQkzJPrSlYi2xLWXBns2QQYw86WqoWyDtF15zPLFmxCuwo/ZwsjgQ7kgWz+IHxUTzr9DNlSINs1OGSWje3AJOX/6b8HDRT/lZ/yUkDp2XX4mGWLhmBLYAb7Al544W6sUq50vBUylsjWAxd9mJwn0D5w9y4ysPVdJ5VZNk9JhiPamf0c+F4OF12N5Fgtv5j9RtkOgwcs+fqNFrCQjbubIgjDbZe9dPP3dOczkWU4GBzQ81evGlvDuIBwOOAG7frO6UvjS5ZbJj09mnVwAHIQ45hDT97kRTgDtLRoRxYizXxVBWhhUCZl1ihjzRBPcYgYpiVQPr1MrXQHzupPJRqhog2ZnILoaVvLb6h8PfmvRLl0zeP+ZtQeDkdJYLznKVGaB1GwWi5XvnZSHxl8L4eItbOTgPGIc+WE6nL/sN7cowXaH50/lx89uiH8wO0aXXUJK0E4n1mZl6WqSbBb/PurSkEpcfqU9EjqPczqAIWO28f1y9xdv+pGaFiboGpgeU/3j4anmhDnKOH+7sQTyqaYZvfTZz6jxu/ApjwjJmB6tvigtC7ykOzr8nG8wndgHnBU5KbMyPm2JKWyaP9RhR3pmGv/AZNHyb7MRVp3iL41+GTlbtijhHS3F1I5R+BzsrwnQvuLcKk9ZRFPnL5+vZT+buKJw9myECwbtB9FftL2IGPn9nS5cP9igTukvUOJZPVY2bF96HBsDUEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQmf8BckJbXFsgizoAAAAASUVORK5CYII=',
              fit: [100, 100],
              alignment: 'right',
            },
          ],
        },

        {
          text: 'Payment Details',
          style: 'subheader',
        },
        {
          table: {
            layout: 'lightHorizontalLines',
            widths: [520, 350],
            headerRows: 0,
            body: [
              [
                {
                  columns: [
                    { text: 'Payment Amount', style: 'tableExample' },
                    {
                      text: this.number.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }),
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: 'payment Source', style: 'tableExample' },
                    {
                      text: 'Card, ending 5847',
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: 'payment Date', style: 'tableExample' },
                    {
                      text: 'Jan, 21, 2023',
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: 'Confirmation email', style: 'tableExample' },
                    {
                      text: 'test@test.com',
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: 'Confirmation number', style: 'tableExample' },
                    {
                      text: 563562,
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
              [
                {
                  columns: [
                    { text: 'Account Number', style: 'tableExample' },
                    {
                      text: 8109384949,
                      style: 'tableExample',
                      alignment: 'right',
                    },
                  ],
                },
              ],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 0 : 1;
            },
            vLineWidth: function (i, node) {
              return 0;
            },
            hLineColor: function (i, node) {
              return '#ece8e8';
            },
          },
          // layout: 'lightHorizontalLines',
        },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        subheader: {
          fontSize: 10,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 30, 25],
          border: [false, false, false, true],
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }


  // References : http://pdfmake.org/index.html#/ and http://pdfmake.org/playground.html



 */

/*
References -- 

https://artskydj.github.io/jsPDF/docs/jsPDF.html  // official doc for jspdf

https://medium.com/@berkayyyulguel/angular-convert-html-to-pdf-via-jspdf-8c63c8c61ad9  // example to convert html to pdf 

https://phppot.com/javascript/jspdf-html-example/     // example of jspdf

https://www.geeksforgeeks.org/how-to-generate-pdf-file-using-jspdf-library/    // how to create pdf with js


https://shamaahlawat.medium.com/page-split-using-jspdf-and-html2canvas-in-react-js-while-downloading-pdf-6c75da960019    // page split using react and more jspdf method usage example

*/

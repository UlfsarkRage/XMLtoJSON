import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 📌 Importar FormsModule para usar ngModel

@Component({
  standalone: true,
  selector: 'app-xml-to-json',
  imports: [CommonModule, FormsModule], // 📌 Agregar FormsModule aquí
  template: `
    <div>
      <h3>XML a JSON Converter</h3>
      
      <!-- Input para pegar XML -->
      <textarea [(ngModel)]="xmlInput" placeholder="Pega tu XML aquí..."></textarea>
      <br>

      <!-- Botón para convertir -->
      <button (click)="convertXmlToJson()">Convertir</button>

      <!-- Mensaje de error -->
      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>

      <!-- Resultado JSON -->
      <pre *ngIf="jsonResult">{{ jsonResult | json }}</pre>
    </div>
  `,
  styles: [`
    div { padding: 10px; max-width: 500px; margin: auto; text-align: center; }
    textarea { width: 100%; height: 100px; padding: 5px; }
    button { margin-top: 10px; padding: 5px 10px; }
    pre { text-align: left; background: #f4f4f4; padding: 10px; }
  `]
})
export class XmlToJsonComponent {
  xmlInput: string = '';  // Variable para almacenar el XML ingresado
  jsonResult: any = null;
  errorMessage: string | null = null;



  convertXmlToJson() {
    if (!this.xmlInput.trim()) {
      this.errorMessage = 'Por favor, ingresa un XML válido.';
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.xmlInput, 'text/xml');

    if (xmlDoc.getElementsByTagName('parsererror').length) {
      this.errorMessage = 'Error: El XML no es válido.';
      this.jsonResult = null;
      return;
    }

    const json = this.xmlToJson(xmlDoc.documentElement);


    this.errorMessage = null;
    this.jsonResult = json;
  }

  private xmlToJson(node: Element): any {
    let obj: any = {};

    if (node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    node.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childElement = child as Element;
        const nodeName = childElement.nodeName;
        const childObj = this.xmlToJson(childElement);

        if (obj[nodeName]) {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(childObj);
        } else {
          obj[nodeName] = childObj;
        }
      }
    });

    return obj;
  }


}

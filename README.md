# XMLtoJSON

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.
## Code scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
  - npm install -g @angular/cli
  - cd XMLtoJSON
  - npm install
## Development server
To start a local development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

##✅ Características del componente
✔ Standalone y reutilizable: No depende de módulos adicionales.
✔ Thin: No usa librerías externas.
✔ Funciona con cualquier XML: Convierte a JSON sin problemas.

##🛠️ Pasos clave en el componente:
Recibe un archivo XML mediante un <input type="file">.
Lee su contenido como texto usando FileReader.
Convierte el XML a JSON usando DOMParser.
Muestra el resultado en pantalla.

## En caso de no necesitar un input sino pasar el XML como atributo al componente y recibir el JSON:
1.Se invoca en el HTML
    <app-xml-to-json 
      [xmlString]="xmlData" 
       (jsonOutput)="procesarJson($event)">
    </app-xml-to-json>
2.En el TS
  Parametro XML que se pasa -> xmlData = `<usuario><nombre>Juan</nombre><edad>30</edad><email>juan@example.com</email></usuario>`;
  Respuesta JSON que devuelve -> procesarJson(json: any) {
                                    console.log('JSON Recibido:', json);
                                  }

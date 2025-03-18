import { bootstrapApplication } from '@angular/platform-browser';
import { XmlToJsonComponent } from './app/xml-to-json.component';

bootstrapApplication(XmlToJsonComponent)
  .catch(err => console.error(err));

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';


getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

declare var require: {
  context(file: string, requireAll?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};


const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);

import { FabricObject } from 'fabric';  
  
declare module 'fabric' {  
  interface FabricObject {  
    index: number;
    label: string;
  }  
}
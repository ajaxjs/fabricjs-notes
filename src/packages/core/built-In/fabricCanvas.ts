import { Canvas, FabricImage } from 'fabric';
import { FabricRuler } from './fabricRuler'

export class FabricCanvas extends Canvas {
	public ruler?: FabricRuler
	public loading?: FabricImage
	constructor(el: string | HTMLCanvasElement, options?: any) {
		super(el, options)
	}
}
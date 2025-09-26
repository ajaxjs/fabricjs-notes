
import { loadSVGFromString, Group } from 'fabric';
export function loadSvgFile(e, canvas) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const svgString = e.target.result;
        loadSVGFromString(svgString).then(({ objects, options }) => {
            console.log(objects, options);
            const group = new Group(objects, options);
            canvas.add(group);
        }).catch(err=>{
            console.log(err);
        })
    };
    reader.readAsText(file);
}
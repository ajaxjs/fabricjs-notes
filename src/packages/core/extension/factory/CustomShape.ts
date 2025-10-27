import { Path, type PathProps } from 'fabric'
import * as pathMap from './maker/shape-path';


const shapMap: any = {}

Object.entries(pathMap).forEach(([key, pathMacker]) => {
    shapMap[key] = (props: PathProps) => {
        const { width, height, ...restProps } = props
        const { path } = pathMacker({ width, height })

        return new Path(path, restProps)
    }
})



export default shapMap

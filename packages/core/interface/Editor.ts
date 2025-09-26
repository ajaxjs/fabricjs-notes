import { Canvas } from 'fabric';
// 定义插件类型
type PluginFunction<T> = (instance: T, options?: Record<string, any>) => void;

interface PluginObject<T> {
  name?: string;
  install: (instance: T, options?: Record<string, any>) => void;
}

export type Plugin<T> = PluginFunction<T> | PluginObject<T>;


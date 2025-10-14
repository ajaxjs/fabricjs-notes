import { customAlphabet } from 'nanoid'


/**
 * 随机ID
 * @param len 长度
 * @returns 随机ID
 */
export const nonid = (len: number): string => {
    return customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')(len)
}
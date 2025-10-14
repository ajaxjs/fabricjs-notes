import { DefaultRatio } from "../configs/size"

interface ImageSize {
  width: number
  height: number
}

/**
 * 获取图片的原始宽高
 * @param src 图片地址
 */
export const getImageSize = (src: string): Promise<ImageSize> => {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.style.opacity = '0'
    document.body.appendChild(img)

    img.onload = () => {
      const imgWidth = img.clientWidth
      const imgHeight = img.clientHeight
    
      img.onload = null
      img.onerror = null

      document.body.removeChild(img)

      resolve({ width: imgWidth, height: imgHeight })
    }

    img.onerror = () => {
      img.onload = null
      img.onerror = null
    }
  })
}

/**
 * 读取图片文件的dataURL
 * @param file 图片文件
 */
 export const getImageDataURL = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.readAsDataURL(file)
  })
}

/**
 * 读取图片文件的dataURL
 * @param file 图片文件
 */
export const getImageText = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      // console.log(reader.result)
      resolve(reader.result as string)
    })
    reader.readAsText(file)
  })
}

/**
 * 检查字符串是否为HTTP或HTTPS URL
 * @param src 要检查的字符串
 * @returns 是否为有效的HTTP/HTTPS URL
 */
export const isUrl = (src: string): boolean => {
  try {
    const newUrl = new URL(src);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

/**
 * 将URL转换为DataURL
 * @param url 图片URL
 * @returns Promise<DataURL字符串>
 */
export const toDataUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
      if (xhr.status !== 200) {
        reject(new Error(`Failed to load image: ${xhr.status}`));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert to DataURL'));
        }
      };
      
      reader.onerror = function () {
        reject(new Error('FileReader error'));
      };
      
      reader.readAsDataURL(xhr.response);
    };
    
    xhr.onerror = function () {
      reject(new Error('Network error'));
    };
    
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}

// px2mm
export const px2mm = (value: number) => {
  return value / 300 * DefaultRatio
}

// mm2px
export const mm2px = (value: number) => {
  return value * 300 / DefaultRatio
}
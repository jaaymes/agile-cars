export const convertBase64 = (file: any) => new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = error => {
      reject(error)
    }
  })

// convert base64 to filename
export const convertBase64ToFile = (url: any, filename: string) => {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}


// convert File image to base64
export const convertFileToBase64 = (file: any) => new Promise((resolve, reject) => { 
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = () => {
    resolve(reader.result)
  }

  reader.onerror = error => {
    reject(error)
  }
})
import { isValid, addHours, isDate } from 'date-fns'

// normalize Placa de Carro com 3 letras
export const normalizePlaca = (value: string) => value
    ?.replace(/[^a-zA-Z0-9]/g, '')
    ?.replace(/(\w{3})(\w)/, '$1-$2')
    ?.toUpperCase()


// normalize Renavam to 11 digits only number
export const normalizeRenavam = (value: string) => { 
  const onlyNums = value?.replace(/[^\d]/g, '')
  return onlyNums?.slice(0, 11)
}


// normalize Year only number 
export const normalizeYear = (value: string) => { 
  const year = parseInt(value, 10) 
  if (Number.isNaN(year)) return '' 
  return year 
}


export const normalizeCurrency = (value: any, styled = false): string => {
  if (!value) {
    return value
  }

  const isNegative = value < 0

  const parsedValue = Number(String(value).replace(/\D/g, '')) / 100

  if (styled) {
    return parsedValue.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }
  return isNegative
    ? `- ${parsedValue.toLocaleString('pt-br', {
      minimumFractionDigits: 2
    })}`
    : parsedValue.toLocaleString('pt-br', {
      minimumFractionDigits: 2
    })
}


export const subString = (value: string, max = 100): string => {
  if (String(value).length > max) {
    return `${String(value).slice(0, max - 3)}...`
  }
  return value
}

export const normalizePercentage = (value: string): string => {
  if (!value) {
    return value
  }

  const parsedValue = Number(value.replace(/\D/g, '')) / 100

  if (parsedValue > 10_000) {
    return value
  }

  return parsedValue.toLocaleString('pt-br', {
    minimumFractionDigits: 2
  })
}

export const normalizeNumber = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = String(value).replace(/\D/g, '')

  return onlyNums
}

export const normalizeCnpj = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  if (onlyNums.length <= 5) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}`
  }
  if (onlyNums.length <= 8) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}/${onlyNums.slice(8, 12)}`
  }
  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
    5,
    8
  )}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`
}

export const normalizeCpf = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}`
  }
  if (onlyNums.length <= 9) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
      6,
      9
    )}`
  }
  return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
    6,
    9
  )}-${onlyNums.slice(9, 11)}`
}

// normalize whatsapp number
export const normalizeWhatsapp = (value: string): string => { 
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 2) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}`
  }
  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
    7,
    11
  )}`
}

export const normalizeCpfCnpj = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}`
  }
  if (onlyNums.length <= 9) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
      6,
      9
    )}`
  }
  if (onlyNums.length <= 11) {
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(
      6,
      9
    )}-${onlyNums.slice(9, 11)}`
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
      5,
      8
    )}/${onlyNums.slice(8, 12)}`
  }
  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(
    5,
    8
  )}/${onlyNums.slice(8, 12)}-${onlyNums.slice(12, 14)}`
}

export const normalizeDate = (value: string): string => {
  if (!value) {
    return value
  }

  const formated = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1')

  return formated
}

export const normalizeDateTime = (
  value: string,
  format?: 'datetime' | 'date'
): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')

  return format === 'date'
    ? `${onlyNums.slice(6, 8)}/${onlyNums.slice(4, 6)}/${onlyNums.slice(0, 4)}`
    : `${onlyNums.slice(6, 8)}/${onlyNums.slice(4, 6)}/${onlyNums.slice(
      0,
      4
    )} ${onlyNums.slice(8, 10)}:${onlyNums.slice(10, 12)}:${onlyNums.slice(
      12,
      14
    )}`
}

export const normalizeCEP = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 5)}${onlyNums.slice(5, 8)}`
}

export const normalizeCep = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`
}

export const normalizePhone = (value: string): string => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/\D/g, '')

  if (onlyNums.length === 0) {
    return ''
  }

  if (onlyNums.length <= 2) {
    return `(${onlyNums.slice(0, 2)}`
  }

  if (onlyNums.length <= 6 && onlyNums.length > 2) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}`
  }

  if (onlyNums.length > 6 && onlyNums.length < 11) {
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}-${onlyNums.slice(
      6,
      10
    )}`
  }

  return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
    7,
    11
  )}`
}

export const orderDate = (date: string): string => {
  const dateArray = date.split('/')
  return `${dateArray[2]}${dateArray[1]}${dateArray[0]}`
}

export const stringToDate = (value: any): Date | boolean => {
  if (!value) {
    return false
  }

  if (value.length < 10) {
    return false
  }

  const d = value.split('/')

  const date = new Date(`${d[2]}-${d[1]}-${d[0]}`)

  if (isValid(date)) {
    return addHours(date, 3)
  }

  return false
}

export const dateIsValid = (value: string | Date): boolean => {
  if (!value) {
    return false
  }
  try {
    if (isDate(new Date(value))) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export const formatDate = (value: string): string => {
  const d = dateIsValid(value)
  if (d) {
    const a = value.split('-')
    return `${a[2]}/${a[1]}/${a[0]}`
  }
  return ''
}

export const formatDateTime = (value: string): string => {
  const d_ = dateIsValid(value)
  if (d_) {
    const a = value.split('-')
    return `${a[2]}/${a[1]}/${a[0]}`
  }
  return ''
}

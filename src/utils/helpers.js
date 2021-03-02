
export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function diffHours(d2, d1) {
  return Math.abs(d2 - d1) / 36e5
}

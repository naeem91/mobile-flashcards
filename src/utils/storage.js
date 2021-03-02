import AsyncStorage from '@react-native-async-storage/async-storage'

export async function setObject(key, value){
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch(e) {
    console.log(e)
  }
}

export async function getObject(key){
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue !== null ? JSON.parse(jsonValue) : {}
  } catch(e) {
    return {}
  }
}

export async function mergeObject(key, value){
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value))
  } catch(e) {
    console.log(e)
  }
}

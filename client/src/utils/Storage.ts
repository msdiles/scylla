class Storage {
  static async setInStorage(name: string, data: any) {
    try {
      await localStorage.setItem(name, data)
    } catch (e) {
      console.log(e)
    }
  }

  static async removeFromStorage(name: string) {
    try {
      await localStorage.removeItem(name)
    } catch (e) {
      console.log(e)
    }
  }

  static async takeFromStorage(name: string) {
    try {
      return await localStorage.getItem(name)
    } catch (e) {
      console.log(e)
    }
  }
}

export default Storage

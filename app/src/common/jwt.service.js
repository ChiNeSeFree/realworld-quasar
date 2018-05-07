import { LocalStorage, SessionStorage } from 'quasar'

const ID_TOKEN_KEY = 'id_token'

export default {
  getToken () {
    return LocalStorage.get.item(ID_TOKEN_KEY)
  },

  saveToken (token) {
    LocalStorage.set(ID_TOKEN_KEY, token)
  },

  destroyToken () {
    LocalStorage.remove(ID_TOKEN_KEY)
  }
}

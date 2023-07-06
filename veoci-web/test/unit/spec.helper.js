export function setupTranslations () {
  this.$vtrans = {
    ...require('@shared/i18n/web/translation-keys')
  }

  const translations = require('@shared/i18n/web/translations/en').default
  this.$t = function (key) {
    return translations[key]
  }

  this.orgId = '1'

  this.$nextTick = function (callback) {
    callback()
  }

  this.$router = {
    replace (newRoute) {}
  }
  this.$emit = function () {}
}

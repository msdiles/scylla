import Fingerprint2 from "@fingerprintjs/fingerprintjs"

export default (
  options = {
    excludes: {
      screenResolution: true,
      availableScreenResolution: true,
      enumerateDevices: true,
    },
  }
) => {
  return new Promise((res, rej) => {
    if ((window as any).requestIdleCallback) {
      ;(window as any).requestIdleCallback(async function () {
        try {
          res(getFingerprint(options))
        } catch (e) {
          rej(e)
        }
      })
    } else {
      setTimeout(async function () {
        try {
          res(getFingerprint(options))
        } catch (e) {
          rej(e)
        }
      }, 100)
    }
  })
}

const getFingerprint = (options: { [key: string]: any }) => {
  return new Promise((res) => {
    Fingerprint2.get(options, function (components) {
      let values = components.map(function (component) {
        return component.value
      })
      let murmur = Fingerprint2.x64hash128(values.join(""), 31)
      res(murmur)
    })
  })
}

# sitedata

Node wrapper for the SiteData.io API

```
const SiteData = require("sitedata")
const sitedata = new SiteData({ token: "YOUR_API_TOKEN" })

sitedata.metric
  .index({ url: "example.com" })
  .then(metrics => {
    console.log(metrics)
  })
  .catch(e => {
    console.log(e)
  })
```

or

```
const SiteData = require("sitedata")
const sitedata = new SiteData({ token: "YOUR_API_TOKEN" })

;(async function() {
  try {
    const metric = await sitedata.metric.index({ url: "example.com" })
    console.log(metric)
  } catch(e) {
    console.log(e)
  }
})()
```

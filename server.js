const fs = require('fs')
const path = require('path')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

// ENV
const isProd = process.env.NODE_ENV === 'production'

const app = express()

// TEMPLATE
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

// RENDERER
function createRenderer (bundle,options) {
    return createBundleRenderer(bundle, Object.assign(options,{
        template,
        basedir: resolve('./dist'),
        runInNewContext: false
    }))
}

let renderer,readyPromise
if (isProd) {
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, { clientManifest })
} else {
    readyPromise = require('./build/setup-dev-server')(app,(bundle,options) => {
        renderer = createRenderer(bundle,options)
    })
}

// router

function render (req,res) {
    const s = Date.now()

    res.setHeader('Content-Type','text/html')
    res.setHeader('Server','MinNo')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).end('404 | Page Not Found')
        } else {
            res.status(500).end('500 | Internal Server Error')
            console.log(err.stack)
        }
    }
    const context = {
        title: "Nooldey Posts",
        url: req.url
    }

    renderer.renderToString(context,(err,html) => {
        if (err) {
            return handleError(err)
        }
        res.end(html)
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}

app.get('*', isProd ? render : (req,res) => {
    readyPromise.then(()=> {render(req,res)})
})

const port = process.env.PORT || 8080
app.listen(port,() => {
    console.log(`server started at localhost:${port}`)
})
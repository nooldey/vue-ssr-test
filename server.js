const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const compression = require('compression')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

// ENV
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const app = express()

// TEMPLATE
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

// RENDERER
function createRenderer (bundle,options) {
    return createBundleRenderer(bundle, Object.assign(options,{
        template,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
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

// static

const serve = (path,cache) => express.static(resolve(path),{
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use('/dist',serve('./dist',true))
app.use('/public',serve('./public',true))
app.use('/manifest.json',serve('./manifest.json',true))
app.use('/service-worker.js',serve('./dist/service-worker.js'))

// 1-second microcache

const microCache = LRU({
    max: 100,
    maxAge: 1000
})

const isCacheable = req => useMicroCache

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
            console.log('error',err.stack)
        }
    }
    // cache
    const cacheable = isCacheable(req)
    if (cacheable) {
        const hit = microCache.get(req.url)
        if (hit) {
            if (!isProd) {
                console.log('cache hit!')
            }
            return res.end(hit)
        }
    }

    const context = {
        title: "Nooldey Movies",
        url: req.url
    }

    renderer.renderToString(context,(err,html) => {
        if (err) {
            return handleError(err)
        }
        res.end(html)
        if (cacheable) {
            microCache.set(req.url, html)
        }
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
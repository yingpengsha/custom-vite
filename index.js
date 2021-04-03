import koa from 'koa'
import fs from 'fs/promises'
import path from 'path'
import {
  fileURLToPath
} from 'url';
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

const app = new koa()
app.use(async (ctx) => {
  const {
    url
  } = ctx.request

  if (url === '/') {
    const indexHTML = await fs.readFile('./src/index.html', 'utf-8')
    ctx.body = indexHTML
    ctx.type = 'html'
  } else if (url.endsWith('.js')) {
    const file = await fs.readFile(path.join(__dirname, 'src', url), 'utf-8')
    ctx.body = rewriteImportPath(file)
    ctx.type = 'application/javascript'
  } else if (url.startsWith('/@module/')) {
    const modulePath = path.join(__dirname, 'node_modules', url.replace('/@module/', ''))
    const packageFile = await fs.readFile(path.join(modulePath, 'package.json'), 'utf-8')
    const file = await fs.readFile(path.join(modulePath, JSON.parse(packageFile).module), 'utf-8')
    ctx.body = rewriteImportPath(file)
    ctx.type = 'application/javascript'
  }
})

function rewriteImportPath(content) {
  return content.replaceAll(/from\s*['"](.*)['"]/g, (s1) => {
    const s2 = s1.match(/from\s*['"](.*)['"]/)[1]
    if (s2.startsWith('/') || s2.startsWith('.')) {
      return s1
    } else {
      return `from '/@module/${s2}'`
    }
  })
}

app.listen(5000, () => console.log(`Let\'s go, DUDE! http://localhost:5000/`))
import fse from 'fs-extra'
import childProcess from 'child_process'

const TARGET_DIR = 'vendor/scrivito'
const JR_PLATFORM_CONFIG_PATCH = `diff --git a/src/privateJrPlatform/getJrPlatformConfig.ts b/src/privateJrPlatform/getJrPlatformConfig.ts
index 06f45d00..082231d6 100644
--- a/src/privateJrPlatform/getJrPlatformConfig.ts
+++ b/src/privateJrPlatform/getJrPlatformConfig.ts
@@ -7,6 +7,7 @@ export function getJrPlatformConfig() {
         'http://localhost:8090',
         'https://*.scrivito-ui.pages.dev',
       ],
+      assetUrlBase: '/scrivito',
     },
   }
 }
`

// Vite patch is needed, as long as scrivito still ships with commonjs (see https://github.com/infopark/scrivito_js/issues/9064)
// More infos see https://vitejs.dev/guide/dep-pre-bundling.html
const VITE_CONFIG_PATCH = `diff --git a/vite.config.ts b/vite.config.ts
index b20cabd7..ea962f0f 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -19,6 +19,9 @@ export default defineConfig(({ mode }) => {
   return {
     build: {
       outDir,
+      commonjsOptions: {
+        include: [/scrivito/, /node_modules/],
+      },
       rollupOptions: {
         input: {
           main: resolve(__dirname, 'index.html'),
@@ -47,6 +50,7 @@ export default defineConfig(({ mode }) => {
     },
     optimizeDeps: {
       force: true,
+      include: ['scrivito'],
     },
     plugins: [react(), writeProductionHeaders(outDir)],
     preview: {
`

run().catch((e) => {
  console.log('❌ Failed due to the following error -', e.message)
  process.exitCode = 1
})

async function run() {
  console.log('Building scrivito package')
  exec('cd ../scrivito_js/js && npm run package')

  console.log(`Removing ${TARGET_DIR}/`)
  await fse.remove(TARGET_DIR)

  console.log('Copying scrivito')
  await fse.copy('../scrivito_js/js/build/npm_scrivito/', TARGET_DIR)
  await fse.copy('../scrivito_js/js/build/scrivito', 'public/scrivito')

  console.log('Reinstalling scrivito npm package')
  exec('npm remove scrivito')
  exec('npm i file:vendor/scrivito')
  exec('npm i')

  console.log('Configuring new asset location')
  try {
    exec(`echo "${JR_PLATFORM_CONFIG_PATCH}" | git apply`)
  } catch {
    console.log(`❌ Could not apply scrivito config patch, ignoring`)
  }

  console.log('Configuring vite')
  try {
    exec(`echo "${VITE_CONFIG_PATCH}" | git apply`)
  } catch {
    console.log(`❌ Could not apply vite config patch, ignoring`)
  }

  console.log(`✅ Done.`)
}

function exec(cmd) {
  return childProcess.execSync(cmd, { stdio: [0, 1, 2] })
}

## Intro

See <http://flowerpassword.com/>

## How to use

* `npm install`
* `npm run build`
* `echo '{"password": "YOUR-PASSWORD"}' > ~/.huami.json`
* `node dist/index.js` and enter your key

Global install is still supported:

* `npm install -g .`
* `huami`

## Warning

* require Node.js >= 20
* Keep your .huami.json file safe, do not share it with others

## Development

* Source lives in `src/`
* Build output goes to `dist/`
* `npm run build` compiles the CLI with TypeScript

## Registering provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  'adonis-logger-timber/providers/TimberProvider'
]
```

Add new configuration inside `logger` module in `config/app.js`:
```js
timber: {
  driver: 'timber',
  source: Env.get('TIMBER_SOURCE_ID', '')
  key: Env.get('TIMBER_API_KEY', ''),
  level: 'info'
}
```

That's it! Now you can use Logger that will send data to Timber.

```js
const Logger = use('Logger')

Logger.info('Test message')

```

## Env variables

`Timber.io` driver relies on two Env variable: 
- `TIMBER_SOURCE_ID=`
- `TIMBER_API_KEY=`

# simple jwt API
This is a simple jwt API that allows users to add and remove countries 

- By default, it runs on port 5000 except `process.env.PORT` is set.

- The default login details are: username: admin, password: admin.
- The list of accepted usernames can be found and updated at `config/index.js`
- An authorization token called `x-access-token` is expected when making calls to protected routes. To get a token, you need to login. No need to set bearer in front of the token e.g 
```
x-access-token: emeorjeiorheirheihroehreihrioehiohriehreiohrihsasvagcftw232342ahdvsh
```

## how to run 
- clone this repository 
- change directory into the repo
- install packages via `npm install`
- to run tests, run `npm run test`
- to run the api run `npm start`

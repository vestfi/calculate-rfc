<div id="top"></div>

## About The Project

This project calculates a "Persona Física"'s RFC based on SAT's specifications including homonymy and verification digit.

### Built With

- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

Yarn:

```sh
yarn add calculate-rfc
```

NPM:

```sh
npm install calculate-rfc
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Import:

```ts
import { calculateMexicanRFC } from 'calculate-rfc'
```

Require:

```ts
const { calculateMexicanRFC } = require('calculate-rfc')
```

Usage:

```ts
const rfc = calculateMexicanRFC({
  name: 'Guillermo',
  patronymic: 'Del Toro', // name derived from a name of a father or ancestor
  matronymic: 'Gómez', // name derived from a name of a mother or ancestor
  year: '64',
  month: '10',
  day: '09',
})

console.log(rfc) // TOGG641009MGA
```

**Note:** Names in Mexico usually have two last names ordered as `name(s) patronymic matronymic`, however, **names with a single last name are also valid**.
In order to get an accurate result, the full name should match the one registered with SAT.

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

There is no guarantee that the calculated RFC will match the real RFC as only the SAT can assign an RFC to ensure homonymy and verification code uniqueness, therefore, be sure to validate the output with your users.

The RFC specifications can be downloaded from ["Plataforma Nacional de Transparencia"](https://www.infomex.org.mx/gobiernofederal/moduloPublico/moduloPublico.action) with the folio: `0610100135506`

This README's structure is based off [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Add tests for all SAT rules
- [x] Validate input

See the [open issues](https://github.com/vestfi/calculate-rfc/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Thanks!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
   1. Install dev dependencies with `yarn`
   2. Run test server with `yarn test`.
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/vestfi/calculate-rfc/blob/main/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

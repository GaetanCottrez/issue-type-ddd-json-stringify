# Reproduce the issue

Clone this repository: 
```bash
git clone https://github.com/GaetanCottrez/issue-type-ddd-json-stringify.git
```

Install dependencies:
```bash
pnpm i
```

Run tests:
```bash
pnpm run test:watch
```

The test failed : 
```bash
TypeError: Converting circular structure to JSON
        --> starting at object with constructor 'User'
        |     property '_domainEvents' -> object with constructor 'TsEvents'
        --- property 'aggregate' closes the circle
        at JSON.stringify (<anonymous>)
```

Because the aggregate `ChatConversation` contains other aggregate in props : 
```ts
export interface ConversationProps {
	id?: UID;
	users: User[];
	messages: ChatMessage[];
	isReadByUserId: string[];
	createdAt?: Date;
	updatedAt?: Date;
}
```
And an aggregate contains a circular ref in `_domainEvents > aggregate` :
```
User {
  props: {
    createdAt: 2022-01-01T00:00:00.000Z,
    updatedAt: 2022-01-01T00:00:00.000Z,
    id: [ID],
    name: 'John Doe',
    email: 'john@doe.com'
  },
  validator: Validator {},
  util: Utils {},
  parentName: 'Entity',
  config: { disableGetters: false, disableSetters: true },
  _id: ID {
    _value: 'valid_user_id',
    _isNew: false,
    _createdAt: 2024-07-16T17:17:03.392Z,
    MAX_SIZE: 16
  },
  autoMapper: AutoMapper { validator: Validator {} },
  _domainEvents: TsEvents {
    aggregate: [Circular *1],
    _metrics: [Object],
    _events: [],
    totalDispatched: 0
  },
  _dispatchEventsAmount: 0
}
```

I located the problem in the package `rich-domain` in the file `utils/validator.ts`: https://github.com/4lessandrodev/rich-domain/blob/9764adf70549440dfc4e0058a4a3bb4011e3a92e/lib/utils/validator.ts#L40

If i used the package npm [flatted](https://www.npmjs.com/package/flatted) who manage perfecly the circular ref if you stringify a JSON.

For solved the problem, modify the file `node_modules/.pnpm/rich-domain@1.23.2/node_modules/rich-domain/utils/validator.js` and add the line `const {stringify} = require('flatted');` at the top file.

And replace the line 39 `if (JSON.stringify(props) === JSON.stringify({}))`) to `if (stringify(props) === tringify({}))` and the test passed !

<video width="640" height="480" controls>
  <source src="issue.mp4" type="video/mp4">
</video>

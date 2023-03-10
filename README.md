# Chance's Fantastic Steam API App

The live version of this app is hosted [here using Heroku](https://steam-thing.herokuapp.com/).

It just queries the Steam public API right now, lol. BUT it uses some modern web stack stuff like:

* React
* Node
* Typescript
* Prettier
* Zod
* Axios
* Deployment via Heroku

Additionally, it proves I can do stuff like:

* Build a web page using a framework I previously had zero experience with using
* Use a back-end server to get around CORS errors
* Streamline development via careful use of npm and external libraries
* Work with publicly-available APIs and data to serve up an interactive UI
* Use componentDidMount to get data once, instead of pulling it a million times because I put it in the render loop by mistake (could happen to anyone, tho)
* Use Zod more! I want to find more problems that I can solve with this tool
* Flex some knowledge of the more obscure expressions and operators in the MDN: nullish coalescing operators, spread syntax, optional chaining, async function* expressions for creating anonymous asynchronous generator functions... some of these are probably definitely useful!

Future goals for the project:
* more robust traversal of Steam API data
* nested components that make clever use of state
* probably refactoring those components to lift the state to where it actually should be
* add CI via Heroku/GitHub and a test suite (TBD, but I think this project has some default testing tools, so maybe just those)
* do CD via GitHub branches instead of pushing directly to main like a madman
* make it not the literal ugliest thing on the internet

If you like what I'm doing, that means a lot to me, thanks. You're always so good at complimenting me in a way that validates my creative output, rather than my intrinsic qualities.
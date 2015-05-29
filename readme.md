## Disclaimer

Worsley is a small flux library heavily inspired by Alt and Flummox. I'd suggest using Alt and Flummox at this point as I'm really just having a a bit of fun and learning along the way. This library is not feature complete.

## Worsley

Regular flux (from the Facebook example) causes two patterns; a lot of boilerplate and singletons. Boilerplate makes it difficult to understand and maintain code and singletons become problematic when building isomorphic applications.

Ideally we can reduce boilerplate and use instances instead. This is where a library like Worsley can help.

### Actions

Methods defined in any `Actions` subclass should return a value which will be dispatched when called. This value can be null, undefined or an object/primitive.

```
import { Actions } from 'worsley';

class TodoActions extends Actions {

  addTodo(todo) {
    return todo;
  }
}
```

### Stores

We now need a store to listen for dispatched actions. Notice the a flux and actions object are injected into the store constructor.

```
class TodoStore extends Store {

  constructor(flux, todoActions) {
    super(flux);

    this.setInitiaState({
      todos: []
    });

    this.registerActionHandler(
      todoActions.constants.addTodo,
      this.addTodo
    );
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.push(todo)
    });
  }
}
```

### Worsley

The Worsley class brings the actions, stores and any other extensions (web utils) of your system together in a single instance. Every Action and Store must recieve the Worsley instance - this wires everything up to the dispatcher behind the scenes and makes for easier, isolated testing plus explicit dependency injection.

```
class Flux extends Worsley {
  super();
  this.actions.TodoActions = new TodoActions(this);
  this.actions.TodoStore = new TodoStore(this, this.actions.TodoActions);
}
```

### Container

The container class handles registering interest in store data and injecting actions into child components as props.

```
class WrapperComponent extends React.Component {

  render() {
    <Container flux={this.props.flux}
               stores={['TodoStore']}
               actions={['TodoActions']} />
      <Todos />
    </Container>
  }
}

const flux = new Flux();

React.render(<WrapperComponent flux={flux} />, document.body);
```

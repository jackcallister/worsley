## Worsley

Worsley is a small flux library heavily inspired by Alt and Flummox. Regular flux (from the Facebook example) causes two patterns; a lot of boilerplate and singletons. Boilerplate makes it difficult to understand and maintain code and singletons become problematic when building isomorphic applications. Ideally we can reduce boilerplate and use instances instead. This is where a library like Worsley can help.

### Quick Start

```
import React from 'react';
import { Worsley, Actions, Store, Container } from 'worsley';

class TodoActions extends Actions {

  addTodo(todo) {
    return todo;
  }
}

class TodoStore extends Store {

  constructor(flux, todoActions) {
    super(flux);

    this.state = {
      todos: []
    }

    const todoConstants = todoActions.constants;

    this.registerActionHandler(
      todoConstants.addTodo,
      this.addTodo
    );
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.push(todo)
    });
  }
}


class Flux extends Worsley {
  super();
  this.actions.TodoActions = new TodoActions(this);
  this.actions.TodoStore = new TodoStore(this, this.actions.TodoActions);
}

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


import { Component, Element, Listen, Prop, State } from "@stencil/core";
import { APIService } from "../../services/api";
import { DatabaseService } from "../../services/database";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  @Element() appHomeEl: HTMLAppHomeElement;

  @Prop() api: APIService;
  @Prop() db: DatabaseService;

  @State() todos: { task: string }[];

  @Listen('enjinCardSubmit')
  async onCardSubmit(event) {
    const response = await this.api.post('cardPayment', {
      token: event.detail.token.id,
      amount: 150
    });

    console.log(response);
  }

  /**
   * Adds a todo list item with the API
   */
  addTodo(event: UIEvent) {
    event.preventDefault();
    const taskInputEl: HTMLInputElement = this.appHomeEl.querySelector(
      "#task-input input"
    );

    this.db
      .add("todos", {
        task: taskInputEl.value,
        done: false
      })
      .then(() => {
        // Do nothing
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidLoad() {
    this.db.watchCollection(
      "todos",
      [
        {
          key: "done",
          operator: "==",
          value: false
        }
      ],
      docs => {
        const todos = [];
        docs.data.map(doc => {
          todos.push(doc.data());
        });
        this.todos = todos;
      }
    );
  }

  render() {
    return (
      <div>
        <ion-card>
          <ion-list>
            {this.todos && this.todos.length > 0
              ? this.todos.map(todo => <ion-item>{todo.task}</ion-item>)
              : null}
          </ion-list>
        </ion-card>
        <ion-card>
          <form onSubmit={(event: UIEvent) => this.addTodo(event)}>
            <ion-input id="task-input" placeholder="Add Todo Here!" />
            <ion-button type="submit">Add</ion-button>
          </form>
        </ion-card>

        <enjin-pay-with-card stripeKey="pk_test_G6ksY0dKXlgogvnitD0Wm1oc" />
      </div>
    );
  }
}

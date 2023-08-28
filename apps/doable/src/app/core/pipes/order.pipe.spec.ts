import { Todo, createTodo } from '@doable/api-interfaces';
import { OrderPipe } from './order.pipe';

const todos: Todo[] = [
    createTodo({ title: "Todo 1", completed: true }),
    createTodo({ title: "Todo 2" }),
    createTodo({ title: "Todo 3" }),
];

describe('OrderPipe', () => {
    let orderPipe: OrderPipe;
    beforeEach(() => {
        orderPipe = new OrderPipe();
    });

    it('orders todos by their completed state', () => {
        const expectedOutput = [ todos[1], todos[2], todos[0] ];
        expect(orderPipe.transform(todos)).toEqual(expectedOutput);
    });
});
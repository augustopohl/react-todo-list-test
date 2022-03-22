import { render } from 'react-dom'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    task: Model,
  },

  seeds(server) {
    server.db.loadData({
      tasks: [
        {
          id: 1,
          title: 'Do the dishes',
          isComplete: false,
        },
        {
          id: 2,
          title: 'Pay electricity bill',
          isComplete: false,
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/tasks', () => {
      return this.schema.all('task')
    })

    this.post('/tasks', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('task', data)
    })
  }
})

render(<App />, document.getElementById('root'))
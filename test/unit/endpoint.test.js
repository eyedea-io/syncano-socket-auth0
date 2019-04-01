/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'

describe('generate', () => {
  it('simple test', async () => {

    require('@syncano/core').Core.__setMocks({
      data: {
        profiles: {
          where: () => ({
            list: sinon.stub().onFirstCall().resolves([])
          })
        }
      }
    })

    const args = {
      model: 'name', // example
    }

    const result = await run('endpoint', {args})
    expect(result).toHaveProperty('code', 200)
    // expect(result.data).toHaveProperty('objects')
  })
})

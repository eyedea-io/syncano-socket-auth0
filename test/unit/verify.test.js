/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import axios from 'axios'

describe('generate', () => {
  it('correctly verified', async () => {

    require('@syncano/core').Core.__setMocks({
      users: {
        fields: () => ({
          firstOrCreate: sinon.stub().onFirstCall().resolves({token: 'testToken'})
        })
      }
    })

    const args = {
      code: 'superCode',
      state: 'avesomeState'
    }

    const result = await run('verify', {args})
    // expect(result.data).toHaveProperty('objects')
  })
})

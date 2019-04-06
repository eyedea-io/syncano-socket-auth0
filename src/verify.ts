import * as S from '@eyedea/syncano'
import axios from 'axios'
import * as crypto from 'crypto'
import * as querystring from 'querystring'

interface Args {
  code: string
  state: string
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args, config, meta}: S.Context<Args>
  ) {
    try {
      const {data: tokenData} = await axios({
        url: `https://${config.DOMAIN_NAME}/oauth/token`,
        method: 'POST',
        data: {
          grant_type: 'authorization_code',
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          code: args.code,
          // tslint:disable-next-line:max-line-length
          redirect_uri: `https://${meta.instance}${meta.api_host.includes('eu1') ? '.eu1' : ''}.syncano.space/auth0/verify/`,
        },
      })

      const {data: userProfile} = await axios({
        url: `https://${config.DOMAIN_NAME}/userinfo`,
        method: 'POST',
        headers: {
          Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
        },
      })

      let user = await users.where('username', 'eq', userProfile.email).first()

      if (!user) {
        user = await users
          .fields('id', 'user_key as token', )
          .create({
            username: userProfile.email,
            email: userProfile.email,
            password: crypto.randomBytes(16).toString('hex'),
          })
      }

      response('', 302, '', {
        Location: `${config.REDIRECT_URL}/?${querystring.stringify(user)}`,
      })
    } catch (err) {
      response.json({message: err.message}, 400)
    }
  }
}

export default ctx => new Endpoint(ctx)

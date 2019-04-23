import * as S from '@eyedea/syncano'
import auth0 from 'auth0-js'

class Endpoint extends S.Endpoint {
  async run(
    {response}: S.Core,
    {config, meta}: S.Context
  ) {
    const auth0Instance = new auth0.Authentication({
      domain: config.AUTH0_DOMAIN_NAME,
      clientID: config.AUTH0_CLIENT_ID,
    })

    const url = auth0Instance.buildAuthorizeUrl({
      scope: 'openid profile email read:patients read:admin',
      responseMode: 'query',
      responseType: 'code',
      // tslint:disable-next-line:max-line-length
      redirect_uri: `https://${meta.instance}${meta.api_host.includes('eu1') ? '.eu1' : ''}.syncano.space/auth0/verify/`,
    })

    response('', 302, '', {
      Location: url,
    })
  }
}

export default ctx => new Endpoint(ctx)

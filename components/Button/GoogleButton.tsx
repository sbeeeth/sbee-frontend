import { useGoogleLogin } from '@react-oauth/google'

import { GoogleIcon } from '@components/Icon/GoogleIcon'

export interface GoogleButtonProps {
  children: React.ReactNode
  onAccessTokenReceived: (accessToken: string) => void
}

export const GoogleButton = ({
  children,
  onAccessTokenReceived,
}: GoogleButtonProps) => {
  const googleOAuthLogin = useGoogleLogin({
    onSuccess: (response) => {
      onAccessTokenReceived(response.access_token)
    },
  })

  return (
    <button
      onClick={() => googleOAuthLogin()}
      // eslint-disable-next-line max-len
      className='inline-flex w-full items-center rounded-full border-1 border-black bg-white px-4
        py-2 text-black hover:bg-slate-100'
    >
      <GoogleIcon width={18} />
      <div className='flex-1 text-center'>
        <span>{children}</span>
      </div>
    </button>
  )
}

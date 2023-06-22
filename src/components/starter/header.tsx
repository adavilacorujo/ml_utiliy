import Image from 'next/image';
import Link from 'next/link';
import {
  EuiHeader,
  EuiTitle,
  EuiHeaderSectionItemButton,
  useEuiTheme,
  EuiToolTip,
  EuiIcon,
  EuiButton,
} from '@elastic/eui';
import { imageLoader } from '../../lib/loader';
import ThemeSwitcher from './theme_switcher';
import { headerStyles } from './header.styles';
import Logo from '../../../public/images/logo-eui.svg';
import { useRouter } from 'next/router';

const Header = () => {
  const { euiTheme } = useEuiTheme();
  const href = 'https://github.com/elastic/next-eui-starter';
  const label = 'EUI GitHub repo';
  const styles = headerStyles(euiTheme);
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/Log-In')
  }
  return (
    <EuiHeader
      position="fixed"
      sections={[
        {
          items: [
            <Link key="logo-eui" href="/" passHref>
              <a css={styles.logo}>
                <Image
                  width={24}
                  height={24}
                  src={Logo}
                  alt=""
                  loader={imageLoader}
                />
                <EuiTitle size="xxs" css={styles.title}>
                  <span>Welcome to Perceptor</span>
                </EuiTitle>
              </a>
            </Link>,
          ],
          borders: 'none',
        },
        {
          items: [
            <ThemeSwitcher key="theme-switcher" />,
            <EuiButton 
              color = 'ghost'
              size = 's'
              onClick={handleSignIn}
            >
              Sign In
            </EuiButton>,
          ],
          borders: 'none',
        },
      ]}
    />
  );
};

export default Header;

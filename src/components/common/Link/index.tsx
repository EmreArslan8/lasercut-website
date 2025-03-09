import { LinkProps } from 'next/link';
import { CSSProperties, ReactNode } from 'react';
import useStyles from './styles';
import { Link as I18NLink, Locale } from '@/i18n';

const Link = (
  props: Omit<LinkProps, 'href'> & {
    locale?: Locale;
    children: ReactNode;
    target?: '_self' | '_blank';
    style?: CSSProperties;
    colored?: boolean;
    href: string | null | undefined;
  }
) => {
  const styles = useStyles();

  return props.href ? (
    <I18NLink
      {...props}
      href={props.href.startsWith('http') ? props.href : `/${props.href}`}
      style={{ ...styles.link(props.colored), ...props.style }}
    >
      {props.children}
    </I18NLink>
  ) : (
    <>{props.children}</>
  );
};

export default Link;

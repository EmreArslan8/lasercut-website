import { Link as I18NLink, Locale } from "@/i18n/routing";
import { LinkProps } from "next/link";
import { CSSProperties, ReactNode } from "react";
import useStyles from "./styles";

const Link = (
  props: Omit<LinkProps, "href"> & {
    locale?: Locale;
    children: ReactNode;
    target?: "_self" | "_blank";
    style?: CSSProperties;
    colored?: boolean;
    href: string | null | undefined;
  }
) => {
  const styles = useStyles();

  const getNormalizedHref = () => {
    if (!props.href) return "#";
    if (props.href.startsWith("http")) return props.href;

    // "/" sadece ana sayfa olarak bırak, başka her şeyi normalize et
    if (props.href === "/") return "/";

    const normalized = props.href.startsWith("/")
      ? props.href
      : `/${props.href}`;

    return normalized.replace(/\/+$/, ""); // sondaki slash(lar) silinir
  };

  return (
    <I18NLink
      {...props}
      href={getNormalizedHref()}
      style={{ ...styles.link(props.colored), ...props.style }}
    >
      {props.children}
    </I18NLink>
  );
};

export default Link;

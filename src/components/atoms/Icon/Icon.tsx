import * as React from "react"
import styled, { css } from "styled-components"

type Component = {
  className?: string
}

export interface Props extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FunctionComponent<any>
  title?: string
  block?: boolean
  size?: "default" | "xs" | "s" | "l" | "xl" | "xxl" | "barn" | "bigBarn"
}

const Root = styled<React.FC<Props>>(
  ({ children, className, icon, size, title }) =>
    React.createElement(icon, { title, size, className }, children)
)`
  display: inline-block;
  fill: currentColor;
  vertical-align: middle;

  ${(props) =>
    props.size === "xxl" &&
    css`
      width: 24px;
      height: 24px;
    `}

  ${(props) =>
    props.size === "xl" &&
    css`
      width: 20px;
      height: 20px;
    `}

  ${(props) =>
    props.size === "default" &&
    css`
      width: 18px;
      height: 18px;
    `}

  ${(props) =>
    props.size === "l" &&
    css`
      width: 16px;
      height: 16px;
    `}

  ${(props) =>
    props.size === "s" &&
    css`
      width: 14px;
      height: 14px;
    `}

    ${(props) =>
    props.size === "xs" &&
    css`
      width: 12px;
      height: 12px;
    `}


  ${(props) =>
    props.block &&
    css`
      display: block;
    `}
`

const Icon = ({
  block = false,
  className,
  icon,
  size = "default",
  title,
}: Props) => (
  <Root
    icon={icon}
    block={block}
    className={className}
    size={size}
    title={title}
  />
)

export default Icon

import './style/button.css';

import { Icon } from '../Icon';
import React from 'react';
import { Spinner } from '../Spinner';
import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  className?: string;
  /** Set type */
  btnType?: 'primary' | 'default' | 'danger';
  /** Set size */
  size?: 'lg' | 'md' | 'sm';
  /** Set disabled */
  disabled?: boolean;
  /** Set left icon */
  leftIcon?: React.ReactElement;
  /** Set right icon */
  rightIcon?: React.ReactElement;
  // TODO: style bug
  /** Set loading */
  loading?: boolean;

  children: React.ReactNode;
  // icon?: IconProp;
}

/**
 * Button component, support all basic attributes of HTML button
 *
 * ```js
 * // import like this
 * import { Button } from 'aui'
 * ```
 *
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    loading,
    leftIcon,
    rightIcon,
    disabled,
    size,
    children,
    ...otherProps
  } = props;
  // btn,btn-lg,btn-primary
  const classes = classNames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: disabled || loading,
    },
    className
  );

  //
  return (
    <div className='inline-flex'>
      <button className={classes} disabled={disabled} {...otherProps}>
        {leftIcon && <Icon icon={leftIcon} className='mr-1' />}
        {loading && <Spinner className='mr-1' />}
        {children}
        {rightIcon && <Icon icon={rightIcon} className='ml-1' />}
      </button>
    </div>
  );
};
//
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  size: 'md',
};
export default Button;

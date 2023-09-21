import classNames from "classnames";
import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import Icon from "../Icon";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubmenuProps {
	index?: string;
	title: string;
	className?: string;
	children?: React.ReactNode;
	extended?: boolean;
}

const Submenu: React.FC<SubmenuProps> = (props) => {
	const { index, title, className, children, extended } = props;
	const context = useContext(MenuContext);
	const [openMenu, setOpenMenu] = useState(extended);
	//
	const classes = classNames("menu-item submenu-item", className, {
		"is-active": index === context.activeIndex,
		"is-opened": openMenu,
		"is-vertical": context.direction === "vertical",
	});
	const submenuClasses = classNames("aui-submenu", className, {
		"menu-opened": openMenu,
	});

	//1.去掉非 MenuItem，报错提示；2.可以省略 MenuItem 的index
	let newChildren = React.Children.map(children, (child, i) => {
		const childElement = child as React.FunctionComponentElement<MenuItemProps>;
		const { displayName } = childElement.type;
		if (displayName === "MenuItem") {
			return React.cloneElement(childElement, { index: `${index}-${i}` });
		}
		console.error("Warning: Menu has a child which is not MenuItem");
	});

	// 横向时，构建{enter/leave事件：处理函数}
	const mouseEnterLeaveEvent =
		context.direction === "horizontal"
			? {
					//横向，鼠标进入，显示子菜单
					onMouseEnter: (e: React.MouseEvent) => {
						e.preventDefault();
						setOpenMenu(true);
					},
					//横向，鼠标离开，隐藏子菜单
					onMouseLeave: (e: React.MouseEvent) => {
						e.preventDefault();
						setOpenMenu(false);
					},
			  }
			: {};
	// 纵向时，构建{click事件：处理函数}
	const clickEvent =
		context.direction !== "horizontal"
			? {
					//纵向，点击显示子菜单
					onClick: (e: React.MouseEvent) => {
						e.preventDefault();
						setOpenMenu(!openMenu);
					},
			  }
			: {};

	//
	return (
		<li className={classes} {...mouseEnterLeaveEvent}>
			<div className="submenu-title" {...clickEvent}>
				{title}
				{/* <Icon icon={solid("angle-down")} className="arrow-icon"></Icon> */}
				<Icon className="arrow-icon">
					<FaAngleDown />
				</Icon>
			</div>
			{/* <Transition in={openMenu} animation="zoom-in-top">
				<ul className={submenuClasses}>{newChildren}</ul>
			</Transition> */}
			<CSSTransition
				in={openMenu}
				timeout={300}
				classNames="zoom-in-top"
				unmountOnExit
			>
				<ul className={submenuClasses}>{newChildren}</ul>
			</CSSTransition>
		</li>
	);
};

Submenu.displayName = "Submenu";
Submenu.defaultProps = {
	extended: false,
};

export default Submenu;

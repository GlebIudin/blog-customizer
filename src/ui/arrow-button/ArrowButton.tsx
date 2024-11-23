import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import React from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (evt: boolean) => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {

	const arrowButtonHandler = () => {
		onClick?.(!isOpen)
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={(evt: React.MouseEvent) =>{
				evt.stopPropagation();
				arrowButtonHandler()
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, FormEvent, useRef } from 'react';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select'
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {useOutsideClickClose} from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ articleState, setArticleState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);
	const [backgroundColor, setBackgroundColor] = useState(articleState.backgroundColor);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen
	})

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		setIsOpen(false);
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		})
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setContentWidth(defaultArticleState.contentWidth);
		setBackgroundColor(defaultArticleState.backgroundColor);
	}
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={setIsOpen} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)} ref={rootRef}>
				<form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select options={fontFamilyOptions} selected={fontFamily} title={'Шрифт'}
						onChange={setFontFamily}></Select>
					<RadioGroup options={fontSizeOptions} selected={fontSize} title={'Размер шрифта'}
						onChange={setFontSize} name={'Размер шрифта'}></RadioGroup>
					<Select options={fontColors} selected={fontColor} title={'Цвет шрифта'}
						onChange={setFontColor}></Select>
					<Separator></Separator>
					<Select options={backgroundColors} selected={backgroundColor} title={'Цвет фона'}
						onChange={setBackgroundColor}></Select>
					<Select options={contentWidthArr} selected={contentWidth} title={'Ширина контента'}
						onChange={setContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

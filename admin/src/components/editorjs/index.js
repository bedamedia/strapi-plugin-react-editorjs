import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import requiredTools from './requiredTools'
import customTools from '../../config/customTools'
import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component'
import { changeFunc, getToggleFunc } from '../medialib/utils'
import { createReactEditorJS } from 'react-editor-js'
import { isEqual } from 'lodash'
const EditorJs = createReactEditorJS()

const Editor = ({ locale, onChange, name, value, ...otherProps }) => {
	const [editorInstance, setEditorInstance] = useState()
	const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1)
	const [isMediaLibOpen, setIsMediaLibOpen] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [shouldReRender, setShouldReRender] = useState(false)

	const editorCore = React.useRef(null)
	const editorValueRef = React.useRef(value)
	const imageSelectCbRef = React.useRef(null)

	const handleInitialize = React.useCallback((instance) => {
		editorCore.current = instance
	}, [])

	const mediaLibToggleFunc = useCallback(
		getToggleFunc({
			openStateSetter: setIsMediaLibOpen,
			indexStateSetter: setMediaLibBlockIndex,
		}),
		[]
	)

	// when image selected
	const handleMediaLibChange = useCallback(
		(data) => {
			imageSelectCbRef.current(data)
			mediaLibToggleFunc()
		},
		[mediaLibBlockIndex, editorInstance]
	)

	const customImageTool = {
		mediaLib: {
			class: MediaLibAdapter,
			config: {
				mediaLibToggleFunc,
				onBlockClicked: (callItWhenFileSelected) => {
					mediaLibToggleFunc()
					imageSelectCbRef.current = callItWhenFileSelected
				},
			},
		},
	}

	useEffect(() => {
		if (isReady && !shouldReRender && !isEqual(editorValueRef.current, value)) {
			editorValueRef.current = value
			editorCore.current.render(getValue(value))
			setShouldReRender(true)
		}
	}, [value, isReady])

	return (
		<>
			<div
				style={{
					border: `1px solid rgb(227, 233, 243)`,
					borderRadius: `2px`,
					marginTop: `4px`,
				}}
			>
				<EditorJs
					holder={`react-editor-js-${name}-${Math.floor(Math.random() * 1000)}`}
					defaultValue={getValue(value)}
					onChange={async (...args) => {
						const savedData = await editorCore.current.save()
						// console.log("🚀 ~ onChange={ ~ savedData:", savedData);
						onChange({ target: { name, value: JSON.stringify(savedData) } })
					}}
					tools={{
						...requiredTools,
						...customTools,
						...customImageTool,
					}}
					onInitialize={handleInitialize}
					onReady={() => {
						console.log('is ready')
						setIsReady(true)
					}}
				/>
			</div>
			<MediaLibComponent isOpen={isMediaLibOpen} onChange={handleMediaLibChange} onToggle={mediaLibToggleFunc} />
		</>
	)
}

const getValue = (value) => {
	try {
		return JSON.parse(value)
	} catch (error) {
		return {}
	}
}

Editor.propTypes = {
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
}

export default Editor

import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import requiredTools from './requiredTools'
import customTools from '../../config/customTools'
import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component'
import { changeFunc, getToggleFunc } from '../medialib/utils'
import { createReactEditorJS } from 'react-editor-js'
import { difference, isEqual } from 'lodash'
const EditorJs = createReactEditorJS()

const Editor = ({ locale, onChange, name, value, ...otherProps }) => {
	const [editorInstance, setEditorInstance] = useState()
	const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1)
	const [isMediaLibOpen, setIsMediaLibOpen] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const [shouldReRender, _setShouldReRender] = useState(false)
	const setShouldReRender = (...args) => {
		console.log('setShouldReRender called with args:', args)
		_setShouldReRender(...args)
	}

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
		try {
			if (value && isReady && !shouldReRender && !isEqual(editorValueRef.current?.blocks, getValue(value).blocks)) {
				// console.log('rerendering editor with new value:')
				editorValueRef.current = value
				editorCore.current.render(getValue(value))
				setShouldReRender(true)
			} else {
				// console.log('no need to rerender editor')
			}
		} catch (err) {
			console.error('Error re-rendering editor:', err)
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
				<p style={{ color: 'white' }}>Locale: {locale}</p>
				<EditorJs
					holder={`react-editor-js-${name}-${Math.floor(Math.random() * 1000)}`}
					// holder={`react-editor-js-${name}`}
					defaultValue={getValue(value)}
					onChange={async (...args) => {
						console.log('EditorJs onChange called')
						// console.log('should save', args)
						try {
							const savedData = await editorCore.current.save()
							// console.log('default value', getValue(value))
							// console.log('savedData', savedData)
							// check if there's any change
							if (isEqual(savedData.blocks, getValue(value).blocks)) {
								console.log('no change')
								return
							} else {
								console.log('change detected')
								onChange({ target: { name, value: JSON.stringify(savedData) } })
							}
						} catch (err) {
							console.error('Error saving editor data:', err)
						}
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
			{/* <button
				type="button"
				onClick={async () => {
					editorCore.current.render(getValue(value))
				}}
			>
				rerender
			</button>
			<button
				type="button"
				onClick={async () => {
					console.log('default value', getValue(value))
				}}
			>
				print default value
			</button> */}
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

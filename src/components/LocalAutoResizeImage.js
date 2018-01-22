//@flow 

import React from 'react'
import {Image} from 'react-native'
import resolveAssetsSource from 'react-native/Libraries/Image/resolveAssetSource'

type Props = {
	source: any,
	width?: number,
	height?: number
} & any //TODO better types

export default class AutoResizeImage extends React.Component<Props> {
	render() {
		const {source} = this.props
		const dimensions = resolveAssetsSource(source)
		if (!dimensions) return null

		const {width, height} = dimensions
		const {style, ...props} = this.props

		let desiredWidth
		let desiredHeight

		if (this.props.width) {
			desiredWidth = this.props.width
			//$FlowFixMe
			desiredHeight = (height / width) * desiredWidth
		} else if (this.props.height) {
			desiredHeight = this.props.height
			//$FlowFixMe
			desiredWidth = (width / height) * desiredHeight
		}

		return <Image {...props} style={[style, {width: desiredWidth, height: desiredHeight}]}/>
	}
} 

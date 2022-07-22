import compareSemver from './compareSemver'
import { Image } from '../../core/data'

export default (images: Image[]) =>
    images.reduce((accumulator, current) => {
        const image = accumulator.find(
            image => image.tag.name === current.tag.name
        )

        if (image === undefined) return [...accumulator, current]
        if (compareSemver(image.tag.version, current.tag.version)) {
            return [
                ...accumulator.filter(
                    image => image.tag.name !== current.tag.name
                ),
                current,
            ]
        } else return accumulator
    }, [] as Image[])

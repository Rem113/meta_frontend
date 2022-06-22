import React from 'react'
import {useQuery} from 'react-query'
import {QueryName} from '../../../data'
import {ImageRepository} from '../../../data/repositories/ImageRepository'

import * as classes from './Images.module.scss'
import FloatingActionButton from "../../components/FloatingActionButton"
import add from "../../../assets/icons/add.svg"
import {useNavigate} from "react-router-dom";

const Images: React.FC = () => {
    const {
        data: images,
        isFetching,
        isError,
        error,
    } = useQuery(QueryName.IMAGES, ImageRepository.all, {
        refetchOnWindowFocus: false,
    })

    const navigate = useNavigate()

    return (
        <>
            <h1 className={classes.h1}>Images</h1>
            {isFetching && <p>Loading...</p>}
            {isError && error !== null && error !== undefined && (
                <p>
                    There was an error while fetching the images from the server:{' '}
                    {error as string}
                </p>
            )}
            {images !== undefined && (
                <ul>
                    {images.map(image => (
                        <li key={`${image.tag.name}:${image.tag.version}`}>
                            {image.tag.name}: {image.tag.version}
                        </li>
                    ))}
                </ul>
            )}
            <FloatingActionButton icon={add} alt={"add"} onClick={() => navigate("/images/create")}/>
        </>
    )
}

export default Images

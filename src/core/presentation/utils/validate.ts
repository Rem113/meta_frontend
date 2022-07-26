import { ObjectSchema } from 'yup'

export default async <E>(
    value: any,
    schema: ObjectSchema<any>
): Promise<null | E> => {
    try {
        await schema.validate(value, { abortEarly: false })
        return null
    } catch (error: any) {
        return error.inner.reduce(
            (
                accumulator: E,
                { path, message }: { path: string; message: string }
            ) => ({
                ...accumulator,
                [path]: message,
            }),
            {}
        )
    }
}
